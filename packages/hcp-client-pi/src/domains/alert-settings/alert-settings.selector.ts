import { createSelector, createStructuredSelector } from 'reselect';

import { selectPatternsAndIndicators } from '@roche/patterns-indicators/core/store';

const selectCurrentConfigState = createSelector(
  selectPatternsAndIndicators,
  ({ forms: { currentState } }) => currentState,
);

export const alertSettingsConnector = createStructuredSelector({
  configState: selectCurrentConfigState,
});
