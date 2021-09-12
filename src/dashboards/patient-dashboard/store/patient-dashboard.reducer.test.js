import {
  fetchPatientRequest,
  FETCH_PATIENT_DATE_RANGE_REQUEST,
  createRequestActions,
} from 'src/core';

import {
  INITIAL_PATIENT_DASHBOARD_STATE,
  patientDashboardReducer,
} from './patient-dashboard.reducer';

describe('Patient dashboard reducer', () => {
  const mockPatient = {
    name: {
      first: 'Bob',
      last: 'Smith',
    },
    diabetesType: 1,
    birthdate: 19900101,
    phone: 212111111,
  };
  it('should return the initial state', () => {
    expect(
      patientDashboardReducer(undefined, { type: 'OTHER_ACTION' }),
    ).toEqual(INITIAL_PATIENT_DASHBOARD_STATE);
  });

  it('properly captures setPatient dispatch to change patient dashboard state', () => {
    expect(
      patientDashboardReducer(
        INITIAL_PATIENT_DASHBOARD_STATE,
        fetchPatientRequest.success(mockPatient),
      ),
    ).toEqual({
      ...INITIAL_PATIENT_DASHBOARD_STATE,
      isFetchingPatient: false,
    });
  });

  it('sets isFetchingPatientDateRange to false on error of fetch patient date range request', () => {
    expect(
      patientDashboardReducer(
        INITIAL_PATIENT_DASHBOARD_STATE,
        createRequestActions(FETCH_PATIENT_DATE_RANGE_REQUEST).error(),
      ),
    ).toEqual({
      ...INITIAL_PATIENT_DASHBOARD_STATE,
      isFetchingPatientDateRange: false,
    });
  });

  it('sets isFetchingPatientDateRange to false on success of fetch patient date range request', () => {
    expect(
      patientDashboardReducer(
        INITIAL_PATIENT_DASHBOARD_STATE,
        createRequestActions(FETCH_PATIENT_DATE_RANGE_REQUEST).success({
          latestMeasurement: null,
        }),
      ),
    ).toEqual({
      ...INITIAL_PATIENT_DASHBOARD_STATE,
      isFetchingPatientDateRange: false,
    });
  });

  it('sets isFetchingPatientDateRange to true on start of fetch patient date range request', () => {
    expect(
      patientDashboardReducer(
        INITIAL_PATIENT_DASHBOARD_STATE,
        createRequestActions(FETCH_PATIENT_DATE_RANGE_REQUEST).start(),
      ),
    ).toEqual({
      ...INITIAL_PATIENT_DASHBOARD_STATE,
      isFetchingPatientDateRange: true,
    });
  });
});
