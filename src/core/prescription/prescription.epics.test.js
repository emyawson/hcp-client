import { ActionsObservable } from 'redux-observable';

import { PATIENT_PRESCRIPTION_TYPES, PATIENT_ACTIONS } from 'src/core';
import { mockCurrentPrescriptionData } from 'src/services/prescription/get-prescription/get-prescription.mock';
import {
  createLegacyMockStore,
  cleanupMockEndpoints,
  mockCurrentPrescription,
  mockGetPatientStock,
  mockSavePrescription,
} from 'src/test';

import {
  getCurrentPrescriptionEpic,
  getTherapiesEpic,
  getClinicGuidesEpic,
  getStripModelsEpic,
  constructUnsavedPermanent,
  constructUnsavedTemporary,
  constructUnsavedPrescription,
  combineWithDefaultFormState,
  prescriptionTypeFromAction,
  isStripModelStockSet,
  conditionalAction,
  onClinicGuidesUpdateEpic,
  onPatientChangeResetPrescriptionEpic,
  flattenSavedPrescriptionDateRange,
  addSavedPrescriptionIds,
} from './prescription.epics';
import {
  GET_THERAPIES_REQUEST,
  GET_CLINIC_GUIDES_REQUEST,
  GET_FREQUENCIES_REQUEST,
  GET_STRIP_MODELS_REQUEST,
  GET_CURRENT_PRESCRIPTION_REQUEST,
  UNSAVED_PRESCRIPTION_IDS,
  PRESCRIPTION_ACTIONS,
  SAVE_PRESCRIPTION_REQUEST,
} from './prescription.constants';
import {
  INITIAL_PRESCRIPTION_STATE,
  INITIAL_PRESCRIPTION_FORM_STATE,
} from './prescription.reducers';

const store = {
  getState: () => ({
    patientStock: {
      'strip-model-123': 500,
    },
    session: {
      token: '12345',
    },
  }),
};

const mockPrimaryPrescription = {
  id: 'abc-123',
  patientId: '1',
  stripModel: 'strip-model-123',
  frequency: 'twoWeeks',
  prescriptionType: 'permanent',
  clinicGuide: 'clinic-guide-123',
};

const mockPrescriptions = {
  permanent: mockPrimaryPrescription,
  temporary: [],
};

describe('mocked endpoint epics', () => {
  let mockStore;
  beforeEach(() => {
    mockStore = createLegacyMockStore({
      state: {
        prescription: INITIAL_PRESCRIPTION_STATE,
        session: {
          token: '12345',
        },
      },
    });
  });
  beforeAll(() => {
    mockCurrentPrescription({
      status: 200,
      body: mockPrescriptions,
    });
    mockGetPatientStock({
      status: 200,
      patientId: mockPrimaryPrescription.patientId,
      stripModelId: mockPrimaryPrescription.stripModel,
      body: {
        patientStock: 500,
      },
    });
    mockSavePrescription({
      status: 200,
      body: mockPrescriptions,
    });
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  const PATIENT_STOCK_START = 'PATIENT_STOCK/GET_PATIENT_STOCK_START';

  it('dispatches the correct action on get prescription success', async () => {
    mockStore.dispatch({
      type: GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS,
      payload: mockPrescriptions,
    });
    await mockStore.waitForEpics();
    const actionTypes = mockStore.getActionTypes();
    expect(actionTypes).toContain(GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS);
    expect(actionTypes).toContain(PRESCRIPTION_ACTIONS.ADD_PRESCRIPTION_ENTRY);
    expect(actionTypes).toContain(PATIENT_STOCK_START);
  });

  it('dispatches the correct action on save prescription success', async () => {
    mockStore.dispatch({
      type: SAVE_PRESCRIPTION_REQUEST.SUCCESS,
      payload: {
        patientId: mockPrimaryPrescription.patientId,
        prescription: mockPrimaryPrescription,
      },
    });
    await mockStore.waitForEpics();
    const actionTypes = mockStore.getActionTypes();
    expect(actionTypes).toContain(SAVE_PRESCRIPTION_REQUEST.SUCCESS);
    expect(actionTypes).toContain(GET_CURRENT_PRESCRIPTION_REQUEST.START);
  });

  it('dispatches the correct actions on initialize prescription', async () => {
    mockStore.dispatch({
      type: PRESCRIPTION_ACTIONS.INITIALIZE_PRESCRIPTION,
      payload: {
        therapyId: 'therapy-123',
        formId: 'abc-123',
        isTemporaryPrescription: false,
      },
    });
    await mockStore.waitForEpics();
    const actionTypes = mockStore.getActionTypes();
    expect(actionTypes).toContain(PRESCRIPTION_ACTIONS.INITIALIZE_PRESCRIPTION);
    expect(actionTypes).toContain(GET_FREQUENCIES_REQUEST.START);
    expect(actionTypes).toContain(GET_THERAPIES_REQUEST.START);
    expect(actionTypes).toContain(GET_CLINIC_GUIDES_REQUEST.START);
  });
});

describe('get current prescription epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS;
    const mockPrescriptionService = () =>
      Promise.resolve(mockCurrentPrescriptionData);

    const action$ = ActionsObservable.of({
      type: GET_CURRENT_PRESCRIPTION_REQUEST.START,
    });

    getCurrentPrescriptionEpic(mockPrescriptionService)(
      action$,
      store,
    ).subscribe(actualOutputAction => {
      expect(actualOutputAction.type).toEqual(expectedOutputActionType);
      expect(actualOutputAction.payload).toEqual(mockCurrentPrescriptionData);
      done();
    });
  });
});

