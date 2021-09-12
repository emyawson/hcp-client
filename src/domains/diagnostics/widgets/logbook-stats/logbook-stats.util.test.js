import { sum } from 'ramda';

import {
  average,
  standardDeviation,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  getCarbohydrates,
  getDay,
  getDayCellLabel,
  getBloodGlucoseCellLabel,
  getMeanBloodGlucose,
  getNumberOfHypos,
  getStandardDeviation,
} from './logbook-stats.util';
import {
  BLOOD_GLUCOSE_CELL_LABELS,
  DAY_CELL_LABELS,
} from './logbook-stats.constants';

describe('getDayCellLabel util test suite', () => {
  it('should return N/A label for weekday', () => {
    const date = convertISOToJsGMT('February 22, 2018 GMT+0000');
    expect(getDayCellLabel(date)).toBe(DAY_CELL_LABELS.N_A);
  });
  it('should return weekend label for weekend day', () => {
    const date = convertISOToJsGMT('February 24, 2018 00:00:00 GMT-0000');
    expect(getDayCellLabel(date)).toBe(DAY_CELL_LABELS.WEEKEND);
  });
});

describe('getBloodGlucoseCellLabel test suite', () => {
  it('should return hypo label if value is below hypoglycemia threshold', () => {
    const value = 52;
    const hypoglycemiaThreshold = 70;
    expect(getBloodGlucoseCellLabel(value, hypoglycemiaThreshold)).toBe(
      BLOOD_GLUCOSE_CELL_LABELS.HYPO,
    );
  });
  it('should return below target range label if value is above hypoglycemia threshold and below target range', () => {
    const value = 85;
    const hypoglycemiaThreshold = 70;
    const glucoseIdealIntervalMin = 100;
    expect(
      getBloodGlucoseCellLabel(
        value,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
      ),
    ).toBe(BLOOD_GLUCOSE_CELL_LABELS.BELOW_TARGET_RANGE);
  });
  it('should return in range label if value is within target range', () => {
    const value = 115;
    const hypoglycemiaThreshold = 70;
    const glucoseIdealIntervalMin = 100;
    const glucoseIdealIntervalMax = 130;
    expect(
      getBloodGlucoseCellLabel(
        value,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
        glucoseIdealIntervalMax,
      ),
    ).toBe(BLOOD_GLUCOSE_CELL_LABELS.IN_RANGE);
  });
  it('should return hyper label if value is above target range', () => {
    const value = 135;
    const hypoglycemiaThreshold = 70;
    const glucoseIdealIntervalMin = 130;
    const glucoseIdealIntervalMax = 100;
    expect(
      getBloodGlucoseCellLabel(
        value,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
        glucoseIdealIntervalMax,
      ),
    ).toBe(BLOOD_GLUCOSE_CELL_LABELS.HYPER);
  });
});

describe('getNumberOfHypos test suite', () => {
  it('should return number of measurements below hypoglycemia threshold', () => {
    const measurementValues = [55, 74, 30];
    const hypoglycemiaThreshold = 60;
    expect(getNumberOfHypos(measurementValues, hypoglycemiaThreshold)).toBe(2);
  });
});

describe('getDay test suite', () => {
  it('should return object with N/A label and formatted date string array for weekday', () => {
    const date = convertISOToJsGMT('February 22, 2018 GMT+0000');
    expect(getDay(date)).toEqual({
      value: ['Thursday,', 'Feb 22, 2018'],
      label: DAY_CELL_LABELS.N_A,
    });
  });
  it('should return object with weekend label and formatted date string array for weekend day', () => {
    const date = convertISOToJsGMT('March 3, 2018 00:00:00 GMT+0000');
    expect(getDay(date)).toEqual({
      value: ['Saturday,', 'Mar 3, 2018'],
      label: DAY_CELL_LABELS.WEEKEND,
    });
  });
});

describe('getMeanBloodGlucose test suite', () => {
  const measurementValues = [35, 66, 89, 110, 135, 121, 163];
  const mean = Math.round(average(measurementValues)); // average = 102.7

  it('should return object with the average value of measurements and hypo label if the average is below hypoglycemia threshold', () => {
    const hypoglycemiaThreshold = 104;
    expect(
      getMeanBloodGlucose(measurementValues, hypoglycemiaThreshold),
    ).toEqual({
      value: mean,
      label: BLOOD_GLUCOSE_CELL_LABELS.HYPO,
    });
  });
  it('should return object with the average value of measurements and below target range label if the average is below target range but above hypo threshold', () => {
    const hypoglycemiaThreshold = 95;
    const glucoseIdealIntervalMin = 105;
    expect(
      getMeanBloodGlucose(
        measurementValues,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
      ),
    ).toEqual({
      value: mean,
      label: BLOOD_GLUCOSE_CELL_LABELS.BELOW_TARGET_RANGE,
    });
  });
  it('should return object with the average value of measurements and in range label if the average within target range', () => {
    const hypoglycemiaThreshold = 85;
    const glucoseIdealIntervalMin = 95;
    const glucoseIdealIntervalMax = 120;
    expect(
      getMeanBloodGlucose(
        measurementValues,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
        glucoseIdealIntervalMax,
      ),
    ).toEqual({
      value: mean,
      label: BLOOD_GLUCOSE_CELL_LABELS.IN_RANGE,
    });
  });
  it('should return object with the average value of measurements and hyper label if the average above target range', () => {
    const hypoglycemiaThreshold = 85;
    const glucoseIdealIntervalMin = 95;
    const glucoseIdealIntervalMax = 100;
    expect(
      getMeanBloodGlucose(
        measurementValues,
        hypoglycemiaThreshold,
        glucoseIdealIntervalMin,
        glucoseIdealIntervalMax,
      ),
    ).toEqual({
      value: mean,
      label: BLOOD_GLUCOSE_CELL_LABELS.HYPER,
    });
  });
});

describe('getStandardDeviation test suite', () => {
  it("should return '' for an empty array of measurements", () => {
    expect(getStandardDeviation([])).toBe('');
  });
  it("should return '-' for an array of 1 measurement", () => {
    expect(getStandardDeviation([35])).toBe(EMPTY_VALUE_PLACEHOLDER);
  });
  it('should correctly the standard deviation as an integer', () => {
    const values = [1, 35, 67, 105, 89];
    const expected = Math.round(standardDeviation(values));

    expect(getStandardDeviation(values)).toBe(expected);
  });
});

describe('getCarbohydrates test suite ', () => {
  it('Should correctly calculate carbohydrates from supplied measurements', () => {
    const mockCarbohydratesValues = [35, 50, 67, 38, 59];
    expect(getCarbohydrates([])).toBe('');
    expect(getCarbohydrates(mockCarbohydratesValues)).toEqual(
      sum(mockCarbohydratesValues),
    );
  });
});
