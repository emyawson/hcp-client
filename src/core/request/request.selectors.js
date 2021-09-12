import { intersection, path, pipe, complement, isEmpty, keys } from 'ramda';
import { createSelector } from 'reselect';

export const selectOngoingRequests = path(['request', 'onGoingRequests']);

export const selectErrors = path(['request', 'errors']);

const overlaps = pipe(
  intersection,
  complement(isEmpty),
);
const listValuesOverlapKeys = listValues => keyedObject =>
  overlaps(listValues, keys(keyedObject));

export const createRequestHasErrorSelector = requests =>
  createSelector(selectErrors, listValuesOverlapKeys(requests));
