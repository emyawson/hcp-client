import { ActionsObservable } from 'redux-observable';

import { createLegacyMockStore } from 'src/test';
import {
  REQUEST,
  REQUESTS_WITH_GLOBAL_LOADER,
  REQUESTS_DESTROY_MODAL_ON_SUCCESS,
} from 'src/core/request';

import {
  MODAL_ACTIONS,
  MODAL_TYPES,
  LOADING_MODAL_STATUS,
} from './modal.constants';
import {
  modalDomSideEffectsEpics,
  createLoadingModalEpic,
  successLoadingModalEpic,
  errorLoadingModalEpic,
  removeLoadingModalEpic,
} from './modal.epics';

describe('Modal Epic Test', () => {
  it('it should dispatch the correct action when Modal is created', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.DOM_HIDE_BODY_OVERFLOW,
      payload: {
        trigger: MODAL_ACTIONS.ADD_MODAL,
        action: 'document.body.style.overflow = hidden',
      },
    };

    const someText = [
      {
        titleKey: 'A Title',
        descKey: 'Description',
      },
    ];
    const action$ = ActionsObservable.of({
      type: MODAL_ACTIONS.ADD_MODAL,
      payload: {
        key: 'KEY',
        data: {
          someText,
          lastUpdateDate: new Date(2018, 2, 16),
        },
      },
    });
    modalDomSideEffectsEpics()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch the correct action when Modal is destroyed', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.DOM_SHOW_BODY_OVERFLOW,
      payload: {
        trigger: MODAL_ACTIONS.REMOVE_ALL_MODALS,
        action: 'document.body.style.overflow = auto',
      },
    };
    const action$ = ActionsObservable.of({
      type: MODAL_ACTIONS.REMOVE_ALL_MODALS,
      payload: {
        key: 'KEY',
      },
    });

    modalDomSideEffectsEpics()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch action to create loading modal on request start if the request action requires it', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.ADD_MODAL,
      payload: {
        key: MODAL_TYPES.LOADING,
        data: { status: LOADING_MODAL_STATUS.LOADING },
      },
    };
    const action$ = ActionsObservable.of({
      type: REQUESTS_WITH_GLOBAL_LOADER[0],
      meta: {
        activity: REQUEST.START,
      },
    });

    createLoadingModalEpic()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch action to update the loading modal on request success if the request action requires it', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.UPDATE_MODAL,
      payload: {
        key: MODAL_TYPES.LOADING,
        data: { status: LOADING_MODAL_STATUS.SUCCESS },
      },
    };
    const action$ = ActionsObservable.of({
      type: REQUESTS_WITH_GLOBAL_LOADER[0],
      meta: {
        activity: REQUEST.SUCCESS,
      },
    });

    successLoadingModalEpic()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch an action to remove all modals if the request action requires it', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.REMOVE_ALL_MODALS,
    };
    const action$ = ActionsObservable.of({
      type: REQUESTS_DESTROY_MODAL_ON_SUCCESS[0],
      meta: {
        activity: REQUEST.SUCCESS,
      },
    });

    removeLoadingModalEpic()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch an action to remove loading modal only if the request action does not require removing all modals', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.REMOVE_MODAL_BY_KEY,
      payload: {
        key: MODAL_TYPES.LOADING,
      },
    };
    const action$ = ActionsObservable.of({
      type: REQUESTS_WITH_GLOBAL_LOADER[0],
      meta: {
        activity: REQUEST.SUCCESS,
      },
    });

    removeLoadingModalEpic()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });

  it('it should dispatch action to update the loading modal on request error if the request action requires it', () => {
    const store = createLegacyMockStore({ state: {} });
    const expectedOutputAction = {
      type: MODAL_ACTIONS.UPDATE_MODAL,
      payload: {
        key: MODAL_TYPES.LOADING,
        data: { status: LOADING_MODAL_STATUS.ERROR },
      },
    };
    const action$ = ActionsObservable.of({
      type: REQUESTS_WITH_GLOBAL_LOADER[0],
      meta: {
        activity: REQUEST.ERROR,
      },
    });

    errorLoadingModalEpic()(action$, store).subscribe(actualOutputAction => {
      expect(actualOutputAction).toEqual(expectedOutputAction);
    });
  });
});
