import { createModal } from './modal.actions';
import { MODAL_ACTIONS } from './modal.constants';

const mockModal = {
  key: 'TEST_MODAL',
  data: {
    patientId: 1,
  },
};

const emptyModal = {
  key: 'EMPTY_MODAL',
};

describe('Modal action tests', () => {
  it('should dispatch an action to create a modal', () => {
    const actual = createModal(mockModal);
    const expected = {
      type: MODAL_ACTIONS.ADD_MODAL,
      payload: mockModal,
    };
    expect(actual).toEqual(expected);
  });
  it('should dispatch an action to create a modal with default data', () => {
    const actual = createModal(emptyModal);
    const expected = {
      type: MODAL_ACTIONS.ADD_MODAL,
      payload: {
        ...emptyModal,
        data: {},
      },
    };
    expect(actual).toEqual(expected);
  });
});
