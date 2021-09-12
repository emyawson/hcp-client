import { selectPatient } from 'src/core/patient/patient.selector';

import { selectIsFetchingData } from './patient-dashboard.selector';

describe('Patient dashboard selectors', () => {
  const mockedState = {
    ui: {
      patientDashboard: {
        isFetchingPatient: true,
        isFetchingTimeIntervals: false,
        isFetchingClinicalData: false,
      },
    },
    patient: {},
  };

  it('should select patient', () => {
    expect(selectPatient(mockedState)).toEqual({});
  });

  it('should select isFetchingData', () => {
    expect(selectIsFetchingData(mockedState)).toEqual(true);
  });
});
