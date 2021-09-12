import { createSelector, createStructuredSelector } from 'reselect';

import { selectPatternsAndIndicators } from '@roche/patterns-indicators/core/store';

const selectProfileType = createSelector(
  selectPatternsAndIndicators,
  ({ piProfileSetup }) => piProfileSetup.profileType,
);

export const configurationsConnector = createStructuredSelector({
  profileType: selectProfileType,
});
