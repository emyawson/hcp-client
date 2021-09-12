import { reject, propEq, findIndex, update } from 'ramda';

import { MODAL_ACTIONS } from './modal.constants';

export const INITIAL_MODAL_STATE = [];

export const modalsReducer = (state = INITIAL_MODAL_STATE, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.ADD_MODAL:
      return [
        ...state,
        {
          data: action.payload.data,
          key: action.payload.key,
        },
      ];
    case MODAL_ACTIONS.REMOVE_ALL_MODALS:
      return [];
    case MODAL_ACTIONS.REMOVE_MODAL_BY_KEY:
      return reject(propEq('key', action.payload.key), state);
    case MODAL_ACTIONS.UPDATE_MODAL:
      const { key, data } = action.payload;
      const indexToReplace = findIndex(propEq('key', key), state);
      return indexToReplace >= 0
        ? update(indexToReplace, { key, data }, state)
        : state;
    default:
      return state;
  }
};
