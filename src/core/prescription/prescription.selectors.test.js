import { path } from 'ramda';

import {
  selectAllowAddTemporaryPrescription,
  selectUserHasMaxPrescriptions,
  selectCurrentPrescriptionWithStripModels,
  selectCurrentPrescription,
  selectPrescriptions,
  selectPrescriptionsList,
  selectClinicGuideDropdownOptions,
  selectGuidePageNumbers,
} from './prescription.selectors';
import { INITIAL_PRESCRIPTION_STATE } from './prescription.reducers';
import {
  UNSAVED_PRESCRIPTION_IDS,
  GET_CURRENT_PRESCRIPTION,
  GUIDE_HISTORY_FILTERS,
} from './prescription.constants';

const mockStripModels = [
  {
    id: '1',
    name: 'Accu Check Testing',
  },
  {
    id: '2',
    name: 'Accu Check Performatest',
  },
];

const mockRequestsState = {
  request: {
    onGoingRequests: [],
  },
};

const mockRequestsLoadingState = {
  request: {
    onGoingRequests: [GET_CURRENT_PRESCRIPTION],
  },
};

const mockInitialState = {
  ...mockRequestsState,
  prescription: {
    ...INITIAL_PRESCRIPTION_STATE,
  },
};

const mockPrimaryPrescription = {
  id: 'abc-123',
  stripModel: '1',
  frequency: {
    unit: 'weeks',
    duration: 2,
  },
  prescriptionType: 'permanent',
};

const mockTemporaryPrescription = {
  id: 'xyz-999',
  stripModel: '2',
  frequency: {
    unit: 'months',
    duration: 1,
  },
  prescriptionType: 'temporary',
};

const mockPrimaryState = {
  ...mockRequestsState,
  prescription: {
    ...INITIAL_PRESCRIPTION_STATE,
    stripModels: mockStripModels,
    permanent: mockPrimaryPrescription,
    activePrescription: 'permanent',
  },
};

const mockPrescriptionState = {
  ...mockRequestsState,
  prescription: {
    ...INITIAL_PRESCRIPTION_STATE,
    stripModels: mockStripModels,
    permanent: mockPrimaryPrescription,
    temporary: mockTemporaryPrescription,
    activePrescription: 'temporary',
  },
};

const mockUnsavedState = {
  ...mockRequestsState,
  prescription: {
    ...INITIAL_PRESCRIPTION_STATE,
    permanent: {
      ...mockPrimaryPrescription,
      id: UNSAVED_PRESCRIPTION_IDS.PERMANENT,
    },
  },
};

describe('Prescription Selector tests', () => {
  it('should select a list of all prescriptions when state is empty', () => {
    const state = mockInitialState;
    expect(selectPrescriptionsList(state)).toEqual({
      permanent: state.prescription.permanent,
      temporary: state.prescription.temporary,
    });
  });
  it('should select a list of all prescriptions when one or more prescriptions are set', () => {
    const state = mockPrescriptionState;
    expect(selectPrescriptionsList(state)).toEqual({
      permanent: state.prescription.permanent,
      temporary: state.prescription.temporary,
    });
  });
  it('should select prescriptions with strip model info and frequency IDs', () => {
    const state = mockPrescriptionState;
    expect(selectPrescriptions(state)).toEqual({
      permanent: {
        ...state.prescription.permanent,
        stripModelName: path([0, 'name'], mockStripModels),
        frequency: 'twoWeeks',
      },
      temporary: {
        ...state.prescription.temporary,
        stripModelName: path([1, 'name'], mockStripModels),
        frequency: 'oneMonth',
      },
    });
  });
  it('should select current prescription - primary', () => {
    const state = mockPrimaryState;
    expect(selectCurrentPrescription(state)).toEqual(mockPrimaryPrescription);
  });
  it('should select current prescription - temporary', () => {
    const state = mockPrescriptionState;
    expect(selectCurrentPrescription(state)).toEqual(mockTemporaryPrescription);
  });
  it('should select current prescription when unsaved', () => {
    const state = mockUnsavedState;
    expect(selectCurrentPrescription(state)).toEqual(null);
  });
  it('should select if user has the max allowed prescriptions', () => {
    const state = mockPrescriptionState;
    expect(selectUserHasMaxPrescriptions(state)).toEqual(true);
  });
  it('should select if user does not have the max allowed prescriptions', () => {
    const state = mockPrimaryState;
    expect(selectUserHasMaxPrescriptions(state)).toEqual(false);
  });
  it('should select if the user can manually add a new temporary prescription', () => {
    const state = mockPrimaryState;
    expect(selectAllowAddTemporaryPrescription(state)).toEqual(true);
  });
  it('should select if the user can manually add a new temporary prescription with an empty or loading state', () => {
    const mockLoadingState = {
      ...mockInitialState,
      ...mockRequestsLoadingState,
    };
    expect(selectAllowAddTemporaryPrescription(mockLoadingState)).toEqual(
      false,
    );
    expect(selectAllowAddTemporaryPrescription(mockInitialState)).toEqual(true);
  });
  it('should select current prescription with strip model name inserted from the store', () => {
    const state = mockPrimaryState;
    expect(selectCurrentPrescriptionWithStripModels(state)).toEqual({
      ...mockPrimaryPrescription,
      stripModelName: path([0, 'name'], mockStripModels),
    });
  });
  it('should select current prescription if no strip models are set', () => {
    const state = {
      prescription: {
        ...mockPrimaryState.prescription,
        stripModels: [],
      },
    };
    expect(selectCurrentPrescriptionWithStripModels(state)).toEqual(
      mockPrimaryPrescription,
    );
  });
  it('should select a list of filtered clinic guide dropdown options so that there are only guides corresponding to the current filter type and with active status unless associated with current prescription', () => {
    const state = {
      prescription: {
        permanent: {
          clinicGuide: '666',
          stripModel: '999',
        },
        activeForms: {
          sampleForm: {
            clinicGuideFilter: 'CUSTOM',
            clinicGuides: [
              { id: '123', isActive: true, type: 'CUSTOM' },
              { id: '345', isActive: true, type: 'PRESET' },
              { id: '666', isActive: false, type: 'CUSTOM' },
            ],
          },
        },
        stripModels: [
          {
            id: '999',
            name: 'model',
          },
        ],
      },
    };
    expect(selectClinicGuideDropdownOptions(state)).toEqual({
      sampleForm: [
        expect.objectContaining({ value: '123' }),
        expect.objectContaining({ value: '666' }),
      ],
    });
  });
  it('should produce correct number of guide page numbers based on what is the current filter', () => {
    const state = {
      prescription: {
        clinicGuides: [
          {
            id: '1',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: true,
            therapyId: '1',
          },
          {
            id: '2',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: true,
            therapyId: '1',
          },
          {
            id: '3',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: true,
            therapyId: '1',
          },
          {
            id: '4',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: true,
            therapyId: '1',
          },
          {
            id: '5',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: false,
            therapyId: '1',
          },
          {
            id: '6',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: false,
            therapyId: '1',
          },
          {
            id: '7',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: false,
            therapyId: '1',
          },
          {
            id: '8',
            isActive: true,
            type: 'CUSTOM',
            isRemovable: false,
            therapyId: '1',
          },
        ],
        therapies: [{ id: '1', therapyName: 'sample' }],
        guideHistoryFilter: GUIDE_HISTORY_FILTERS.PERSONAL,
      },
    };
    expect(selectGuidePageNumbers(state)).toEqual([1]);
  });
});
