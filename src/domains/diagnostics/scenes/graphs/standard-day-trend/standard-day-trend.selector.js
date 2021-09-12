import { createSelector, createStructuredSelector } from 'reselect';

import { translate } from 'src/i18n'; // TODO: move to diagnostics
import {
  isDatetimeWithinInterval,
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
  AppleIcon,
  AppleEatenIcon,
  NightIcon,
  OvernightIcon,
} from 'src/domains/diagnostics/assets/icons';
import {
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import {
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
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

const buildGlucoseDataSet = (measurements, intervals) =>
  intervals.map(interval =>
    getMeasurementDetails(
      measurements.filter(measurement =>
        isDatetimeWithinInterval(
          measurement.date,
          interval.startTime,
          interval.endTime,
        ),
      ),
    ),
  );

const normalizeGlucoseData = (data, floor, ceiling) =>
  data.map((datum, index) => {
    const { max, min, stdDev, mean } = datum;
    const bucketWidth = 1 / data.length;
    const x = index / data.length;
    const y = mean / ceiling;
    const mealIconTick = selectIconHorizontalTicks().find(
      iconTick => iconTick.value - bucketWidth / 2 === x,
    );
    return {
      max: max / ceiling,
      min: min / ceiling,
      deviation: stdDev === EMPTY_VALUE_PLACEHOLDER ? 0 : stdDev / ceiling,
      x,
      y,
      data: {
        ...datum,
        icon: mealIconTick ? mealIconTick.component : null, // Adding icon to data object represent icon for each specific bucket (used for tooltip)
      },
    };
  });

const normalizeGraphData = (measurements, intervals, graphYMax = GRAPH_Y_MAX) =>
  normalizeGlucoseData(
    buildGlucoseDataSet(measurements, intervals),
    GRAPH_Y_MIN,
    graphYMax,
  );

export const selectGraphData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectTimeIntervals,
  selectVerticalAxesCeiling,
  normalizeGraphData,
);

const normalizeTimeHorizontalTicks = (timeIntervals, index) =>
  timeIntervals.map((interval, index) => ({
    value: index / timeIntervals.length,
    label: interval.startTime.substr(0, interval.startTime.lastIndexOf(':')),
  }));

export const selectTimeHorizontalTicks = createSelector(
  selectTimeIntervals,
  normalizeTimeHorizontalTicks,
);

export const selectMealHorizontalTicks = () => [
  { value: 1 / 8, label: translate('general.mealBlocks.breakfast') },
  { value: 3 / 8, label: translate('general.mealBlocks.lunch') },
  { value: 5 / 8, label: translate('general.mealBlocks.dinner') },
  { value: 13 / 16, label: translate('general.mealBlocks.bedTime') },
  { value: 15 / 16, label: translate('general.mealBlocks.night') },
];

export const selectTimeHorizontalTickLines = () => [
  { value: 0, type: 'long' },
  { value: 1 / 8, type: 'short' },
  { value: 2 / 8, type: 'long' },
  { value: 3 / 8, type: 'short' },
  { value: 4 / 8, type: 'long' },
  { value: 5 / 8, type: 'short' },
  { value: 6 / 8, type: 'long' },
  { value: 7 / 8, type: 'short' },
  { value: 1, type: 'long' },
];

export const selectIconHorizontalTicks = () => [
  { value: 1 / 16, component: AppleIcon, iconWidthScale: 0.04 },
  { value: 3 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
  { value: 5 / 16, component: AppleIcon, iconWidthScale: 0.04 },
  { value: 7 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
  { value: 9 / 16, component: AppleIcon, iconWidthScale: 0.04 },
  { value: 11 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
  { value: 13 / 16, component: NightIcon, iconWidthScale: 0.035 },
  { value: 15 / 16, component: OvernightIcon, iconWidthScale: 0.033 },
];

export const standardDayTrendConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  graphData: selectGraphData,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  verticalTicks: selectVerticalTicks,
  timeHorizontalTicks: selectTimeHorizontalTicks,
  timeHorizontalTickLines: selectTimeHorizontalTickLines,
  mealHorizontalTicks: selectMealHorizontalTicks,
  iconHorizontalTicks: selectIconHorizontalTicks,
  graphDetails: selectGraphDetails,
  showGridLines: selectShowGridLines,
  graphYMax: selectVerticalAxesCeiling,
  isLoading: selectGraphLoading,
});
