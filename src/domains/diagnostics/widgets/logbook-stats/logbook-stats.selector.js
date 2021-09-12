import { createSelector, createStructuredSelector } from 'reselect';
import { isNil, reject, values } from 'ramda';

import { fixToDecimalPlace } from 'src/domains/diagnostics/utils';
import {
  selectGraphLoading,
  selectBolusesInDateSliderRange,
  selectBolusTotalInDateSliderRange,
  selectBolusPlusBasalTotalInDateSliderRange,
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectGraphThreshold,
} from 'src/domains/diagnostics/store/selectors';

import {
  getCarbohydrates,
  getDay,
  getMeanBloodGlucose,
  getNumberOfHypos,
  getStandardDeviation,
  convertToCellValue,
  groupMeasurementsByDay,
  groupInsulinByDay,
} from './logbook-stats.util';

const mergeMeasurementsGroupedByDay = (glucoseByDay, insulinByDay) => {
  const allKeys = [...Object.keys(glucoseByDay), ...Object.keys(insulinByDay)];

  const measurementsAndInsulinByDay = {};

  allKeys.forEach(key => {
    measurementsAndInsulinByDay[key] = {
      date: glucoseByDay[key] ? glucoseByDay[key].date : insulinByDay[key].date,
    };

    if (glucoseByDay[key]) {
      measurementsAndInsulinByDay[key].glucoseMeasurements =
        glucoseByDay[key].glucoseMeasurements;
    }

    if (insulinByDay[key]) {
      measurementsAndInsulinByDay[key].totalBolusPlusBasal =
        insulinByDay[key].totalBolusPlusBasal;
      measurementsAndInsulinByDay[key].totalBolus =
        insulinByDay[key].totalBolus;
      measurementsAndInsulinByDay[key].numberOfBolus =
        insulinByDay[key].numberOfBolus;
    }
  });

  return measurementsAndInsulinByDay;
};

export const selectLogbookStatsData = createSelector(
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectGraphThreshold,
  selectBolusesInDateSliderRange,
  selectBolusTotalInDateSliderRange,
  selectBolusPlusBasalTotalInDateSliderRange,
  (
    measurements,
    { hypoglycemiaThreshold, glucoseIdealIntervalMin, glucoseIdealIntervalMax },
    boluses,
    bolusTotals,
    bolusAndBasalTotals,
  ) => {
    const glucoseByDay = groupMeasurementsByDay(measurements);
    const insulinByDay = groupInsulinByDay(
      boluses,
      bolusTotals,
      bolusAndBasalTotals,
    );

    const allMeasurementsByDay = values(
      mergeMeasurementsGroupedByDay(glucoseByDay, insulinByDay),
    ).sort((a, b) => a.date - b.date);

    return allMeasurementsByDay.map(
      ({
        date,
        glucoseMeasurements = [],
        totalBolusPlusBasal = 0,
        totalBolus = 0,
        numberOfBolus = 0,
      }) => {
        const measurementValues = reject(
          isNil,
          glucoseMeasurements.map(({ value }) => value),
        );
        const carbohydrateValues = reject(
          isNil,
          glucoseMeasurements.map(({ carbohydrates }) => carbohydrates),
        );
        const day = getDay(date);

        const numberOfTests = convertToCellValue(measurementValues.length);

        const meanBloodGlucose =
          measurementValues.length > 0
            ? getMeanBloodGlucose(
                measurementValues,
                hypoglycemiaThreshold,
                glucoseIdealIntervalMin,
                glucoseIdealIntervalMax,
              )
            : { label: null };

        const standardDeviation = getStandardDeviation(measurementValues);

        const hypos = getNumberOfHypos(
          measurementValues,
          hypoglycemiaThreshold,
        );

        const carbohydrates = getCarbohydrates(carbohydrateValues);
        const bolusFixed = fixToDecimalPlace(totalBolus, 2);
        const insulinFixed = fixToDecimalPlace(totalBolusPlusBasal, 2);
        const basalFixed = fixToDecimalPlace(insulinFixed - bolusFixed, 2);

        const basalPercentage = Math.round((basalFixed / insulinFixed) * 100);
        const bolusPercentage = Math.round(
          (totalBolus / totalBolusPlusBasal) * 100,
        );

        const basalBolusPercentage =
          basalPercentage + bolusPercentage > 0
            ? `${basalPercentage} / ${bolusPercentage}`
            : '';

        return {
          day: day.value.join(' '),
          columns: [
            day,
            numberOfTests,
            meanBloodGlucose,
            standardDeviation,
            hypos,
            carbohydrates,
            convertToCellValue(insulinFixed),
            convertToCellValue(basalFixed),
            convertToCellValue(bolusFixed),
            convertToCellValue(numberOfBolus),
            basalBolusPercentage,
          ],
        };
      },
    );
  },
);

export const logbookStatsConnector = createStructuredSelector({
  logbookStatsData: selectLogbookStatsData,
  isLoading: selectGraphLoading,
});
