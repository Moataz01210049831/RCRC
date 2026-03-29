export interface LoginApiResponse {
  Success:   boolean;
  Message:   string;
  Data:      LoginApiData;
  MetaData:  null;
  TotalCount: number;
}

export interface LoginApiData {
  Id:         string;
  UserName:   string;
  Email:      string;
  IsTrainee:  boolean;
  Roles:      string[];
  FullName:   string | null;
  JWToken:    string;
  Contact:    LoginApiContact;
}

export interface LoginApiContact {
  FirstName:      string;
  LastName:       string;
  FullName:       string;
  MobileNumber:   string;
  IdentityNumber: string;
  IdentityTypeId: number;
  EntityId:      string;
  Email:          string;
  JobTitle:       string | null;
}
