export const mockPatientData = {
  id: 10271,
  user: {
    id: 10267,
    name: 'Patient 4',
    surname: 'Consumption Low',
    surname2: 'RED',
    fullname: 'Patient 4 Consumption Low RED',
    dateOfBirth: '1960-03-17T00:00:00.000Z',
    gender: 'MALE',
    phoneNumber: null,
    email: 'redlow@patient.com',
    language: {
      language: 'English',
      languageId: 3,
      languageIsoCode: 'en',
      languageCountryIsoCode: 'GB',
    },
    timeZone: 'Europe/Madrid',
    profile: { id: 41, name: 'STANDARD' },
    address: {
      id: 10268,
      address: '',
      postalCode: '',
      city: '',
      province: '',
      country: {
        id: 1,
        name: 'Spain',
        isoCode: 'es',
        labelProperty: 'configuration.country.es',
        labelText: null,
        language: {
          id: 1,
          languageId: '1',
          labelProperty: 'enum.Spanish',
          labelText: null,
          key: '1',
          value: null,
        },
        timeZone: 'Europe/Madrid',
        currency: 'EURO',
        key: '1',
        value: null,
      },
    },
  },
  center: { id: 6901, name: 'Angel Hospital' },
  department: { id: 6906 },
  profile: { id: 41, name: 'STANDARD' },
  treatment: { name: '' },
  patientDetails: {
    diabetesType: 'DIABETES_TYPE2',
    clinicalRecordNumber: null,
    healthCareSystemId: '4444',
    units: null,
    diagnosticDate: false,
    timeZone: 'Europe/Madrid',
    isPregnant: false,
    pregnancyDeliveryDate: false,
    isInNursingHome: false,
    lastGlucoseDate: false,
    downloadNoticePeriod: 'NO_WARNING',
  },
  deviceInfo: {
    multilingualDeviceTypeLabel: '',
    deviceTypeIcon: '',
    deviceTypeLabel: null,
    deviceType: null,
    patientDevices: [],
  },
};