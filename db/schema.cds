namespace scp.cloud;

using {
  scp.cloud.identified,
  scp.cloud.TechnicalBooleanFlag,
  scp.cloud.TechnicalFieldControlFlag,
  scp.cloud.Criticality
} from '../srv/common';

using {
  managed,
  cuid,
  sap.common
} from '@sap/cds/common';

type Url : String;

entity SafetyIncidents : managed, identified {
  title                   : String(50)                        @title : '{i18n>Title}';
  category                : Association to one Category       @title : '{i18n>Category}';
  priority                : Association to one Priority       @title : '{i18n>Priority}';
  incidentStatus          : Association to one IncidentStatus @title : '{i18n>IncidentStatus}';
  description             : String(1000)                      @title : '{i18n>IncidentDescription}';
  assignedIndividual      : Association to one Individual;
  incidentFlow            : Association to many IncidentFlow
                              on incidentFlow.safetyIncident = $self;
  incidentProcessTimeline : Association to many IncidentProcessTimeline
                              on incidentProcessTimeline.safetyIncident = $self;
  isDraft                 : TechnicalBooleanFlag not null default false;
  identifierFieldControl  : TechnicalFieldControlFlag not null default 7; // 7 = #Mandatory;
}

entity IncidentFlow : managed {
  key id             : UUID;
      processStep    : String(30)@title : '{i18n>ProcessStep}';
      stepStatus     : String(10)@title : '{i18n>ProcessStepStatus}';
      criticality    : Integer;
      stepStartDate  : Date      @title : '{i18n>StepStartDate}';
      stepEndDate    : Date      @title : '{i18n>StepEndDate}';
      @assert.integrity :                 false
      safetyIncident : Association to SafetyIncidents;
}

entity IncidentProcessTimeline : managed {
  key id             : UUID;
      text           : String;
      type           : String;
      startTime      : DateTime;
      endTime        : DateTime;
      @assert.integrity : false
      safetyIncident : Association to SafetyIncidents;
}

entity Individual : managed {
  key id                : UUID;
      businessPartnerID : String;
      addressID         : String @UI.Hidden;
      @assert.integrity : false
      safetyIncidents   : Association to many SafetyIncidents
                            on safetyIncidents.assignedIndividual = $self;
}

entity IncidentsCodeList : common.CodeList {
  key code : String(20);
}

entity Category : IncidentsCodeList {}

entity Priority : IncidentsCodeList {
  criticality : Criticality not null default 3;
}

entity IncidentStatus : IncidentsCodeList {}
