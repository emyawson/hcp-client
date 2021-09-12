import { createSelector } from 'reselect';

import {
  selectPatientStartDate,
  selectPatientEndDate,
} from 'src/domains/diagnostics/store/selectors';

import {
  generateDayRange,
  convertDaysToDayTicks,
  convertDaysToMonthYearTicks,
} from './trend.util';

export const selectDayRange = createSelector(
  selectPatientStartDate,
  selectPatientEndDate,
  (startDate, endDate) => generateDayRange(startDate, endDate),
);

export const selectHorizontalDayTicks = createSelector(selectDayRange, days =>
  convertDaysToDayTicks(days),
);

export const selectHorizontalMonthYearTicks = createSelector(
  selectDayRange,
  days => convertDaysToMonthYearTicks(days),
);
