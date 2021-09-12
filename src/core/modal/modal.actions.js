import { MODAL_ACTIONS } from './modal.constants';

export const createModal = ({ key, data = {} }) => ({
  payload: {
    data,
    key,
  },
  type: MODAL_ACTIONS.ADD_MODAL,
});

export const removeModalByKey = ({ key }) => ({
  payload: {
    key,
  },
  type: MODAL_ACTIONS.REMOVE_MODAL_BY_KEY,
});

export const updateModal = ({ key, data = {} }) => ({
  payload: {
    data,
    key,
  },
  type: MODAL_ACTIONS.UPDATE_MODAL,
});

export const destroyModal = () => ({
  type: MODAL_ACTIONS.REMOVE_ALL_MODALS,
});

export const onAddModalHandler = () => ({
  payload: {
    action: 'document.body.style.overflow = hidden',
    trigger: MODAL_ACTIONS.ADD_MODAL,
  },
  type: MODAL_ACTIONS.DOM_HIDE_BODY_OVERFLOW,
});

export const onRemoveModalHandler = () => ({
  payload: {
    action: 'document.body.style.overflow = auto',
    trigger: MODAL_ACTIONS.REMOVE_ALL_MODALS,
  },
  type: MODAL_ACTIONS.DOM_SHOW_BODY_OVERFLOW,
});
