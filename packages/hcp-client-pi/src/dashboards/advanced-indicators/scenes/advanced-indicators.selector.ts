import { createSelector, createStructuredSelector } from 'reselect';

import { selectPatternsAndIndicators } from '@roche/patterns-indicators/core/store';

const selectSelectedTabId = createSelector(
  selectPatternsAndIndicators,
  ({ advancedIndicators }) => advancedIndicators.selectedTabId,
);

const selectSelectedWarningSegment = createSelector(
  selectPatternsAndIndicators,
  ({ advancedIndicators }) => advancedIndicators.selectedWarningSegment,
);

export const advancedIndicatorsConnector = createStructuredSelector({
  selectedTabId: selectSelectedTabId,
  selectedWarningSegment: selectSelectedWarningSegment,
});
