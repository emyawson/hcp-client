import { createSelector, createStructuredSelector } from 'reselect';
import { keys } from 'ramda';

import { toGMTZone } from 'src/domains/diagnostics/utils';
import {
  selectGraphDetails,
  selectShowGridLines,
  selectTargetRange,
  selectThreshold,
  selectVerticalTicks,
  selectVerticalLabel,
  selectVerticalAxesCeiling,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import {
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import {
  selectPatientStartDate,
  selectPatientEndDate,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';

import {
  selectHorizontalDayTicks,
  selectHorizontalMonthYearTicks,
} from '../trend.selector';
import {
  fromDateString,
  sortAndCalculateDailyStats,
  calculateDifferenceInDays,
} from '../trend.util';

const normalizeStats = (measurements, startDate, endDate, ceil, floor) => {
  const start = startDate.startOf('day');
  const end = endDate.endOf('day');
  const range = calculateDifferenceInDays(start, end);
  const statsByDay = sortAndCalculateDailyStats(measurements);

  return keys(statsByDay).map(key => {
    const date = toGMTZone(fromDateString(key));
    const difference = calculateDifferenceInDays(start, date);
    const deviation =
      statsByDay[key].stdDev === EMPTY_VALUE_PLACEHOLDER
        ? 0
        : statsByDay[key].stdDev / ceil;

    return {
      max: statsByDay[key].max / ceil,
      min: statsByDay[key].min / ceil,
      deviation,
      x: difference / range + 1 / (range * 2),
      y: statsByDay[key].mean / ceil,
      data: statsByDay[key],
    };
  });
};

const normalizeGraphData = (
  measurements,
  startDate,
  endDate,
  graphYMax = GRAPH_Y_MAX,
) => normalizeStats(measurements, startDate, endDate, graphYMax, GRAPH_Y_MIN);

export const selectGraphData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectPatientStartDate,
  selectPatientEndDate,
  selectVerticalAxesCeiling,
  normalizeGraphData,
);

export const trendTrendConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  graphData: selectGraphData,
  verticalLabel: selectVerticalLabel,
  verticalTicks: selectVerticalTicks,
  horizontalDayTicks: selectHorizontalDayTicks,
  horizontalMonthYearTicks: selectHorizontalMonthYearTicks,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  showGridLines: selectShowGridLines,
  graphDetails: selectGraphDetails,
  graphYMax: selectVerticalAxesCeiling,
  isLoading: selectGraphLoading,
});
