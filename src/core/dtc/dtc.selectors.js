import { path, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const selectDTCState = path(['dtc']);

export const selectDTCLink = createSelector([selectDTCState], dtcState =>
  propOr('', 'url', dtcState),
);
