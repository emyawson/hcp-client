import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';

import {
  createMealTimeMatrix,
  getLogbookMealTimeNames,
  getNumberOfRows,
  getMaxMealTimeRows,
  getCombinedMealTimeName,
  getCombinedMealTimeDate,
  toMealTimeModalDate,
  flattenCombinedMeasurements,
  toMeasurementIndicatorColor,
  toMealTimeModalMeasurements,
  getMealTimeModalMeasurements,
} from './logbook.util';

import { LOGBOOK_STATUS_COLOR } from '../../constants/logbook.constants';

const mockLogbookData = [
  {
    day: 'Fri, 17 Oct 2017',
    mealTimes: {
      NIGHT: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 39,
          bolus: null,
          carbohydrates: null,
        },
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: null,
          carbohydrates: null,
        },
      ],
      BEFORE_BREAKFAST: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      AFTER_BREAKFAST: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      BEFORE_LUNCH: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      AFTER_LUNCH: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      BEFORE_DINNER: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      AFTER_DINNER: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
      BEDTIME: [
        {
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          bloodGlucose: 40,
          bolus: 35,
          carbohydrates: 15,
        },
      ],
    },
  },
];

describe('Logbook util test suite', () => {
  test('getNumberOfRows works', () => {
    const numberOfRows = getNumberOfRows(mockLogbookData[0].mealTimes);
    expect(numberOfRows).toBe(3);
  });

  test('getMaxMealTimeRows works', () => {
    const numberOfRows = getMaxMealTimeRows(mockLogbookData[0].mealTimes);
    expect(numberOfRows).toBe(4);
  });

  test('getLogbookMealTimeNames works', () => {
    expect(
      getLogbookMealTimeNames([
        'NIGHT',
        'BEFORE_BREAKFAST',
        'AFTER_BREAKFAST',
        'BEFORE_LUNCH',
        'AFTER_LUNCH',
        'BEFORE_DINNER',
        'AFTER_DINNER',
        'BEDTIME',
      ]),
    ).toEqual([
      'NIGHT',
      'BEFORE_BREAKFAST',
      'BEFORE_LUNCH',
      'BEFORE_DINNER',
      'BEDTIME',
    ]);
  });

  test('createMealTimeMatrix works', () => {
    expect(
      createMealTimeMatrix(
        [
          {
            afterMeal: false,
            beforeMeal: true,
            bolus: null,
            carbohydrates: null,
            date: new Date('Sun Dec 17 2017 07:53:00 GMT-0000'),
            glucose: 86,
          },
        ],
        [],
      ),
    ).toEqual([
      {
        after: {},
        before: {
          afterMeal: false,
          beforeMeal: true,
          bolus: null,
          carbohydrates: null,
          chronologicallyBeforeMealTime: true,
          date: new Date('Sun Dec 17 2017 07:53:00 GMT-0000'),
          glucose: 86,
        },
      },
    ]);
  });

  describe('getCombinedMealTimeName', () => {
    test('should get expected name', () => {
      expect(getCombinedMealTimeName('NIGHT')).toEqual(
        'general.mealBlocks.night',
      );
      expect(getCombinedMealTimeName('BEFORE_BREAKFAST')).toEqual(
        'general.mealBlocks.breakfast',
      );
    });
  });

  describe('getCombinedMealTimeDate', () => {
    test('should get the date when meal time is combinded and measurement is in before meal time', () => {
      const mealTimeDate = {
        hasBeforeAndAfterIntervals: true,
        measurements: [
          {
            before: { date: 123 },
            after: {},
          },
        ],
      };
      expect(getCombinedMealTimeDate(mealTimeDate)).toEqual(123);
    });
    test('should get the date when meal time is combinded and measurement is in after meal time', () => {
      const mealTimeDate = {
        hasBeforeAndAfterIntervals: true,
        measurements: [
          {
            after: { date: 123 },
            before: {},
          },
        ],
      };
      expect(getCombinedMealTimeDate(mealTimeDate)).toEqual(123);
    });
    test('gets the date when meal time is not combinded', () => {
      const mealTimeDate = {
        hasBeforeAndAfterIntervals: false,
        measurements: [{ date: 123 }],
      };
      expect(getCombinedMealTimeDate(mealTimeDate)).toEqual(123);
    });
  });

  describe('toMealTimeModalDate', () => {
    test('spits out the expected date', () => {
      const date = convertISOToJsGMT('March 10 2018 GMT+0000');
      expect(toMealTimeModalDate(date)).toEqual('Mar 10/18');
    });
  });

  describe('flattenCombinedMeasurements', () => {
    test('flattens the array of before and after objects', () => {
      const conmbinedMeasurements = [
        { before: {}, after: {} },
        { before: {}, after: {} },
      ];
      expect(flattenCombinedMeasurements(conmbinedMeasurements).length).toEqual(
        4,
      );
    });
  });

  describe('toMeasurementIndicatorColor', () => {
    test('returns orange when measurement is above target range', () => {
      const measurement = {
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
      };
      expect(toMeasurementIndicatorColor(measurement)).toEqual(
        LOGBOOK_STATUS_COLOR.BLUE,
      );
    });
    test('returns red when measurement is below target range', () => {
      const measurement = {
        aboveTargetRange: false,
        belowTargetRange: true,
        hypoSymptoms: false,
      };
      expect(toMeasurementIndicatorColor(measurement)).toEqual(
        LOGBOOK_STATUS_COLOR.RED,
      );
    });
    test('returns red when measurement has hypo symptoms', () => {
      const measurement = {
        aboveTargetRange: false,
        belowTargetRange: false,
        hypoSymptoms: true,
      };
      expect(toMeasurementIndicatorColor(measurement)).toEqual(
        LOGBOOK_STATUS_COLOR.RED,
      );
    });
    test('returns green when measurement is normal', () => {
      const measurement = {
        aboveTargetRange: false,
        belowTargetRange: false,
        hypoSymptoms: false,
      };
      expect(toMeasurementIndicatorColor(measurement)).toEqual(
        LOGBOOK_STATUS_COLOR.GREEN,
      );
    });
  });

  describe('toMealTimeModalMeasurements', () => {
    test('returns the expected shape', () => {
      const measurement = {
        glucose: 40,
        bolus: 35,
        carbohydrates: 15,
        date: convertISOToJsGMT('Sun Dec 17 2017 14:40:05 GMT-0000'),
        aboveTargetRange: false,
        afterMeal: false,
        belowTargetRange: false,
        beforeMeal: true,
        hypoSymptoms: false,
      };
      const expected = {
        afterMeal: false,
        beforeMeal: true,
        bolus: { unit: 'general.units.U', value: 35 },
        carbohydrates: { unit: 'general.units.g', value: 15 },
        glucose: { unit: 'general.units.mgPerDL', value: 40 },
        statusColor: 'GREEN',
        time: '14:40',
      };
      expect(toMealTimeModalMeasurements(measurement)).toEqual(expected);
    });
  });

  describe('getMealTimeModalMeasurements', () => {
    test('returns the measurements in the expected shape', () => {
      const mealTimeDate = {
        hasBeforeAndAfterIntervals: true,
        measurements: [
          {
            before: {
              glucose: 40,
              bolus: 35,
              carbohydrates: 15,
              date: convertISOToJsGMT('Sun Dec 17 2017 14:40:00 GMT-0000'),
              aboveTargetRange: false,
              afterMeal: false,
              belowTargetRange: false,
              beforeMeal: true,
              hypoSymptoms: false,
            },
            after: {},
          },
          {
            before: {},
            after: {
              glucose: 40,
              bolus: 35,
              carbohydrates: 15,
              date: convertISOToJsGMT('Sun Dec 17 2017 14:20:00 GMT-0000'),
              aboveTargetRange: true,
              afterMeal: true,
              belowTargetRange: false,
              beforeMeal: false,
              hypoSymptoms: false,
            },
          },
        ],
      };
      const expected = [
        {
          afterMeal: false,
          beforeMeal: true,
          bolus: { unit: 'general.units.U', value: 35 },
          carbohydrates: { unit: 'general.units.g', value: 15 },
          glucose: { unit: 'general.units.mgPerDL', value: 40 },
          statusColor: 'GREEN',
          time: '14:40',
        },
        {
          afterMeal: true,
          beforeMeal: false,
          bolus: { unit: 'general.units.U', value: 35 },
          carbohydrates: { unit: 'general.units.g', value: 15 },
          glucose: { unit: 'general.units.mgPerDL', value: 40 },
          statusColor: 'BLUE',
          time: '14:20',
        },
      ];
      expect(getMealTimeModalMeasurements(mealTimeDate)).toEqual(expected);
    });
  });
});
