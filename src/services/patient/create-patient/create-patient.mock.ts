import { DiabetesType, DownloadNoticePeriod, Gender } from '../patient.types';

export const mockPatient = {
  clinicalRecordNumber: '1234',
  diabetesType: DiabetesType.TYPE_1,
  diagnosticDate: '2018-04-17',
  downloadNoticePeriod: DownloadNoticePeriod.NO_WARNING,
  expectedDeliverDate: '2018-07-17',
  healthCareSystemId: '5678',
  nursingHome: true,
  pregnant: true,
  professionalList: [7116],
  timeZone: 'Europe/Madrid',
  user: {
    address: {
      address: 'street 1',
      city: 'Malaga',
      country: {
        id: 1,
      },
      postalCode: '2900',
      province: 'Malaga',
    },
    birthday: '1986-07-17',
    departmentProfileId: 7108,
    email: 'testCreateAPI1@mail.com',
    gender: Gender.FEMALE,
    hcpIsAccessible: true,
    languageId: 1,
    name: 'Juan',
    phone: '666666666',
    surname: 'Magan',
    surname2: 'Muñoz',
  },
};

export const mockCreatePatientResponse = {
  resultDescription: 'OK',
  model: {
    absolute: true,
    authority: 'string',
    fragment: 'string',
    host: 'string',
    opaque: true,
    path: 'string',
    port: 0,
    query: 'string',
    rawAuthority: 'string',
    rawFragment: 'string',
    rawPath: 'string',
    rawQuery: 'string',
    rawSchemeSpecificPart: 'string',
    rawUserInfo: 'string',
    scheme: 'string',
    schemeSpecificPart: 'string',
    userInfo: 'string',
  },
};

export const mockCreatePatientError = {
  resultDescription: 'INTERNAL_SERVER_ERROR',
  error: [{ error: 'User already exist!' }],
};
