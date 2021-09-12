import {
  createModal,
  destroyModal,
  updateModal,
  removeModalByKey,
} from './modal.actions';
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
  it('should dispatch an action to remove all modals', () => {
    const actual = destroyModal();
    const expected = {
      type: MODAL_ACTIONS.REMOVE_ALL_MODALS,
    };
    expect(actual).toEqual(expected);
  });
  it('should dispatch an action to remove a modal with a specified key', () => {
    const actual = removeModalByKey({ key: mockModal.key });
    const expected = {
      type: MODAL_ACTIONS.REMOVE_MODAL_BY_KEY,
      payload: {
        key: mockModal.key,
      },
    };
    expect(actual).toEqual(expected);
  });
  it('should dispatch an action to update a modal', () => {
    const actual = updateModal(mockModal);
    const expected = {
      type: MODAL_ACTIONS.UPDATE_MODAL,
      payload: mockModal,
    };
    expect(actual).toEqual(expected);
  });
  it('should dispatch an action to update a modal with default data', () => {
    const actual = updateModal(emptyModal);
    const expected = {
      type: MODAL_ACTIONS.UPDATE_MODAL,
      payload: {
        ...emptyModal,
        data: {},
      },
    };
    expect(actual).toEqual(expected);
  });
});
