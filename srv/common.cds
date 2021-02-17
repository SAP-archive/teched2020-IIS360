namespace scp.cloud;
using IncidentService as service from './incidentservice';

using {
    cuid
} from '@sap/cds/common';

annotate cuid with {
    ID @(
        title : '{i18n>ID}',
        UI.HiddenFilter,
        Core.Computed
    );
}


annotate service.Incidents with {
    ID @UI.Hidden: true;
    assignedIndividual @UI.Hidden : true;
    identifier @(Common.FieldControl: identifierFieldControl);
};

annotate service.Incidents with {
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
    code @UI.Hidden @Common : {
        Text            : name
    }    @title :  '{i18n>Category}'
};

annotate service.Priority with {
    code @UI.Hidden @Common : {
        Text            : name
    }    @title :  '{i18n>Priority}'
};

annotate service.IncidentStatus with {
    code @UI.Hidden @Common : {
        Text            : name
    }    @title :  '{i18n>IncidentStatus}'
};

//add contact card annotation