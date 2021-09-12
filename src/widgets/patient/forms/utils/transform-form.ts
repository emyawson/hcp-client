import { DateTime } from 'luxon';

import { EC6Patient } from 'src/services/patient/patient.types';

import { PatientFormModel } from '../../forms/forms.types';

export const transformFormData = (
  patientFormData: { [P in keyof typeof PatientFormModel]: any },
): EC6Patient => {
  return {
    // clinicalRecordNumber: ??,
    diabetesType: patientFormData.diabetesType,
    diagnosticDate: patientFormData.dateOfDiagnosis,
    // downloadNoticePeriod: ??,
    expectedDeliverDate: patientFormData.dueDate,
    healthCareSystemId: patientFormData.healthCareId,
    // nursingHome: ??,
    pregnant: patientFormData.pregnant,
    professionalList: [22, 23], // add id's from associated professional
    // timeZone: ??, // from where
    user: {
      address: {
        address: patientFormData.street,
        city: patientFormData.city,
        country: {
          id: 1, // get this from countries api
        },
        postalCode: patientFormData.postalCode,
        province: patientFormData.province,
      },
      birthday: DateTime.utc(
        patientFormData.dateOfBirthYear,
        patientFormData.dateOfBirthMonth,
        patientFormData.dateOfBirthDay,
      ).toISO(),
      departmentProfileId: 2134, // get departmentId from professional
      email: patientFormData.email,
      gender: patientFormData.gender,
      // gigyaUid: ??, // doesn't come from spol
      hcpIsAccessible: true, // from where ?
      languageId: 1, // from ec6 language id's?,
      name: patientFormData.firstName,
      phone: patientFormData.phoneNumber,
      surname: patientFormData.lastName,
      surname2: '',
    },
  };
};
