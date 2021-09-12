import { pathOr, contains, equals, pipe, allPass, not } from 'ramda';

import {
  REQUEST,
  REQUESTS_WITH_GLOBAL_LOADER,
  REQUESTS_DESTROY_MODAL_ON_SUCCESS,
  REQUESTS_REQUIRE_CONFIRMATION_ON_SUCCESS,
} from 'src/core/request';

const isRequestActionWithGlobalLoader = action =>
  contains(pathOr('', ['meta', 'base'], action), REQUESTS_WITH_GLOBAL_LOADER);

const requestShouldDestroyModalOnSuccess = action =>
  contains(
    pathOr('', ['meta', 'base'], action),
    REQUESTS_DESTROY_MODAL_ON_SUCCESS,
  );

const requestRequiresConfirmationOnSuccess = action =>
  contains(
    pathOr('', ['meta', 'base'], action),
    REQUESTS_REQUIRE_CONFIRMATION_ON_SUCCESS,
  );

const actionMetaActivity = pathOr('', ['meta', 'activity']);

const isRequestStart = pipe(
  actionMetaActivity,
  equals(REQUEST.START),
);
const isRequestSuccess = pipe(
  actionMetaActivity,
  equals(REQUEST.SUCCESS),
);
const isRequestError = pipe(
  actionMetaActivity,
  equals(REQUEST.ERROR),
);

export const shouldTriggerLoadingModal = allPass([
  isRequestStart,
  isRequestActionWithGlobalLoader,
]);

export const shouldTriggerLoadingSuccess = allPass([
  isRequestSuccess,
  isRequestActionWithGlobalLoader,
  pipe(
    requestRequiresConfirmationOnSuccess,
    not,
  ),
]);

export const shouldTriggerSuccessRequiresConfirmation = allPass([
  isRequestSuccess,
  requestRequiresConfirmationOnSuccess,
]);

export const shouldTriggerLoadingError = allPass([
  isRequestError,
  isRequestActionWithGlobalLoader,
]);

export const shouldTriggerDestroyModal = allPass([
  isRequestSuccess,
  requestShouldDestroyModalOnSuccess,
]);