describe('get therapies epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = GET_THERAPIES_REQUEST.SUCCESS;
    const mockTherapiesService = () =>
      Promise.resolve([{ id: 1, name: 'therapy' }]);

    const action$ = ActionsObservable.of({
      type: GET_THERAPIES_REQUEST.START,
      payload: {
        id: 'testForm',
      },
    });

    getTherapiesEpic(mockTherapiesService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual([
          {
            id: 1,
            name: 'therapy',
          },
        ]);
        done();
      },
    );
  });
});

describe('get clinic guides epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = GET_CLINIC_GUIDES_REQUEST.SUCCESS;
    const mockClinicGuidesService = () =>
      Promise.resolve([{ id: 1, name: 'guide' }]);

    const action$ = ActionsObservable.of({
      type: GET_CLINIC_GUIDES_REQUEST.START,
      payload: { id: 'testForm' },
    });

    getClinicGuidesEpic(mockClinicGuidesService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual({
          id: 'testForm',
          clinicGuides: [{ id: 1, name: 'guide' }],
        });
        done();
      },
    );
  });
});

describe('get strip models epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = GET_STRIP_MODELS_REQUEST.SUCCESS;
    const mockStripModelsService = () =>
      Promise.resolve({ id: 3, name: 'GLU' });

    const action$ = ActionsObservable.of({
      type: GET_STRIP_MODELS_REQUEST.START,
    });

    getStripModelsEpic(mockStripModelsService)(action$, store).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual({
          id: 3,
          name: 'GLU',
        });
        done();
      },
    );
  });
});

describe('on clinic guides update epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType =
      PRESCRIPTION_ACTIONS.UPDATE_QUANTITIES_AND_PERIODS;

    const action$ = ActionsObservable.of({
      type: GET_CLINIC_GUIDES_REQUEST.SUCCESS,
      payload: {
        id: mockPrimaryPrescription.id,
      },
    });

    const mockStore = {
      getState: () => ({
        prescription: mockPrescriptions,
      }),
    };

    onClinicGuidesUpdateEpic()(action$, mockStore).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        expect(actualOutputAction.payload).toEqual({
          clinicGuideId: mockPrimaryPrescription.clinicGuide,
          formId: mockPrimaryPrescription.id,
        });
        done();
      },
    );
  });
});

