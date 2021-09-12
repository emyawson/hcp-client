import { ActionsObservable } from 'redux-observable';

import {
  mockPatientData,
  mockTransformedClinicalData,
  mockTimeIntervals,
  ClinicalDataFactoryImpl,
} from 'src/services';
import {
  GET_TIME_INTERVALS_REQUEST,
  getTimeIntervalsEpic,
  fetchPatientEpic,
  FETCH_PATIENT_REQUEST,
} from 'src/core';

import { getClinicalDataEpic } from './patient-dashboard.epic';
import { PATIENT_DASHBOARD_ACTIONS } from './patient-dashboard.constant';

// TODO: dont skip these once CI issues are figured out.
xdescribe('get patient epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = FETCH_PATIENT_REQUEST.SUCCESS;
    const mockPatientService = () => Promise.resolve(mockPatientData);

    const action$ = ActionsObservable.of({
      type: FETCH_PATIENT_REQUEST.START,
    });

    const store = {
      getState: () => ({
        session: {
          token: '12345',
        },
      }),
    };

    fetchPatientEpic(mockPatientService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual(mockPatientData);
      },
    );
    done();
  });
});

xdescribe('get measurements epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType =
      PATIENT_DASHBOARD_ACTIONS.SET_CLINICAL_DATA;
    const mockClinicalDataService = ClinicalDataFactoryImpl({
      devMode: true,
    });

    const mockStore = {
      getState: () => ({
        dashboard: { patient: {} },
        session: { token: '13234' },
      }),
    };

    const action$ = ActionsObservable.of({
      type: PATIENT_DASHBOARD_ACTIONS.GET_CLINICAL_DATA,
    });

    getClinicalDataEpic(mockClinicalDataService)(action$, mockStore).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual(mockTransformedClinicalData);
      },
    );
    done();
  });
});

xdescribe('get time intervals epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = GET_TIME_INTERVALS_REQUEST.SUCCESS;
    const mockTimeIntervalService = () => Promise.resolve(mockTimeIntervals);

    const action$ = ActionsObservable.of({
      type: GET_TIME_INTERVALS_REQUEST.START,
    });

    const store = {
      getState: () => ({
        session: {
          token: '12345',
        },
      }),
    };

    getTimeIntervalsEpic(mockTimeIntervalService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual(mockTimeIntervals);
      },
    );
    done();
  });
});
