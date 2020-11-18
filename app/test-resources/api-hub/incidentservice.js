const cds = require("@sap/cds");
/**
 * Enumeration values for FieldControlType
 * @see https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/Common.md#FieldControlType
 */
const FieldControl = {
    Mandatory: 7,
    Optional: 3,
    ReadOnly: 1,
    Inapplicable: 0,
};

module.exports = cds.service.impl(async function (srv) {
    const {
        Incidents,
        BusinessPartner,
        Individual,
        BusinessPartnerAddress
    } = srv.entities

    //read/edit event hook after read  of entity 'Incidents'
    srv.after(["READ", "EDIT"], "Incidents", setTechnicalFlags);
    srv.after("READ", "Incidents", setPriorityCriticality);
    srv.before("SAVE", "Incidents", validateIncident);

    /**
     * Set technical flags, used for controlling UI behaviour, on the 'Incidents' entity
     *
     * @param Incidents {Incidents | Incidents[]}  (Array of) Incidents
     */
    function setTechnicalFlags(Incidents) {

        function _setFlags(Incidents) {
            Incidents.isDraft = !Incidents.IsActiveEntity;
            // field control on the 'identifier' property
            if (Incidents.IsActiveEntity) {
                Incidents.identifierFieldControl = FieldControl.Optional;
            } else if (Incidents.HasActiveEntity) {
                Incidents.identifierFieldControl = FieldControl.ReadOnly;
            } else {
                Incidents.identifierFieldControl = FieldControl.Mandatory;
            }
        }

        if (Array.isArray(Incidents)) {
            Incidents.forEach(_setFlags);
        } else {
            _setFlags(Incidents);
        }
    };

    /**
     * Set priority criticality used for display in LR table
     *
     * @param Incidents {Incidents | Incidents[]}  (Array of) Incidents
     */
    function setPriorityCriticality(Incidents) {

        function _setCriticality(Incidents) {
            if (Incidents.priority) {
                Incidents.priority.criticality = parseInt(Incidents.priority.code);
            }
        }

        if (Array.isArray(Incidents)) {
            Incidents.forEach(_setCriticality);
        } else {
            _setCriticality(Incidents);
        }
    }

    /**
     * Validate a 'Incident' entry
     *
     * @param req   Request
     */
    function validateIncident(req) {
        // check mandatory properties
        if (!req.data.identifier) {
            req.error(400, "Enter a  Incident Identifier", "in/identifier");
        }
    }

    //S/4 HANA integration: Begin Custom query handlers 
    const extSrv = await cds.connect.to("API_BUSINESS_PARTNER")

    this.on('READ', BusinessPartner, req =>
        !req.query.cqn.where || (req.query.cqn.where && req.query.cqn.where[0] != "exists") ? extSrv.tx(req).run(req.query) : console.log('skipped')
    )

    this.on('READ', BusinessPartnerAddress, req =>
        !req.query.cqn.where || (req.query.cqn.where && req.query.cqn.where[0] != "exists") ? extSrv.tx(req).run(req.query) : console.log('skipped')
    )

    this.on('READ', Incidents, async (context, next) => {
        if (context.query.SELECT.columns && context.query.SELECT.columns.find(c => c.ref[0] === 'assignedIndividual')) {
            const node = context.query.SELECT.columns.find(c => c.ref[0] === 'assignedIndividual');
            //check on expanded entities in query and enhance query with BP association columns  
            //Experimental: currently no CAP support for external associated read when in draft mode                  
            if (node.expand.find(c => c.ref[0] === 'businessPartner') && !node.expand.find(c => c.ref[0] === 'businessPartnerID')) {
                node.expand.push({ ref: ['businessPartnerID'] })
            }
        }
        const response = await next();
        await Promise.all(
            response.filter(response => response.assignedIndividual && response.assignedIndividual.businessPartnerID)
            .map(each =>
                //asynchronous parallel read from S/4 service for expand on businessPartner
                Promise.all([
                    getBPartner(each.assignedIndividual, context)
                ])
            )
        )
        return response;
    })

    this.on('READ', Individual, async (context, next) => {
        //check on expanded entities in query and enhance query with BP association columns
        //Experimental: currently no CAP support for external associated read when in draft mode
        if (context.query.SELECT.columns && (context.query.SELECT.columns.find(c => c.ref[0] === 'businessPartner')) || context.query.SELECT.columns.find(c => c.ref[0] === 'businessPartnerAddress')) {
            if (!context.query.SELECT.columns.find(c => c.ref[0] === 'businessPartnerID')) {
                context.query.SELECT.columns.push({
                    ref: ['businessPartnerID']
                });
                if (!context.query.SELECT.columns.find(c => c.ref[0] === 'addressID')) {
                    context.query.SELECT.columns.push({
                        ref: ['addressID']
                    });
                }
            }
        }
        const response = await next();
        await Promise.all(
            response.filter(response => response.businessPartnerID && response.addressID)
            .map(each =>
                //asynchronous parallel read from S/4 service for expand on businessPartner entities               
                Promise.all([
                    getBPartner(each, context),
                    getBPartnerAddress(each, context)
                ])
            )
        )
        return response;
    })

    const getBPartner = async (each, context) => {
        if (!extSrv.options.mocked && each) {
            await extSrv.tx(context).run(
                    SELECT.one.from(BusinessPartner).where({
                        BusinessPartner: each.businessPartnerID
                    })
                )
                .then(data => {
                    each.businessPartner = {};
                    Object.assign(each.businessPartner, data);
                })
        }
    }

    const getBPartnerAddress = async (each, context) => {
        if (!extSrv.options.mocked && each) {
            await extSrv.tx(context).run(
                SELECT.one.from(BusinessPartnerAddress).where({
                    BusinessPartner: each.businessPartnerID
                }).and({
                    AddressID: each.addressID
                })
            ).then(data => {
                each.businessPartnerAddress = {};
                Object.assign(each.businessPartnerAddress, data)
            })
        }
    }
    //S/4 HANA integration: End Custom query handlers     
})