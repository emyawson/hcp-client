import { STATE_ACTIONS } from 'src/core/state';

import {
  INITIAL_PRESCRIPTION_STATE,
  prescriptionReducer,
} from './prescription.reducers';
import {
  updateQuantitiesAndPeriods,
  savePrescriptionRequest,
  getTherapiesRequest,
  getClinicGuidesRequest,
  addPrescriptionEntry,
  fetchTemporaryReasonsRequest,
  setActivePrescriptionForm,
  getStripModelsRequest,
  getFrequenciesRequest,
  setPrescriptionClinicGuideType,
} from './prescription.actions';
import { PRESCRIPTION_ACTIONS } from './prescription.constants';

const MOCK_PRESCRIPTION_FORM_ID = 'abc-123-xyz';

describe('Prescription reducer', () => {
  it('should return the initial state', () => {
    expect(prescriptionReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(
      INITIAL_PRESCRIPTION_STATE,
    );
  });
  it('should return the initial state when a form is reset', () => {
    expect(
      prescriptionReducer(undefined, {
        type: PRESCRIPTION_ACTIONS.RESET_PRESCRIPTION,
      }),
    ).toEqual(INITIAL_PRESCRIPTION_STATE);
  });
  it('should return the initial state when a patient is reset', () => {
    expect(
      prescriptionReducer(undefined, {
        type: STATE_ACTIONS.CLEAR_PRESCRIPTIONS,
      }),
    ).toEqual(INITIAL_PRESCRIPTION_STATE);
  });

  it('should update quantities and periods of correct form according to clinic guide', () => {
    const state = {
      activeForms: {
        abc: {
          clinicGuides: [
            { id: '123', maximumStrips: 3, minimumStrips: 2, period: 'days' },
          ],
        },
      },
    };
    expect(
      prescriptionReducer(
        state,
        updateQuantitiesAndPeriods({ clinicGuideId: '123', formId: 'abc' }),
      ),
    ).toEqual({
      activeForms: {
        abc: {
          clinicGuides: [
            { id: '123', maximumStrips: 3, minimumStrips: 2, period: 'days' },
          ],
          quantities: [2, 3],
          periods: ['days'],
        },
      },
    });
  });

  it('should remove saved active form on prescription save', () => {
    const state = {
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: [{ id: 'def', prescriptionType: 'temporary' }],
      activeForms: {
        abc: { id: 'abc' },
        def: { id: 'def' },
      },
    };
    expect(
      prescriptionReducer(
        state,
        savePrescriptionRequest.success({
          prescription: { id: 'new', prescriptionType: 'permanent' },
          previousPrescriptionId: 'abc',
        }),
      ),
    ).toEqual({
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: [{ id: 'def', prescriptionType: 'temporary' }],
      activeForms: {
        def: { id: 'def' },
      },
    });
  });

  it('should set therapies to the store', () => {
    const state = {
      activeForms: {
        abc: { id: 'abc' },
        def: { id: 'def' },
      },
    };
    const mockTherapies = [{ id: 'therapy1' }, { id: 'therapy2' }];
    expect(
      prescriptionReducer(state, getTherapiesRequest.success(mockTherapies)),
    ).toEqual({
      ...state,
      therapies: mockTherapies,
    });
  });

  it('should set clinic guides for the correct active form', () => {
    const state = {
      activeForms: {
        abc: { id: 'abc' },
        def: { id: 'def' },
      },
    };
    expect(
      prescriptionReducer(
        state,
        getClinicGuidesRequest.success({
          clinicGuides: [{ id: 'clinicGuide1' }],
          id: 'abc',
        }),
      ),
    ).toEqual({
      activeForms: {
        abc: {
          clinicGuideFilter: 'PRESET',
          clinicGuides: [{ id: 'clinicGuide1' }],
          id: 'abc',
        },
        def: { id: 'def' },
      },
      clinicGuides: [{ id: 'clinicGuide1' }],
    });
  });

  it('should add a new permanent prescription entry', () => {
    const state = {
      permanent: {},
      temporary: null,
      activeForms: {},
    };
    expect(
      prescriptionReducer(
        state,
        addPrescriptionEntry({
          id: 'new',
          prescriptionType: 'permanent',
          therapy: 'therapy1',
        }),
      ),
    ).toEqual({
      permanent: {
        id: 'new',
        prescriptionType: 'permanent',
        therapy: 'therapy1',
      },
      temporary: null,
      activeForms: {
        new: {
          id: 'new',
          clinicGuideFilter: 'PRESET',
        },
      },
    });
    expect(prescriptionReducer(state, addPrescriptionEntry({}))).toEqual(state);
  });

  it('should add a new temporary prescription entry', () => {
    const state = {
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: null,
      activeForms: { abc: { id: 'abc' } },
    };
    expect(
      prescriptionReducer(
        state,
        addPrescriptionEntry({
          id: 'new',
          prescriptionType: 'temporary',
          therapy: 'therapy1',
        }),
      ),
    ).toEqual({
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: {
        id: 'new',
        prescriptionType: 'temporary',
        therapy: 'therapy1',
      },
      activeForms: {
        abc: { id: 'abc' },
        new: {
          id: 'new',
          clinicGuideFilter: 'PRESET',
        },
      },
    });
  });

  it('should set the reasons for all temporary prescription forms', () => {
    const state = {
      activeForms: {
        perm1: { id: 'perm1' },
        temp1: { id: 'temp1' },
      },
      permanent: {
        id: 'perm1',
        prescriptionType: 'permanent',
      },
      temporary: { id: 'temp1', prescriptionType: 'temporary' },
    };

    expect(
      prescriptionReducer(
        state,
        fetchTemporaryReasonsRequest.success([
          { id: 'reason1', description: 'Test Reason' },
        ]),
      ),
    ).toEqual({
      activeForms: {
        perm1: { id: 'perm1' },
        temp1: {
          id: 'temp1',
          reasons: [{ id: 'reason1', description: 'Test Reason' }],
        },
      },
      permanent: {
        id: 'perm1',
        prescriptionType: 'permanent',
      },
      temporary: { id: 'temp1', prescriptionType: 'temporary' },
    });
  });

  it('should set a prescription form to active', () => {
    const state = {
      activeFormId: '',
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: null,
      activeForms: { abc: { id: 'abc' } },
    };
    expect(
      prescriptionReducer(
        state,
        setActivePrescriptionForm(MOCK_PRESCRIPTION_FORM_ID),
      ),
    ).toEqual({
      ...state,
      activeFormId: MOCK_PRESCRIPTION_FORM_ID,
    });
  });

  it('should add fetched strip models to the store', () => {
    const state = {
      activeFormId: '',
      permanent: { id: 'abc', prescriptionType: 'permanent' },
      temporary: null,
      activeForms: { abc: { id: 'abc' } },
    };
    const mockStripModels = [
      { id: 'strip-model-123', name: 'Accu Check Testing' },
    ];
    expect(
      prescriptionReducer(
        state,
        getStripModelsRequest.success(mockStripModels),
      ),
    ).toEqual({
      ...state,
      stripModels: mockStripModels,
    });
  });

  it('should add fetched frequencies to the store', () => {
    const state = {
      activeForms: {
        abc: { id: 'abc' },
        xyz: { id: 'xyz' },
      },
    };
    const mockFrequencies = [{ id: 'twoWeeks', name: 'Two Weeks' }];
    expect(
      prescriptionReducer(
        state,
        getFrequenciesRequest.success(mockFrequencies),
      ),
    ).toEqual({
      ...state,
      frequencies: mockFrequencies,
    });
  });

  it('should set custom clinic guide status for the currently active form', () => {
    const state = {
      activeFormId: 'abc',
      activeForms: {
        abc: { id: 'abc' },
        xyz: { id: 'xyz' },
      },
    };
    const mockClinicGuideStatus = { id: 'abc', isCustom: true };
    expect(
      prescriptionReducer(
        state,
        setPrescriptionClinicGuideType(mockClinicGuideStatus),
      ),
    ).toEqual({
      activeFormId: 'abc',
      activeForms: {
        abc: {
          id: 'abc',
          hasCustomClinicGuide: true,
        },
        xyz: {
          id: 'xyz',
        },
      },
    });
  });
  describe('Custom Clinic Guides Form', () => {
    it('should set a flag to show the custom clinic guides form', () => {
      const mockState = INITIAL_PRESCRIPTION_STATE;
      expect(
        prescriptionReducer(mockState, {
          type: PRESCRIPTION_ACTIONS.SHOW_CUSTOM_CLINIC_GUIDES_FORM,
        }),
      ).toEqual({
        ...mockState,
        isCreatingCustomClinicGuides: true,
      });
    });

    it('should set a flag to hide the custom clinic guides form', () => {
      const mockState = {
        ...INITIAL_PRESCRIPTION_STATE,
        isCreatingCustomClinicGuides: true,
      };
      expect(
        prescriptionReducer(mockState, {
          type: PRESCRIPTION_ACTIONS.HIDE_CUSTOM_CLINIC_GUIDES_FORM,
        }),
      ).toEqual({
        ...mockState,
        isCreatingCustomClinicGuides: false,
      });
    });
  });
});
