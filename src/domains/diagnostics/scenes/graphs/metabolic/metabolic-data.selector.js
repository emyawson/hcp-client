import { mean as getMean, std as getStd } from 'mathjs';
import { isNil, reject } from 'ramda';
import { createSelector } from 'reselect';

import {
  toFormat,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import { selectGlucoseMeasurementsByDay } from 'src/domains/diagnostics/store/selectors';

import {
  METABOLIC_GRAPH_Y_MAX,
  METABOLIC_GRAPH_X_MAX,
  STD_DEV_POPULATION,
} from './metabolic.constant';

export const selectMetabolicGraphData = createSelector(
  selectGlucoseMeasurementsByDay,
  glucoseMeasurementsGroupedByDay =>
    // remove days with no non-null BG measurements (otherwise getMean fails with an empty array)
    reject(
      dailyMeasurements =>
        !reject(isNil, dailyMeasurements.map(({ value }) => value)).length,
      glucoseMeasurementsGroupedByDay,
    ).map((dailyMeasurements, index) => {
      // remove null BG measurements
      const dailyValues = reject(
        isNil,
        dailyMeasurements.map(({ value }) => value),
      );

      const mean = getMean(dailyValues);
      const std = getStd(dailyValues);
      const stdRounded = getFormattedStandardDeviation(dailyValues, Math.round);

      return {
        meanRounded: Math.round(mean),
        stdRounded,
        mean,
        std,
        date: dailyMeasurements[0].date,
        dateLabel: toFormat('MMM dd/yy')(dailyMeasurements[0].date),
        index,
        x: std / METABOLIC_GRAPH_X_MAX,
        y: mean / METABOLIC_GRAPH_Y_MAX,
      };
    }),
);
export const selectFilteredMetabolicGraphData = createSelector(
  selectGlucoseMeasurementsByDay,
  glucoseMeasurementsGroupedByDay =>
    // remove days with no non-null BG measurements (otherwise getMean fails with an empty array)
    reject(
      dailyMeasurements =>
        !reject(isNil, dailyMeasurements.map(({ value }) => value)).length,
      glucoseMeasurementsGroupedByDay,
    )
      .filter(dailyMeasurements => dailyMeasurements.length > 1)
      .map((dailyMeasurements, index) => {
        // remove null BG measurements
        const dailyValues = reject(
          isNil,
          dailyMeasurements.map(({ value }) => value),
        );

        const mean = getMean(dailyValues);
        const std = getStd(dailyValues);
        const stdRounded = getFormattedStandardDeviation(
          dailyValues,
          Math.round,
        );

        return {
          meanRounded: Math.round(mean),
          stdRounded,
          mean,
          std,
          date: dailyMeasurements[0].date,
          dateLabel: toFormat('MMM dd/yy')(dailyMeasurements[0].date),
          index,
          x: std / METABOLIC_GRAPH_X_MAX,
          y: mean / METABOLIC_GRAPH_Y_MAX,
        };
      }),
);
export const selectMeanBGSD = createSelector(
  selectFilteredMetabolicGraphData,
  dailyMeanBGSD => {
    const length = dailyMeanBGSD.length;
    const totalMean = dailyMeanBGSD.reduce(
      (acc, singleDayMeanBGSD) => singleDayMeanBGSD.mean + acc,
      0,
    );
    const totalStd = dailyMeanBGSD.reduce(
      (acc, singleDayMeanBGSD) => singleDayMeanBGSD.std + acc,
      0,
    );
    const mean = totalMean / length;
    const stdDev = totalStd / length;
    return {
      meanRounded: Math.round(mean),
      stdRounded: Math.round(stdDev),
      mean,
      stdDev,
      x: stdDev / METABOLIC_GRAPH_X_MAX,
      y: mean / METABOLIC_GRAPH_Y_MAX,
      selectedDayCount: length,
    };
  },
);
export const selectSD1 = createSelector(
  selectFilteredMetabolicGraphData,
  dailyMetabolicData => {
    const dailyMeanValues = dailyMetabolicData.map(
      dailyMeasurements => dailyMeasurements.mean,
    );
    const dailyStdValues = dailyMetabolicData.map(
      dailyMeasurements => dailyMeasurements.std,
    );
    return {
      rx: dailyStdValues.length
        ? getStd(dailyStdValues, STD_DEV_POPULATION) / METABOLIC_GRAPH_X_MAX
        : 0,
      ry: dailyMeanValues.length
        ? getStd(dailyMeanValues, STD_DEV_POPULATION) / METABOLIC_GRAPH_Y_MAX
        : 0,
    };
  },
);
