import { MODAL_ACTIONS } from './modal.constants';

export const createModal = ({ key, data = {} }) => ({
  type: MODAL_ACTIONS.ADD_MODAL,
  payload: {
    key,
    data,
  },
});
