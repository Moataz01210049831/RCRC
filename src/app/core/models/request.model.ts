export interface AddComplainRequest {
  Title:                    string;
  NationalAddress:          string;
  ContactId:                string;
  Description:              string;
  mediaEmail:               string;
  mediaUserName:            string;
  MobileNumber:             string;
  IdNumber:                 string;
  IdType:                   string | number;
  authorityId:              string;
  attachmentArr:            { file: File; dis: string }[];
}

export interface RequestsApiResponse {
  Success:    boolean;
  Message:    string;
  Data:       RequestItem[];
  MetaData:   null;
  TotalCount: number;
}

export interface LookupItem {
  Id:       string;
  Name:     string;
  Value:    string;
  Code:     string;
  Order:    number;
  ParentId: string;
}

export interface SurveyItem {
  Id:       string;
  Name:     string;
  Required: boolean;
  Type:     string;
  Value:    string;
  ReadOnly: boolean;
  Options:  string[];
}

export interface ContactInfo {
  Email:               string;
  LastName:            string;
  FamilyName:          string | null;
  FirstName:           string;
  MobileNumber:        string;
  MobileNumber2:       string | null;
  IdentityNumber:      string;
  IdentityTypeId:      number;
  Middlename:          string | null;
  ThirdName:           string | null;
  ThirdNameEn:         string | null;
  Nationality:         string | null;
  NationalityId:       string | null;
  Birthdate:           string | null;
  Identityrelateddate: string | null;
  BirthDateH:          string | null;
  GenderId:            number;
  CityId:              string | null;
  FullName:            string;
  FullNameEn:          string | null;
  FirstNameEn:         string | null;
  MiddlenameEn:        string | null;
  LastNameEn:          string | null;
  ContactSource:       number;
  Relation:            number;
  Age:                 number | null;
  DOB:                 string | null;
  RegionId:            string | null;
  EmployeeRegion:      string | null;
  EmployeeNumber:      string | null;
  PositionOrganization:string | null;
  Location:            string | null;
  JobTitle:            string | null;
  TypeofContract:      string | null;
  Supervisor:          string | null;
  Grade:               string | null;
  ContractStartdate:   string | null;
  ContractEnddate:     string | null;
  PromotionPoints:     string | null;
  PromotionYear:       string | null;
  AnnualLeaveBalance:  string | null;
  IAM_Id:              string | null;
  CustomerTypeCode:    number;
  CityName:            string | null;
  NationalAddress:     string | null;
  EntityId:            string;
  CreatedOn:           string;
  IsNew:               boolean;
  IsDeleted:           boolean;
  IsDirty:             boolean;
}

export interface RequestItem {
  // Identifiers
  Id:                          string;
  EntityId:                    string;
  TicketNumber:                string;
  SerialNumber:                string;
  Title:                       string;
  Subject:                     string;
  Description:                 string;
  Token:                       string;

  // Status
  Status:                      LookupItem | null;
  StatusId:                    string;
  Statecode:                   LookupItem | null;
  ComplainStatus:              number;

  // Classification
  Directorate:                 LookupItem | null;
  DirectorateId:               string;
  CaseSubClassification:       LookupItem | null;
  CaseSubClassificationId:     string;
  ETicketSubClassification:    LookupItem | null;
  ETicketSubClassificationId:  string;
  Sector:                      LookupItem | null;
  SectorId:                    string;
  Department:                  LookupItem | null;
  DepartmentId:                string;
  Service:                     LookupItem | null;
  ServiceId:                   string;
  SubService:                  LookupItem | null;
  SubServiceId:                string;
  Category:                    LookupItem | null;
  SubCategory:                 LookupItem | null;
  TicketType:                  LookupItem | null;
  Origin:                      LookupItem | null;
  Source:                      LookupItem | null;
  ContactSource:               LookupItem | null;
  ContactSourceId:             string;
  CommunicationProcedure:      LookupItem | null;
  DecisionType:                LookupItem | null;
  ReopenReason:                LookupItem | null;
  SmartNotificationClass:      LookupItem | null;
  ConcernAuthority:            LookupItem | null;
  Authority:                   LookupItem | null;
  authorityId:                 string;
  ServiceProvider:             LookupItem | null;
  Specialization:              LookupItem | null;
  SpecializationId:            string;
  Cities:                      LookupItem | null;
  CityId:                      string;

  // Contacts
  Customer:                    ContactInfo | null;
  OnBehalfContact:             ContactInfo | null;
  AssignContact:               ContactInfo | null;
  CreatedByContact:            ContactInfo | null;
  CreatedBy:                   string;

  // Dates & flags
  SubmitDate:                  string;
  ComplaintDate:                string;
  CreatedOn:                   string;
  IsEscalated:                 boolean;
  IsUrgent:                    boolean;
  HasOldComplaint:             boolean;
  IsAttached:                  boolean;
  IsSecret:                    boolean;
  IsETicket:                   boolean;
  IsFollowUp:                  boolean;
  IsReopen:                    boolean;
  IsShowStatement:             boolean;
  IsSehati:                    boolean;
  SendPsCustomerForm:          boolean;
  IsMoatmer:                   boolean;
  IsProblemSolvedFromAgent:    boolean;
  IsNew:                       boolean;
  IsDeleted:                   boolean;
  IsDirty:                     boolean;

  // Other
  ComplainQuestions:           Record<string, unknown>;
  ComplaintNumber:             string;
  BeneficiaryStatement:        string;
  BeneficiaryNumber:           string;
  UserComment:                 string;
  Questionnaire:               string;
  SpecialistQuestionnaire:     string;
  Surveys:                     SurveyItem[];
  SpecialistSurveys:           SurveyItem[];
  FollowUpNumber:              number;
  MobileNumber:                string;
  Latitude:                    number;
  Longitude:                   number;
  InteractionId:               string;
  EscalatedFromDivision:       LookupItem | null;
}
