import { createSelector } from 'reselect';

import { selectPatternsAndIndicators } from '@roche/patterns-indicators/core/store';

export const selectFormsState = createSelector(
  selectPatternsAndIndicators,
  ({ forms: { config, currentState, validators } }) => ({
    config,
    currentState,
    validators,
  }),
);
