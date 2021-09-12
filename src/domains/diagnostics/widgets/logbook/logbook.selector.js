import { createSelector, createStructuredSelector } from 'reselect';

import { timeStringToFloat, toFormat } from 'src/domains/diagnostics/utils';
import {
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectTimeIntervals,
  selectGraphThreshold,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';

import {
  createMealTimeMatrix,
  getLogbookMealTimeNames,
  getMaxMealTimeRows,
  mealTimeIsBeforeMeal,
  relatedMealTimesMap,
} from './logbook.util';

import {
  LOGBOOK_DATE_FORMAT,
  MEAL_TIMES,
} from '../../constants/logbook.constants';

const toLogbookDateFormat = toFormat(LOGBOOK_DATE_FORMAT);

export const groupMeasurementsByDay = (measurements, thresholds) =>
  measurements.reduce((measurementsGroupedByDay, measurement) => {
    const {
      carbohydrates,
      date,
      value: glucose,
      afterMeal,
      beforeMeal,
      hypoSymptoms,
    } = measurement;
    const { glucoseIdealIntervalMin, glucoseIdealIntervalMax } = thresholds;
    const day = toLogbookDateFormat(date);
    const logbookMeasurement = {
      aboveTargetRange: glucose > glucoseIdealIntervalMax,
      belowTargetRange: glucose < glucoseIdealIntervalMin,
      hypoSymptoms: hypoSymptoms,
      afterMeal,
      beforeMeal,
      date,
      glucose,
      bolus: null,
      carbohydrates,
    };
    if (!measurementsGroupedByDay[day]) {
      return {
        ...measurementsGroupedByDay,
        [day]: [logbookMeasurement],
      };
    }
    return {
      ...measurementsGroupedByDay,
      [day]: [...measurementsGroupedByDay[day], logbookMeasurement],
    };
  }, {});
const isBetween = (min, max, value) => min <= value && value <= max;
export const groupDayMeasurementsByMealTime = (
  measurementsGroupedByDay,
  timeIntervals,
) =>
  measurementsGroupedByDay.reduce(
    (measurementsGroupedByMealtime, measurement, index) => {
      let accumulator = {};
      if (index > 0) {
        accumulator = measurementsGroupedByMealtime;
      } else {
        timeIntervals.forEach(({ description: mealTime }) => {
          accumulator[mealTime] = [];
        });
      }
      const { date } = measurement;
      const mealtime = timeIntervals.find(timeInterval => {
        const { startTime, endTime } = timeInterval;
        const startTimeDate = timeStringToFloat(startTime, 19);
        let endTimeAsFloat = timeStringToFloat(endTime, 19);
        const dateAsFloat = timeStringToFloat(toFormat('HH:mm:ss')(date), 19);
        // add 24 hours to endTime in case mealtime is e.g. 21:30 - 02:30
        if (startTimeDate > endTimeAsFloat) {
          endTimeAsFloat += 1;
        }
        // in case the time falls on a meal time boundary, only return true for the meal time where dateFloat === startTimeAsFloat
        if (dateAsFloat === endTimeAsFloat) {
          return false;
        }
        return isBetween(startTimeDate, endTimeAsFloat, dateAsFloat);
      });
      if (!mealtime) {
        return accumulator;
      }
      const { description: mealtimeName } = mealtime;
      return {
        ...accumulator,
        [mealtimeName]: [...accumulator[mealtimeName], measurement],
      };
    },
    {},
  );
export const adjustDayMeasurementsByFlags = dayMeasurementsGroupedByMealtime => {
  const { day, mealTimes } = dayMeasurementsGroupedByMealtime;
  return Object.keys(mealTimes).reduce(
    (adjustedMeasurementsObject, mealTime, index) => {
      let adjustedMeasurementsObjectCopy = adjustedMeasurementsObject;
      for (
        let measurementIndex = 0;
        measurementIndex <
        adjustedMeasurementsObjectCopy.mealTimes[mealTime].length;
        measurementIndex += 1
      ) {
        const {
          afterMeal,
          beforeMeal,
        } = adjustedMeasurementsObjectCopy.mealTimes[mealTime][
          measurementIndex
        ];
        if (
          (afterMeal && mealTimeIsBeforeMeal(mealTime)) ||
          (beforeMeal && !mealTimeIsBeforeMeal(mealTime))
        ) {
          const relatedMealTime = relatedMealTimesMap[mealTime];
          adjustedMeasurementsObjectCopy = {
            day,
            mealTimes: {
              ...adjustedMeasurementsObjectCopy.mealTimes,
              // remove measurement from current mealTime
              [mealTime]: [
                ...adjustedMeasurementsObjectCopy.mealTimes[mealTime].slice(
                  0,
                  measurementIndex,
                ),
                ...adjustedMeasurementsObjectCopy.mealTimes[mealTime].slice(
                  measurementIndex + 1,
                ),
              ],
              // add measurement to related (before or after) mealTime
              [relatedMealTime]: [
                ...adjustedMeasurementsObjectCopy.mealTimes[relatedMealTime],
                ...adjustedMeasurementsObjectCopy.mealTimes[mealTime].slice(
                  measurementIndex,
                  measurementIndex + 1,
                ),
              ],
            },
          };
        }
      }
      return adjustedMeasurementsObjectCopy;
    },
    dayMeasurementsGroupedByMealtime,
  );
};
export const groupMeasurementsAsMealTimeCellMatrices = adjustedMeasurementsBasedOnMealTimeFlags =>
  adjustedMeasurementsBasedOnMealTimeFlags.map(dayMeasurements => {
    const { day, mealTimes } = dayMeasurements;
    const numberOfRows = getMaxMealTimeRows(mealTimes);
    const logbookMealTimeNames = getLogbookMealTimeNames(
      Object.keys(mealTimes),
    );
    const groupedMealTimes = logbookMealTimeNames.reduce(
      (groupedMealTimesObject, mealTime) => {
        const mealTimeData = mealTimes[mealTime];
        if (!mealTimeData) {
          return groupedMealTimesObject;
        }
        let hasBeforeAndAfterIntervals = true;
        let mealTimeMatrix;
        let numberOfRowsWithContent;
        if (mealTime === MEAL_TIMES.NIGHT || mealTime === MEAL_TIMES.BEDTIME) {
          hasBeforeAndAfterIntervals = false;
          mealTimeMatrix = mealTimeData;
          numberOfRowsWithContent = mealTimeData.length;
        } else {
          const relatedMealTimeData = mealTimes[relatedMealTimesMap[mealTime]];
          mealTimeMatrix = createMealTimeMatrix(
            mealTimeData,
            relatedMealTimeData,
          );
          numberOfRowsWithContent =
            mealTimeData.length + relatedMealTimeData.length;
        }
        return {
          ...groupedMealTimesObject,
          [mealTime]: {
            hasBeforeAndAfterIntervals,
            measurements: mealTimeMatrix,
            numberOfRowsWithContent,
          },
        };
      },
      {},
    );
    return {
      day,
      mealTimes: groupedMealTimes,
      numberOfRows,
    };
  });

export const selectLogbookData = createSelector(
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectTimeIntervals,
  selectGraphThreshold,
  (measurements, timeIntervals, thresholds) => {
    const measurementsGroupedByDay = groupMeasurementsByDay(
      measurements,
      thresholds,
    );
    const allDayMeasurementsGroupedByMealtime = Object.keys(
      measurementsGroupedByDay,
    ).map(day => {
      const mealTimes = groupDayMeasurementsByMealTime(
        measurementsGroupedByDay[day],
        timeIntervals,
      );
      return {
        day,
        mealTimes,
      };
    }, []);
    const adjustedMeasurementsBasedOnMealTimeFlags = allDayMeasurementsGroupedByMealtime.map(
      dayMeasurementsGroupedByMealtime =>
        adjustDayMeasurementsByFlags(dayMeasurementsGroupedByMealtime),
    );
    return groupMeasurementsAsMealTimeCellMatrices(
      adjustedMeasurementsBasedOnMealTimeFlags,
    );
  },
);
export const logbookConnector = createStructuredSelector({
  logbookData: selectLogbookData,
  isLoading: selectGraphLoading,
});
