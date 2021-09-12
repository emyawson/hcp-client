import { createRequestActions } from './request.actions';
import { REQUEST_ANIMATION_DELAY } from './request.constants';

import { getToken } from '../authentication/authentication.selectors';

// Transforms are to be composed with the service where
// the epic is defined
// --- Request sequence options ---
// delay: add a standardized timeout for loading animations

const defaultQueryTransform = payload => payload;
const defaultResponseTransform = (data, action) => data;

export const requestSequence = ({
  service,
  actionTypes,
  queryTransform = defaultQueryTransform,
  responseTransform = defaultResponseTransform,
  options = {
    delay: false,
  },
  invokeWhen = () => true,
}) => (action$, store) => {
  const actionCreators = createRequestActions(actionTypes);

  return action$
    .ofType(actionTypes.START)
    .filter(() => invokeWhen(store.getState()))
    .flatMap(action =>
      service(queryTransform(action.payload), getToken(store.getState()))
        .then(data => actionCreators.success(responseTransform(data, action)))
        .catch(error => actionCreators.error(error)),
    )
    .delay(options.delay ? REQUEST_ANIMATION_DELAY : 0);
};
