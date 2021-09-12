import { isNil, sum } from 'ramda';

import {
  average,
  fixToDecimalPlace,
  toFormat,
  getFormattedStandardDeviation,
} from 'src/domains/diagnostics/utils';
import { translateDate } from 'src/utils';

import {
  BLOOD_GLUCOSE_CELL_LABELS,
  DAY_CELL_LABELS,
} from './logbook-stats.constants';

import { formatDateAsRowHeaderList } from '../../components/table/logbook-table/logbook-table.util';

const LOGBOOK_DATE_FORMAT = 'EEEE, MMM d, yyyy';

const formatDate = toFormat(LOGBOOK_DATE_FORMAT);

const isWeekendDay = day => {
  const dayNum = day.weekday;
  return dayNum === 6 || dayNum === 7;
};

export const getDayCellLabel = day =>
  isWeekendDay(day) ? DAY_CELL_LABELS.WEEKEND : DAY_CELL_LABELS.N_A;

export const getBloodGlucoseCellLabel = (
  value,
  hypoglycemiaThreshold,
  glucoseIdealIntervalMin,
  glucoseIdealIntervalMax,
) => {
  if (value < hypoglycemiaThreshold) {
    return BLOOD_GLUCOSE_CELL_LABELS.HYPO;
  } else if (value < glucoseIdealIntervalMin) {
    return BLOOD_GLUCOSE_CELL_LABELS.BELOW_TARGET_RANGE;
  } else if (
    value >= glucoseIdealIntervalMin &&
    value <= glucoseIdealIntervalMax
  ) {
    return BLOOD_GLUCOSE_CELL_LABELS.IN_RANGE;
  } else if (value > glucoseIdealIntervalMax) {
    return BLOOD_GLUCOSE_CELL_LABELS.HYPER;
  }
};

export const getNumberOfHypos = (measurementValues, hypoglycemiaThreshold) => {
  const hypoCount = measurementValues.reduce((hypoCount, value) => {
    if (value > hypoglycemiaThreshold) {
      return hypoCount;
    }

    return hypoCount + 1;
  }, 0);

  return hypoCount !== 0 ? hypoCount : '';
};

export const getCarbohydrates = carbohydrates =>
  carbohydrates.length > 0 ? sum(carbohydrates) : '';

export const getDay = date => ({
  label: getDayCellLabel(date),
  value: formatDateAsRowHeaderList(translateDate(formatDate(date))),
});

export const getMeanBloodGlucose = (
  measurementValues,
  hypoglycemiaThreshold,
  glucoseIdealIntervalMin,
  glucoseIdealIntervalMax,
) => {
  const meanBloodGlucoseValue = fixToDecimalPlace(
    Math.round(average(measurementValues)),
    1,
  );
  return {
    label: getBloodGlucoseCellLabel(
      meanBloodGlucoseValue,
      hypoglycemiaThreshold,
      glucoseIdealIntervalMin,
      glucoseIdealIntervalMax,
    ),
    value: meanBloodGlucoseValue,
  };
};

export const getStandardDeviation = values => {
  if (values.length === 0) {
    return '';
  }

  return getFormattedStandardDeviation(values, Math.round);
};

export const convertToCellValue = value => (value > 0 ? value : '');

export const groupMeasurementsByDay = measurements => {
  const measurementsByDay = {};

  measurements.forEach(measurement => {
    let date = formatDate(measurement.date);

    if (isNil(measurementsByDay[date])) {
      measurementsByDay[date] = {
        date: measurement.date,
        glucoseMeasurements: [],
      };
    }

    measurementsByDay[date].glucoseMeasurements = [
      ...measurementsByDay[date].glucoseMeasurements,
      measurement,
    ];
  });

  return measurementsByDay;
};

export const groupInsulinByDay = (bolus, totalBolus, totalBolusPlusBasal) => {
  const insulinDataByDay = {};

  totalBolusPlusBasal.forEach(bolusPlusBasal => {
    const date = formatDate(bolusPlusBasal.date);

    if (isNil(insulinDataByDay[date])) {
      insulinDataByDay[date] = {
        date: bolusPlusBasal.date,
        totalBolusPlusBasal: 0,
        totalBolus: 0,
        numberOfBolus: 0,
      };
    }

    insulinDataByDay[date].totalBolusPlusBasal = bolusPlusBasal.bolusValue;
  });

  totalBolus.forEach(totalBolus => {
    const date = formatDate(totalBolus.date);

    insulinDataByDay[date].totalBolus = totalBolus.bolusValue;
  });

  bolus.forEach(bolus => {
    const date = formatDate(bolus.date);

    insulinDataByDay[date].numberOfBolus++;
  });

  return insulinDataByDay;
};
