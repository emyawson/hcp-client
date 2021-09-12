import { createSelector, createStructuredSelector } from 'reselect';

import {
  toDayOfWeekNumFormat,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import {
  selectTargetRange,
  selectThreshold,
  selectGraphDetails,
  selectShowGridLines,
  selectVerticalTicks,
  selectVerticalAxesCeiling,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import {
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
  DAYS_OF_WEEK,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import {
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';

const getMeasurementDetails = measurements => {
  const glucoseValues = measurements.map(measurement => measurement.value);

  const max = Math.max(...glucoseValues);
  const min = Math.min(...glucoseValues);

  const sum = glucoseValues.reduce(
    (accumulator, value) => accumulator + value,
    0,
  );

  const mean = sum / glucoseValues.length;

  return {
    max,
    min,
    mean,
    count: glucoseValues.length,
    stdDev: getFormattedStandardDeviation(glucoseValues),
  };
};

const buildGlucoseDataSet = measurements =>
  DAYS_OF_WEEK.map((day, index) =>
    getMeasurementDetails(
      measurements.filter(measurement => {
        const dayOfWeek = toDayOfWeekNumFormat(measurement.date);
        return (
          dayOfWeek === `${index + 1}` || (dayOfWeek === '0' && index === 6)
        );
      }), // toDayOfWeekNumFormat returns days of the week as strings 0 -> 6 starting with Sunday
    ),
  );

const normalizeGlucoseData = (data, floor, ceiling) =>
  data.map((datum, index) => {
    const { max, min, stdDev, mean } = datum;
    return {
      max: max / ceiling,
      min: min / ceiling,
      deviation: stdDev === EMPTY_VALUE_PLACEHOLDER ? 0 : stdDev / ceiling,
      x: index / data.length,
      y: mean / ceiling,
      data: datum,
    };
  });

const normalizeGraphData = (measurements, graphYMax = GRAPH_Y_MAX) =>
  normalizeGlucoseData(
    buildGlucoseDataSet(measurements),
    GRAPH_Y_MIN,
    graphYMax,
  );

export const selectGraphData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectVerticalAxesCeiling,
  normalizeGraphData,
);

const normalizeHorizontalTicks = (graphData, index) =>
  graphData.map((datum, index) => ({
    value: datum.x,
    label: translate(`general.days.${DAYS_OF_WEEK[index]}`),
  }));

export const selectHorizontalTicks = createSelector(
  selectGraphData,
  normalizeHorizontalTicks,
);

export const standardWeekTrendConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  graphData: selectGraphData,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  verticalTicks: selectVerticalTicks,
  horizontalTicks: selectHorizontalTicks,
  graphYMax: selectVerticalAxesCeiling,
  graphDetails: selectGraphDetails,
  showGridLines: selectShowGridLines,
  isLoading: selectGraphLoading,
});
