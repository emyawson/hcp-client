import { GetLatestPatientsEC6Response } from './get-latest-patients.types';

export const mockGetLatestPatients: GetLatestPatientsEC6Response = {
  resultDescription: 'patientLatestOK',
  model: [
    {
      id: 57770,
      user: {
        id: null,
        name: 'JoeBlow',
        surname: 'McJoeington',
        surname2: null,
        address: null,
        fullname: 'JoeBlow McJoeington',
        inactivate: false,
        gender: 'FEMALE',
        phone: null,
        birthday: '2018-08-02T00:00:00+0000',
        email: 'joe@mail.com',
        loginId: null,
        language: null,
        languageId: null,
        languageIsoCode: null,
        languageCountryIsoCode: null,
        role: null,
        departmentProfileId: null,
        profile: null,
        countryId: null,
        inactivateReason: null,
        inactivateComment: null,
        departmentId: null,
        centerId: null,
        areaId: null,
        locked: false,
        lastAccess: null,
        passwordReset: false,
        viewNotifications: false,
        countryIsoCode: null,
        departmentName: null,
        centerName: null,
        accessEnum: null,
        profileId: null,
        gigyaUid: null,
        activeInGigya: null,
        hcpIsAccessible: true,
        noPhone: false,
        fakeMail: false,
        headerWelcome: 'JoeBlow McJoeington',
        languageIsoCodeComplete: 'null_null',
      },
      clinicalRecordNumber: null,
      healthCareSystemId: null,
      deviceType: null,
      diagnosticDate: null,
      deviceTypeLabel: null,
      timeZone: null,
      pregnant: null,
      nursingHome: null,
      professionalList: null,
      relevantClinicalData: null,
      units: null,
      expectedDeliverDate: null,
      downloadNoticePeriod: null,
      diabetesType: null,
      lastGlucoseDate: null,
      patientDevices: null,
      deviceTypeIcon: '',
      multilingualDeviceTypeLabel: '',
    },
  ],
};