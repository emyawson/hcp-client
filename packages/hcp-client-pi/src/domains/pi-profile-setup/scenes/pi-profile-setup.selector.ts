import { createSelector } from 'reselect';

import { selectPatternsAndIndicators } from '@roche/patterns-indicators/core/store';

export const selectProfile = createSelector(
  selectPatternsAndIndicators,
  ({ piProfileSetup }) => piProfileSetup,
);
