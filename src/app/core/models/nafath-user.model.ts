export interface NafathUser {
  id:              string;
  userName:        string;
  name:            string;
  email:           string;
  phone:           string;
  nationalId:      string;
  identityTypeId:  number;
  roles:           string[];
  token:           string;
  beneficiaryType: 'individual' | 'legal';
}
