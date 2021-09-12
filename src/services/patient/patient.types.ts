export enum DiabetesType {
  TYPE_1 = 'DIABETES_TYPE1',
  TYPE2 = 'DIABETES_TYPE2',
  GESTATIONAL = 'DIABETES_GESTATIONAL',
}

export enum DownloadNoticePeriod {
  NO_WARNING = 'NO_WARNING',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type EC6Patient = {
  clinicalRecordNumber?: string;
  diabetesType: DiabetesType;
  diagnosticDate: string;
  downloadNoticePeriod?: DownloadNoticePeriod;
  expectedDeliverDate: string;
  healthCareSystemId: string;
  nursingHome?: boolean;
  pregnant: boolean;
  professionalList: number[];
  timeZone?: string;
  user: {
    address: {
      address: string;
      city: string;
      country: {
        id: number;
      };
      postalCode: string;
      province: string;
    };
    birthday: string;
    departmentProfileId: number;
    email: string;
    gender: Gender;
    gigyaUid?: string;
    hcpIsAccessible: boolean;
    languageId: number;
    name: string;
    phone: string;
    surname: string;
    surname2: string;
  };
};
