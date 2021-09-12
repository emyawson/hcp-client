import { DiabetesType, DownloadNoticePeriod, Gender } from '../patient.types';

export const mockGetPatientInfoResponse = {
  resultDescription: 'getPatientOK',
  model: {
    timeZone: 'Europe/Madrid',
    clinicalRecordNumber: null,
    healthCareSystemId: null,
    diagnosticDate: null,
    expectedDeliverDate: null,
    nursingHome: false,
    pregnant: false,
    diabetesType: DiabetesType.TYPE_1,
    downloadNoticePeriod: DownloadNoticePeriod.NO_WARNING,
    professionalList: [14065],
    user: {
      name: 'Andrew ',
      surname: 'Test',
      surname2: null,
      phone: null,
      email: 'andrewtest@mail.com',
      languageId: null,
      departmentProfileId: null,
      birthday: null,
      gender: Gender.FEMALE,
      address: {
        address: '',
        city: '',
        province: '',
        postalCode: '',
        country: {
          id: 1,
        },
      },
      hcpIsAccessible: true,
    },
  },
};

export const mockGetPatientInfoError = {
  resultDescription: '31343ERROR',
  error: [
    {
      error: 'ERROR_VERIFYING_TOKEN',
    },
  ],
};
