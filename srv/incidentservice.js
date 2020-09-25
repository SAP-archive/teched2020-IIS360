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
        SafetyIncidents,
        BusinessPartner,
        Individual,
        BusinessPartnerAddress
    } = srv.entities

    //read/edit event hook after read  of entity 'SafetyIncidents'
    srv.after(["READ", "EDIT"], "SafetyIncidents", setTechnicalFlags);
    srv.after("READ", "SafetyIncidents", setPriorityCriticality);
    srv.before("SAVE", "SafetyIncidents", validateSafetyIncident);

    /**
     * Set technical flags, used for controlling UI behaviour, on the 'SafetyIncidents' entity
     *
     * @param safetyIncidents {SafetyIncidents | SafetyIncidents[]}  (Array of) SafetyIncidents
     */
    function setTechnicalFlags(safetyIncidents) {

        function _setFlags(safetyIncident) {
            safetyIncident.isDraft = !safetyIncident.IsActiveEntity;
            // field control on the 'identifier' property
            if (safetyIncident.IsActiveEntity) {
                safetyIncident.identifierFieldControl = FieldControl.Optional;
            } else if (safetyIncident.HasActiveEntity) {
                safetyIncident.identifierFieldControl = FieldControl.ReadOnly;
            } else {
                safetyIncident.identifierFieldControl = FieldControl.Mandatory;
            }
        }

        if (Array.isArray(safetyIncidents)) {
            safetyIncidents.forEach(_setFlags);
        } else {
            _setFlags(safetyIncidents);
        }
    };

    /**
     * Set priority criticality used for display in LR table
     *
     * @param safetyIncidents {SafetyIncidents | SafetyIncidents[]}  (Array of) SafetyIncidents
     */
    function setPriorityCriticality(safetyIncidents) {

        function _setCriticality(safetyIncident) {
            if (safetyIncident.priority) {
                safetyIncident.priority.criticality = parseInt(safetyIncident.priority.code);
            }
        }

        if (Array.isArray(safetyIncidents)) {
            safetyIncidents.forEach(_setCriticality);
        } else {
            _setCriticality(safetyIncidents);
        }
    }

    /**
     * Validate a 'SafetyIncident' entry
     *
     * @param req   Request
     */
    function validateSafetyIncident(req) {
        // check mandatory properties
        if (!req.data.identifier) {
            req.error(400, "Enter a Safety Incident Identifier", "in/identifier");
        }
    }

   ////S/4 HANA integration: Begin Custom query handlers 
    // const extSrv = await cds.connect.to("API_BUSINESS_PARTNER")

    // this.on('READ', BusinessPartner, req =>
    //     !req.query.cqn.where || (req.query.cqn.where && req.query.cqn.where[0] != "exists") ? extSrv.tx(req).run(req.query) : console.log('skipped')
    // )

    // this.on('READ', BusinessPartnerAddress, req =>
    //     !req.query.cqn.where || (req.query.cqn.where && req.query.cqn.where[0] != "exists") ? extSrv.tx(req).run(req.query) : console.log('skipped')
    // )    

    // this.after('READ', SafetyIncidents, async (response, context) => {
    //     return Promise.all(
    //         //check on expanded entities in query response
    //         response.filter(response => response.assignedIndividual && (response.assignedIndividual.businessPartner || response.assignedIndividual.businessPartnerAddress))
    //         .map(each =>
    //             //asynchronous parallel read from S/4 service for expand on businessPartner and businessPartnerAddress                 
    //             Promise.all([
    //                 getBusinessPartner(each.assignedIndividual.businessPartner, context),
    //                 getBusinessPartnerAddress(each.assignedIndividual.businessPartnerAddress, context)
    //             ])
    //         )
    //     )
    // })

    // this.after('READ', Individual, async (response, context) => {
    //     return Promise.all(
    //         //check on expanded entities in query response
    //         response.filter(response => response.businessPartner || response.businessPartnerAddress)
    //         .map(each =>
    //             //asynchronous parallel read from S/4 service for expand on businessPartner and businessPartnerAddress                 
    //             Promise.all([
    //                 getBusinessPartner(each.businessPartner, context),
    //                 getBusinessPartnerAddress(each.businessPartnerAddress, context)
    //             ])
    //         )
    //     )
    // })

    // this.after('READ', BusinessPartner, async (response, context) => {
    //     if (context.query.cqn.where && context.query.cqn.where[0] === "exists") {
    //         return Promise.all(
    //             response.map(each =>
    //                 Promise.all([
    //                     getBusinessPartner(each, context)
    //                 ])
    //             )
    //         )
    //     }
    // })

    // this.after('READ', BusinessPartnerAddress, async (response, context) => {
    //     if (context.query.cqn.where && context.query.cqn.where[0] === "exists") {
    //         return Promise.all(
    //             response.map(each =>
    //                 Promise.all([
    //                     getBusinessPartnerAddress(each, context)
    //                 ])
    //             )
    //         )
    //     }
    // })

    // const getBusinessPartner = async (each, context) => {
    //     if (!extSrv.options.mocked && each) {
    //         await extSrv.tx(context).run(
    //             SELECT.one.from(BusinessPartner).where({
    //                 BusinessPartner: each.BusinessPartner
    //             })
    //         ).then(data =>
    //             Object.assign(each, data)
    //         )
    //     }
    // }

    // const getBusinessPartnerAddress = async (each, context) => {
    //     if (!extSrv.options.mocked && each) {
    //         await extSrv.tx(context).run(
    //             SELECT.one.from(BusinessPartnerAddress).where({
    //                 BusinessPartner: each.BusinessPartner
    //             }).and({
    //                 AddressID: each.AddressID
    //             })
    //         ).then(data =>
    //             Object.assign(each, data)
    //         )
    //     }
    // } 
   ////S/4 HANA integration: End Custom query handlers     
})


