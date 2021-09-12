import { INITIAL_MODAL_STATE, modalsReducer } from './modal.reducers';
import { MODAL_ACTIONS } from './modal.constants';

describe('Modal Reducer tests', () => {
  it('should return initial state', () => {
    expect(modalsReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(
      INITIAL_MODAL_STATE,
    );
  });
  it('should destroy all modals when requested', () => {
    expect(
      modalsReducer(INITIAL_MODAL_STATE, {
        type: MODAL_ACTIONS.REMOVE_ALL_MODALS,
      }),
    ).toEqual([]);
  });
  it('should add a modal when requested', () => {
    const mockModal = {
      key: 'TEST_MODAL',
      data: {
        patientId: 1,
      },
    };
    expect(
      modalsReducer(INITIAL_MODAL_STATE, {
        type: MODAL_ACTIONS.ADD_MODAL,
        payload: mockModal,
      }),
    ).toEqual([
      ...INITIAL_MODAL_STATE,
      {
        key: mockModal.key,
        data: mockModal.data,
      },
    ]);
  });
});
