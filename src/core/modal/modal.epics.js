import { pathOr, length, pipe } from 'ramda';

import {
  REQUEST_LOADING_MESSAGES,
  REQUEST_SUCCESS_MESSAGES,
} from 'src/core/request';

import {
  onAddModalHandler,
  onRemoveModalHandler,
  createModal,
  destroyModal,
  updateModal,
  removeModalByKey,
} from './modal.actions';
import {
  MODAL_ACTIONS,
  MODAL_TYPES,
  LOADING_MODAL_STATUS,
} from './modal.constants';
import {
  shouldTriggerLoadingModal,
  shouldTriggerLoadingSuccess,
  shouldTriggerLoadingError,
  shouldTriggerDestroyModal,
  shouldTriggerSuccessRequiresConfirmation,
} from './modal.utils';

const domSideEffects = {
  [MODAL_ACTIONS.ADD_MODAL]: () => {
    document.body.style.overflow = 'hidden';
    return [onAddModalHandler()];
  },
  [MODAL_ACTIONS.REMOVE_ALL_MODALS]: () => {
    document.body.style.overflow = 'auto';
    return [onRemoveModalHandler()];
  },
  [MODAL_ACTIONS.REMOVE_MODAL_BY_KEY]: state => {
    const isLastModalBeingRemoved =
      pipe(
        pathOr([], ['modals']),
        length,
      )(state) < 1;
    if (isLastModalBeingRemoved) {
      document.body.style.overflow = 'auto';
      return [onRemoveModalHandler()];
    }
    return [];
  },
};

export const modalDomSideEffectsEpics = () => (action$, store) =>
  action$
    .ofType(
      MODAL_ACTIONS.ADD_MODAL,
      MODAL_ACTIONS.REMOVE_ALL_MODALS,
      MODAL_ACTIONS.REMOVE_MODAL_BY_KEY,
    )
    .flatMap(action => domSideEffects[action.type](store.getState()));

export const createLoadingModalEpic = () => action$ =>
  action$.filter(shouldTriggerLoadingModal).map(({ meta }) =>
    createModal({
      key: MODAL_TYPES.LOADING,
      data: {
        status: LOADING_MODAL_STATUS.LOADING,
        text:
          REQUEST_LOADING_MESSAGES[meta.base] ||
          REQUEST_LOADING_MESSAGES.default,
      },
    }),
  );

export const successLoadingModalEpic = () => action$ =>
  action$.filter(shouldTriggerLoadingSuccess).map(({ meta }) =>
    updateModal({
      key: MODAL_TYPES.LOADING,
      data: {
        status: LOADING_MODAL_STATUS.SUCCESS,
        text:
          REQUEST_SUCCESS_MESSAGES[meta.base] ||
          REQUEST_SUCCESS_MESSAGES.default,
      },
    }),
  );

export const successRequiresConfirmationModalEpic = () => action$ =>
  action$.filter(shouldTriggerSuccessRequiresConfirmation).map(({ meta }) =>
    updateModal({
      key: MODAL_TYPES.LOADING,
      data: {
        status: LOADING_MODAL_STATUS.SUCCESS_REQUIRES_CONFIRMATION,
        text:
          REQUEST_SUCCESS_MESSAGES[meta.base] ||
          REQUEST_SUCCESS_MESSAGES.default,
      },
    }),
  );

export const errorLoadingModalEpic = () => action$ =>
  action$.filter(shouldTriggerLoadingError).mapTo(
    updateModal({
      key: MODAL_TYPES.LOADING,
      data: { status: LOADING_MODAL_STATUS.ERROR },
    }),
  );

export const removeLoadingModalEpic = () => action$ =>
  action$
    .filter(shouldTriggerLoadingSuccess)
    .map(
      action =>
        shouldTriggerDestroyModal(action)
          ? destroyModal()
          : removeModalByKey({ key: MODAL_TYPES.LOADING }),
    )
    .delay(1500);
