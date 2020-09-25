namespace scp.cloud;
using IncidentService as service from './incidentservice';
using {
    cuid
} from '@sap/cds/common';

type Identifier : String(100)@(title : 'Identifier');
@cds.autoexpose
abstract entity identified : cuid {
    identifier : Identifier not null;
}

//Bolded display of first table column values can be achieved by defining annotations Common.SemanticKey and
//Common.TextArrangment for the entities key and referring to a 'human-readable' identifier to be displayed instead.

annotate identified with @(
    Common.SemanticKey : [identifier],
    UI.Identification  : [{Value : identifier}]
) {

    ID         @Common : {
        Text            : identifier,
        TextArrangement : #TextOnly
        
    };
}

annotate cuid with {
    ID @(
        title : '{i18n>ID}',
        UI.HiddenFilter,
        Core.Computed
    );
}

type TechnicalBooleanFlag : Boolean @(
    UI.Hidden,
    Core.Computed
);

type TechnicalFieldControlFlag : Integer @(
    UI.Hidden,
    Core.Computed
);

type Criticality : Integer @(
    UI.Hidden,
    Core.Computed
);

annotate service.SafetyIncidents with {
    ID @UI.Hidden: true;
    assignedIndividual @UI.Hidden : true;
    identifier @(Common.FieldControl: identifierFieldControl);
};

annotate service.SafetyIncidents with {
    incidentStatus @Common : {
        Text            : incidentStatus.name,
        TextArrangement : #TextOnly,
        ValueListWithFixedValues
    };
  category @Common : {
        Text            : category.name,
        TextArrangement : #TextOnly,
        ValueListWithFixedValues
    };  
  priority @Common : {
        Text            : priority.name,
        TextArrangement : #TextOnly,
        ValueListWithFixedValues
    };
};

annotate service.Category with {
    code @Common : {
        Text            : name,
        TextArrangement : #TextOnly
    }    @title :  'Category'
};

annotate service.Priority with {
    code @Common : {
        Text            : name,
        TextArrangement : #TextOnly
    }    @title :  'Priority'
};

annotate service.IncidentStatus with {
    code @Common : {
        Text            : name,
        TextArrangement : #TextOnly
    }    @title :  'Incident Status'
};

annotate service.Individual with @(Communication.Contact : {
    fn   : businessPartnerID
});