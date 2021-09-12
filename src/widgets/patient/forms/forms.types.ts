export enum PatientFormModel {
  profileType = '.profileType',
  diabetesType = '.diabetesType',
  firstAssociatedProfessional = '.firstAssociatedProfessional',
  secondAssociatedProfessional = '.secondAssociatedProfessional',
  dateOfDiagnosis = '.dateOfDiagnosis',
  pregnant = '.pregnant',
  dueDate = '.dueDate',
  gender = '.gender',
  firstName = '.firstName',
  lastName = '.lastName',
  healthCareId = '.healthCareId',
  email = '.email',
  language = '.language',
  allowPatientAccess = '.allowPatientAccess',
  phoneNumber = '.phoneNumber',
  street = '.street',
  city = '.city',
  province = '.province',
  postalCode = '.postalCode',
  country = '.country',
  dateOfBirthMonth = '.dateOfBirthMonth',
  dateOfBirthDay = '.dateOfBirthDay',
  dateOfBirthYear = '.dateOfBirthYear',
}

export type FormControlOption = {
  readonly label: string;
  readonly value: string;
};
