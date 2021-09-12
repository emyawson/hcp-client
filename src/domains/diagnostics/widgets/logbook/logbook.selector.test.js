import { convertISOToJsGMT } from 'src/utils';
import { objectJsDateGMTToISOString } from 'src/domains/diagnostics/utils';

import {
  adjustDayMeasurementsByFlags,
  groupMeasurementsByDay,
  groupDayMeasurementsByMealTime,
  groupMeasurementsAsMealTimeCellMatrices,
  selectLogbookData,
} from './logbook.selector';

const mockState = {
  ui: {
    patientDashboard: {
      glucoseMeasurements: [
        {
          value: 125.0,
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: 20,
        },
        {
          value: 80.0,
          date: convertISOToJsGMT('2016-12-01 06:23:33+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: null,
          date: convertISOToJsGMT('2016-12-02 17:27:43+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: 10,
        },
        {
          value: 100.0,
          date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
          beforeMeal: false,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: 120.0,
          date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: 140.0,
          date: convertISOToJsGMT('2016-12-04 09:23:33+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: 90.0,
          date: convertISOToJsGMT('2016-12-05 10:23:33+0000'),
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
      ],
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('2016-11-29 06:23:33+0000'),
      endDate: convertISOToJsGMT('2016-12-06 10:23:33+0000'),
    },
  },
  stripDelivery: {
    thresholds: {
      hyper: {
        preIdealInterval: 125,
      },
      hypo: {
        preIdealInterval: 60,
      },
      warning: {
        preIdealInterval: 80,
      },
    },
    timeIntervals: [
      {
        id: 2161,
        description: 'BEFORE_BREAKFAST',
        startTime: '06:00:00',
        endTime: '08:30:00',
        label: null,
      },
      {
        id: 2162,
        description: 'AFTER_BREAKFAST',
        startTime: '08:30:00',
        endTime: '11:30:00',
        label: null,
      },
      {
        id: 2163,
        description: 'BEFORE_LUNCH',
        startTime: '11:30:00',
        endTime: '12:30:00',
        label: null,
      },
      {
        id: 2164,
        description: 'AFTER_LUNCH',
        startTime: '12:30:00',
        endTime: '14:30:00',
        label: null,
      },
      {
        id: 2165,
        description: 'BEFORE_DINNER',
        startTime: '14:30:00',
        endTime: '18:00:00',
        label: null,
      },
      {
        id: 2166,
        description: 'AFTER_DINNER',
        startTime: '18:00:00',
        endTime: '21:00:00',
        label: null,
      },
      {
        id: 2167,
        description: 'BEDTIME',
        startTime: '21:00:00',
        endTime: '01:00:00',
        label: null,
      },
      {
        id: 2168,
        description: 'NIGHT',
        startTime: '01:00:00',
        endTime: '06:00:00',
        label: null,
      },
    ],
  },
};

const simplifyMealsDates = object => {
  let updatedObject = {};

  Object.keys(object).forEach(key => {
    updatedObject[key] = object[key].map(objectJsDateGMTToISOString);
  });
};

const simplifyDaysWithBeforeAfterDates = array =>
  array.map(group => {
    let mealTimes = {};

    Object.keys(group.mealTimes).forEach(key => {
      mealTimes[key] = group.mealTimes[key].measurements
        ? {
            ...group.mealTimes[key],
            measurements: group.mealTimes[key].measurements.map(m => ({
              before: m.before.date
                ? objectJsDateGMTToISOString(m.before)
                : m.before,
              after: m.after.date
                ? objectJsDateGMTToISOString(m.after)
                : m.after,
            })),
          }
        : group.mealTimes[key];
    });

    return { ...group, mealTimes };
  });

describe('Logbook selector test suite', () => {
  test('selectLogbookData works', () => {
    const expected = [
      {
        day: 'Wednesday, Nov 30, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: 20,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
                  glucose: 125,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
      {
        day: 'Thursday, Dec 1, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-01 06:23:33+0000'),
                  glucose: 80,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
      {
        day: 'Friday, Dec 2, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: true,
                  bolus: null,
                  carbohydrates: 10,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-02 17:27:43+0000'),
                  glucose: null,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
      {
        day: 'Saturday, Dec 3, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: false,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
                  glucose: 100,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
                  glucose: 120,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
      {
        day: 'Sunday, Dec 4, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: true,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-04 09:23:33+0000'),
                  glucose: 140,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
      {
        day: 'Monday, Dec 5, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-05 10:23:33+0000'),
                  glucose: 90,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
    ];

    const actual = selectLogbookData(mockState);
    expect(simplifyDaysWithBeforeAfterDates(actual)).toEqual(
      simplifyDaysWithBeforeAfterDates(expected),
    );
  });

  test('groupMeasurementsByDay works', () => {
    const {
      ui: {
        patientDashboard: { glucoseMeasurements },
      },
      stripDelivery: { thresholds },
    } = mockState;

    const expected = {
      'Friday, Dec 2, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: 10,
          date: convertISOToJsGMT('2016-12-02 17:27:43+0000'),
          glucose: null,
          hypoSymptoms: false,
        },
      ],
      'Monday, Dec 5, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-05 10:23:33+0000'),
          glucose: 90,
          hypoSymptoms: false,
        },
      ],
      'Saturday, Dec 3, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
          glucose: 100,
          hypoSymptoms: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
          glucose: 120,
          hypoSymptoms: false,
        },
      ],
      'Sunday, Dec 4, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-04 09:23:33+0000'),
          glucose: 140,
          hypoSymptoms: false,
        },
      ],
      'Thursday, Dec 1, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-01 06:23:33+0000'),
          glucose: 80,
          hypoSymptoms: false,
        },
      ],
      'Wednesday, Nov 30, 2016': [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: 20,
          date: convertISOToJsGMT('2016-11-30 06:23:33+0000'),
          glucose: 125,
          hypoSymptoms: false,
        },
      ],
    };
    const actual = groupMeasurementsByDay(glucoseMeasurements, thresholds);

    expect(simplifyMealsDates(actual)).toEqual(simplifyMealsDates(expected));
  });

  test('groupDayMeasurementsByMealTime works', () => {
    const {
      ui: {
        patientDashboard: { glucoseMeasurements },
      },
      stripDelivery: { thresholds, timeIntervals },
    } = mockState;
    const measurementsGroupedByDay = groupMeasurementsByDay(
      glucoseMeasurements,
      thresholds,
    );

    const expected = {
      AFTER_BREAKFAST: [],
      AFTER_DINNER: [],
      AFTER_LUNCH: [],
      BEDTIME: [],
      BEFORE_BREAKFAST: [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
          glucose: 100,
          hypoSymptoms: false,
        },
      ],
      BEFORE_DINNER: [],
      BEFORE_LUNCH: [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          bolus: null,
          carbohydrates: null,
          date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
          glucose: 120,
          hypoSymptoms: false,
        },
      ],
      NIGHT: [],
    };
    const actual = groupDayMeasurementsByMealTime(
      measurementsGroupedByDay['Saturday, Dec 3, 2016'],
      timeIntervals,
    );

    expect(simplifyMealsDates(actual)).toEqual(simplifyMealsDates(expected));
  });

  test('adjustDayMeasurementsByFlags works', () => {
    const {
      ui: {
        patientDashboard: { glucoseMeasurements },
      },
      stripDelivery: { thresholds, timeIntervals },
    } = mockState;
    const measurementsGroupedByDay = groupMeasurementsByDay(
      glucoseMeasurements,
      thresholds,
    );
    const day = 'Saturday, Dec 3, 2016';
    const dayMeasurementsGroupedByMealTime = groupDayMeasurementsByMealTime(
      measurementsGroupedByDay[day],
      timeIntervals,
    );

    const expected = {
      day: 'Saturday, Dec 3, 2016',
      mealTimes: {
        AFTER_BREAKFAST: [],
        AFTER_DINNER: [],
        AFTER_LUNCH: [],
        BEDTIME: [],
        BEFORE_BREAKFAST: [
          {
            aboveTargetRange: false,
            afterMeal: false,
            beforeMeal: false,
            belowTargetRange: false,
            bolus: null,
            carbohydrates: null,
            date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
            glucose: 100,
            hypoSymptoms: false,
          },
        ],
        BEFORE_DINNER: [],
        BEFORE_LUNCH: [
          {
            aboveTargetRange: false,
            afterMeal: false,
            beforeMeal: true,
            belowTargetRange: false,
            bolus: null,
            carbohydrates: null,
            date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
            glucose: 120,
            hypoSymptoms: false,
          },
        ],
        NIGHT: [],
      },
    };
    const actual = adjustDayMeasurementsByFlags({
      day,
      mealTimes: dayMeasurementsGroupedByMealTime,
    });

    const simplifyDates = object => ({
      ...object,
      mealTimes: simplifyMealsDates(object.mealTimes),
    });

    expect(simplifyDates(actual)).toEqual(simplifyDates(expected));
  });

  test('groupMeasurementsAsMealTimeCellMatrices', () => {
    const {
      ui: {
        patientDashboard: { glucoseMeasurements },
      },
      stripDelivery: { thresholds, timeIntervals },
    } = mockState;
    const measurementsGroupedByDay = groupMeasurementsByDay(
      glucoseMeasurements,
      thresholds,
    );
    const day = 'Saturday, Dec 3, 2016';
    const dayMeasurementsGroupedByMealTime = groupDayMeasurementsByMealTime(
      measurementsGroupedByDay[day],
      timeIntervals,
    );
    const adjustedDayMeasurements = adjustDayMeasurementsByFlags({
      day,
      mealTimes: dayMeasurementsGroupedByMealTime,
    });

    const expected = [
      {
        day: 'Saturday, Dec 3, 2016',
        mealTimes: {
          BEDTIME: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_BREAKFAST: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: false,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-03 07:23:33+0000'),
                  glucose: 100,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          BEFORE_DINNER: {
            hasBeforeAndAfterIntervals: true,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
          BEFORE_LUNCH: {
            hasBeforeAndAfterIntervals: true,
            measurements: [
              {
                after: {},
                before: {
                  aboveTargetRange: false,
                  afterMeal: false,
                  beforeMeal: true,
                  belowTargetRange: false,
                  bolus: null,
                  carbohydrates: null,
                  chronologicallyBeforeMealTime: true,
                  date: convertISOToJsGMT('2016-12-03 12:23:33+0000'),
                  glucose: 120,
                  hypoSymptoms: false,
                },
              },
            ],
            numberOfRowsWithContent: 1,
          },
          NIGHT: {
            hasBeforeAndAfterIntervals: false,
            measurements: [],
            numberOfRowsWithContent: 0,
          },
        },
        numberOfRows: 1,
      },
    ];
    const actual = groupMeasurementsAsMealTimeCellMatrices([
      adjustedDayMeasurements,
    ]);

    expect(simplifyDaysWithBeforeAfterDates(actual)).toEqual(
      simplifyDaysWithBeforeAfterDates(expected),
    );
  });
});
