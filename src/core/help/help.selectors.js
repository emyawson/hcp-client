import { path, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const selectHelpState = path(['help']);

export const selectIsHelpLoading = createSelector(
  [selectHelpState],
  helpState => propOr(false, 'isLoading', helpState),
);
export const selectHelpLink = createSelector([selectHelpState], helpState =>
  propOr('', 'url', helpState),
);