describe('on patient change epic', () => {
  it('dispatches the correct action when it is successful', done => {
    const expectedOutputActionType = PRESCRIPTION_ACTIONS.RESET_PRESCRIPTION;

    const action$ = ActionsObservable.of({
      type: PATIENT_ACTIONS.SET_NEW_PATIENT,
    });

    const mockStore = {
      getState: () => ({
        prescription: mockPrescriptions,
      }),
    };

    onPatientChangeResetPrescriptionEpic()(action$, mockStore).subscribe(
      actualOutputAction => {
        expect(actualOutputAction.type).toEqual(expectedOutputActionType);
        done();
      },
    );
  });
});

describe('get current prescription epic utils', () => {
  it('constructs an unsaved permanent prescription', () => {
    expect(constructUnsavedPermanent().id).toEqual(
      UNSAVED_PRESCRIPTION_IDS.PERMANENT,
    );
  });
  it('constructs an unsaved temporary prescription', () => {
    expect(constructUnsavedTemporary().id).toEqual(
      UNSAVED_PRESCRIPTION_IDS.TEMPORARY,
    );
  });
  it('constructs an unsaved prescription by type - permanent', () => {
    expect(
      constructUnsavedPrescription(PATIENT_PRESCRIPTION_TYPES.PERMANENT),
    ).toEqual(constructUnsavedPermanent());
  });
  it('constructs an unsaved prescription by type - temporary', () => {
    expect(
      constructUnsavedPrescription(PATIENT_PRESCRIPTION_TYPES.TEMPORARY),
    ).toEqual(constructUnsavedTemporary());
  });
  it('combines a given prescription with all initial fields', () => {
    const mockPrescription = { id: 'abc' };
    expect(combineWithDefaultFormState(mockPrescription)).toEqual({
      ...INITIAL_PRESCRIPTION_FORM_STATE,
      id: 'abc',
    });
  });
  it('derives the current prescription type from API response', () => {
    const mockErrorResponse = {
      type: GET_CURRENT_PRESCRIPTION_REQUEST.ERROR,
      payload: {
        status: 500,
      },
    };
    const mockDefaultResponse = {
      type: GET_CURRENT_PRESCRIPTION_REQUEST.SUCCESS,
      payload: {},
    };
    expect(prescriptionTypeFromAction(mockErrorResponse)).toBe(
      PATIENT_PRESCRIPTION_TYPES.PERMANENT,
    );
    expect(prescriptionTypeFromAction(mockDefaultResponse)).toBe(
      PATIENT_PRESCRIPTION_TYPES.TEMPORARY,
    );
  });
  it('determines whether patient has stock for a given strip model id', () => {
    const mockState = {
      patientStock: {
        'model-123': 500,
      },
    };
    expect(isStripModelStockSet('model-123')(mockState)).toEqual(true);
    expect(isStripModelStockSet('model-xyz')(mockState)).toEqual(false);
  });
  it('returns an action if a given condition is met', () => {
    const action = {
      type: 'TEST_ACTION',
    };
    const pass = () => true;
    const fail = () => false;
    expect(conditionalAction({ condition: pass(), action })).toEqual([action]);
    expect(conditionalAction({ condition: fail(), action })).toEqual([]);
  });
  it('flattens a saved prescription date range', () => {
    const savedPrescription = {
      id: 'abc-123',
      dateRange: {
        startDate: '2018-01-07T08:49:37.000Z',
        endDate: '2018-03-07T08:49:37.000Z',
      },
    };
    expect(
      flattenSavedPrescriptionDateRange({ prescription: savedPrescription }),
    ).toEqual({
      prescription: {
        id: savedPrescription.id,
        startDate: savedPrescription.dateRange.startDate,
        endDate: savedPrescription.dateRange.endDate,
      },
    });
  });
  it('adds key IDs to saved prescription payload', () => {
    const mockPayload = {
      patientId: 'abc-123',
      prescriptionId: 'prescription-xyz',
    };
    expect(
      addSavedPrescriptionIds(mockPrimaryPrescription, {
        payload: mockPayload,
      }),
    ).toEqual({
      patientId: mockPayload.patientId,
      previousPrescriptionId: mockPayload.prescriptionId,
      prescription: mockPrimaryPrescription,
    });
  });
});
