import { createSelector } from 'reselect';

import { average } from 'src/domains/diagnostics/utils';
import {
  selectBolusesInDateSliderRange,
  selectBolusPerDay,
} from 'src/domains/diagnostics/store/selectors';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants.js';

import { zeroCheck } from './blood-glucose-general-stats.util.js';

export const selectBolusCounts = createSelector(
  selectBolusesInDateSliderRange,
  boluses => {
    if (!boluses.length) {
      return {
        std: EMPTY_VALUE_PLACEHOLDER,
        scr: EMPTY_VALUE_PLACEHOLDER,
        ext: EMPTY_VALUE_PLACEHOLDER,
        mul: EMPTY_VALUE_PLACEHOLDER,
        total: EMPTY_VALUE_PLACEHOLDER,
      };
    }

    return boluses.reduce(
      (acc, bolus) => {
        if (bolus.bolusType) {
          const bolusType = bolus.bolusType.toLowerCase();
          acc[bolusType] += 1;
        }
        return acc;
      },
      {
        std: 0,
        scr: 0,
        ext: 0,
        mul: 0,
        total: boluses.length,
      },
    );
  },
);

export const selectMeanBolus = createSelector(
  selectBolusesInDateSliderRange,
  boluses => average(boluses.map(bolus => bolus.bolusValue)).toFixed(1),
);

export const selectMinBolus = createSelector(
  selectBolusesInDateSliderRange,
  boluses => Math.min(...boluses.map(bolus => bolus.bolusValue)).toFixed(1),
);

export const selectMaxBolus = createSelector(
  selectBolusesInDateSliderRange,
  boluses => Math.max(...boluses.map(bolus => bolus.bolusValue)).toFixed(1),
);

export const selectBolusFrequency = createSelector(
  selectBolusPerDay,
  ({ totalPerDay }) => totalPerDay.toFixed(1),
);

export const selectAllBolusStats = createSelector(
  selectBolusCounts,
  selectMeanBolus,
  selectMinBolus,
  selectMaxBolus,
  selectBolusFrequency,
  ({ std, scr, ext, mul, total }, mean, min, max, frequency) => ({
    std,
    scr,
    ext,
    mul,
    total,
    mean: zeroCheck(mean),
    min: min === 'Infinity' ? EMPTY_VALUE_PLACEHOLDER : min,
    max: max === '-Infinity' ? EMPTY_VALUE_PLACEHOLDER : max,
    frequency: frequency,
  }),
);
