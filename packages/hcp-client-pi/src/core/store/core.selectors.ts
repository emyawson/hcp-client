import { path } from 'ramda';
import { createSelector } from 'reselect';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';

import { State } from './core.types';

export const selectPatternsAndIndicators = createSelector(
  path([PATTERNS_AND_INDICATORS_NAMESPACE]),
  (patternsAndIndicators: State['patternsAndIndicators']) =>
    patternsAndIndicators,
);
