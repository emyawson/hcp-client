import { createStructuredSelector, createSelector } from 'reselect';
import { isEmpty } from 'ramda';

import {
  selectTimeIntervals,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
} from 'src/domains/diagnostics/store/selectors';
import { isDatetimeWithinInterval } from 'src/domains/diagnostics/utils';
import { MEAL_TIMES } from 'src/domains/diagnostics/constants/logbook.constants';
import { selectIsLoading } from 'src/domains/diagnostics/store/selectors/diagnostics.selector';

const selectHypoglycaemiaTreshold = createSelector(
  selectGraphThreshold,
  ({ hypoglycemiaThreshold }) => hypoglycemiaThreshold,
);

const findHypoglycaemiaCount = (hypoglycaemiaTreshold, measurements) =>
  measurements
    .map(measurements => measurements.value)
    .reduce(
      (hypoglycaemiaCount, measurementValue) =>
        measurementValue < hypoglycaemiaTreshold
          ? ++hypoglycaemiaCount
          : hypoglycaemiaCount,
      0,
    );

const selectHypoglycaemiaCount = createSelector(
  selectHypoglycaemiaTreshold,
  selectGlucoseMeasurementsInDateSliderRange,
  findHypoglycaemiaCount,
);

const findNightTimeInterval = timeIntervals =>
  timeIntervals.find(
    timeInterval => timeInterval.description === MEAL_TIMES.NIGHT,
  );

const selectNightTimeIntervals = createSelector(
  selectTimeIntervals,
  findNightTimeInterval,
);

const findNightGlucoseMeasurements = (measurements, nightTimeInterval) =>
  nightTimeInterval
    ? measurements.filter(({ date }) =>
        isDatetimeWithinInterval(
          date,
          nightTimeInterval.startTime,
          nightTimeInterval.endTime,
        ),
      )
    : [];

const selectNightGlucoseMeasurements = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectNightTimeIntervals,
  findNightGlucoseMeasurements,
);

const selectNightHypoglycaemiaCount = createSelector(
  selectHypoglycaemiaTreshold,
  selectNightGlucoseMeasurements,
  findHypoglycaemiaCount,
);

const selectHasData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectIsLoading,
  (measurements, isLoading) => isLoading || !isEmpty(measurements),
);

export const HypoglycaemiaCardConnector = createStructuredSelector({
  hypoglycaemiaTreshold: selectHypoglycaemiaTreshold,
  hypoglycaemiaCount: selectHypoglycaemiaCount,
  hypoglycaemiaNightCount: selectNightHypoglycaemiaCount,
  isLoading: selectIsLoading,
  hasData: selectHasData,
});
