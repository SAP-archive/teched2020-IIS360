using IncidentService as service from '../srv/incidentservice';
using from '../srv/common';

annotate service.Incidents with @(UI : {
    //basic List Report annotations
    //the lineItem annotation defines the table columns for UI display of the annotated entity
    //https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md#LineItem
    //Table columns are defined by building blocks of type DataFieldAbstract
    //https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md#DataFieldAbstract
    LineItem                             : [
    {
        $Type : 'UI.DataField',
        Value : identifier,
    },
    {
        $Type                     : 'UI.DataField',
        Value                     : priority_code,
        Criticality               : priority.criticality,
        CriticalityRepresentation : #WithoutIcon,

    },
    {
        $Type : 'UI.DataField',
        Value : incidentStatus_code
    },
    {
        $Type : 'UI.DataField',
        Value : category_code
    },
    {
        $Type : 'UI.DataField',
        Value : title
    }
    ],

    //the managed associations incidentStatus, category and priority provide a denormalized _code property to the root entity SafetIncidents
    //Documentation managed associations: https://cap.cloud.sap/docs/guides/domain-models#use-managed-associations
    //usage of aspect sap.common.codelist for the associated entities automatically provides value help support for the selection fields
    //the entity definitions can be found in file db/schema.cds
    //Documentation codelists: https://cap.cloud.sap/docs/cds/common#aspect-sapcommoncodelist
    SelectionFields                      : [
    incidentStatus_code,
    category_code,
    priority_code
    ],

    //	Information for the header area of an entity representation
    HeaderInfo                           : {
        TypeName       : '{i18n>Incident}',
        TypeNamePlural : '{i18n>Incidents}',
        TypeImageUrl   : 'sap-icon://alert',
        Title          : {Value : title}
    },

    //Facets for additional object header information (shown in the Object Page header)
    HeaderFacets                         : [{
        $Type  : 'UI.ReferenceFacet',
        Target : '@UI.FieldGroup#HeaderGeneralInformation'
    },
    //begin of header facet enhancement

    //end of header facet enhancement
    ],

    //Group of fields with an optional label
    //https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md#FieldGroupType
    FieldGroup #HeaderGeneralInformation : {Data : [
    {Value : priority_code},
    {Value : incidentStatus_code},
    {Value : category_code}
    ]},

    FieldGroup #IncidentDetails          : {Data : [
    {
        $Type : 'UI.DataField',
        Value : title
    },
    {
        $Type : 'UI.DataField',
        Value : description
    },
    ]},

    FieldGroup #GeneralInformation       : {Data : [
        {
        $Type : 'UI.DataField',
        Value : identifier,
    },
    {
        $Type : 'UI.DataField',
        Value : priority_code
    },
    {
        $Type : 'UI.DataField',
        Value : category_code
    },
    {
        $Type : 'UI.DataField',
        Value : incidentStatus_code
    }
    ]},

    //begin of field group enhancement

    //end of field group enhancement

    //Object Page content area is organized by facets referring to e.g. fieldgroup and lineItem annotations
    //https://github.com/SAP/odata-vocabularies/blob/master/vocabularies/UI.md#Facet
    Facets                               : [
    {
        $Type  : 'UI.CollectionFacet',
        Label  : '{i18n>IncidentOverview}',
        ID     : 'IncidentOverviewFacet',
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>GeneralInformation}',
                ID     : 'GeneralInformationFacet',
                Target : '@UI.FieldGroup#GeneralInformation'
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>IncidentDetails}',
                ID     : 'IncidentDetailsFacet',
                Target : '@UI.FieldGroup#IncidentDetails'
            },

        //begin of reference facet enhancement

        //end of reference facet enhancement
        ]
    },
    //this facet shows a table on the Object Page by referring to a lineItem annotation via association incidentFlow
    //the referred LineItem annotation definition for entity IncidentFlow is defined below
    {
        $Type         : 'UI.ReferenceFacet',
        Label         : '{i18n>IncidentProcessFlow}',
        ID            : 'ProcessFlowFacet',
        Target        : 'incidentFlow/@UI.LineItem',
        ![@UI.Hidden] : isDraft
    }

    ]
});

annotate service.IncidentFlow with @(UI : {LineItem : [

//begin of column enhancement

//end of column enhancement
{
    $Type : 'UI.DataField',
    Value : processStep
},
{
    $Type : 'UI.DataField',
    Value : stepStartDate
},
{
    $Type : 'UI.DataField',
    Value : stepEndDate
}
]});
