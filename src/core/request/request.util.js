import { assocPath, omit, pathOr } from 'ramda';

import { isNotNil } from 'src/utils';

const requestNameFromAction = pathOr(null, ['meta', 'base']);

export const addRequestError = ({ action, state }) => {
  const requestName = requestNameFromAction(action);
  const status = pathOr(null, ['payload', 'status'], action);
  const errorMessage = pathOr(null, ['payload', 'statusText'], action);
  const errorCode = pathOr(null, ['payload', 'errorCode'], action);
  return isNotNil(requestName)
    ? assocPath([requestName], { status, errorMessage, errorCode }, state)
    : state;
};

export const removeRequestError = ({ action, state }) =>
  omit([requestNameFromAction(action)], state);
