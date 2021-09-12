import {
  filter,
  last,
  map,
  pipe,
  sort,
  values,
  head,
  isEmpty,
  flatten,
} from 'ramda';

import {
  toFormat,
  isAfter,
  convertJSDateGMT,
  convertJSDate,
} from 'src/domains/diagnostics/utils';

import {
  LOGBOOK_DATE_FORMAT,
  LOGBOOK_UNITS_UNIT,
  LOGBOOK_STATUS_COLOR,
} from '../../constants/logbook.constants';
import { TIME_FORMAT_24_HOURS } from '../../constants/diagnostics.constants';

export const mealTimeIsBeforeMeal = mealTime =>
  mealTime === 'BEDTIME' || mealTime.substring(0, 6) === 'BEFORE';

export const relatedMealTimesMap = {
  BEDTIME: 'NIGHT',
  NIGHT: 'BEDTIME',
  BEFORE_BREAKFAST: 'AFTER_BREAKFAST',
  AFTER_BREAKFAST: 'BEFORE_BREAKFAST',
  BEFORE_LUNCH: 'AFTER_LUNCH',
  AFTER_LUNCH: 'BEFORE_LUNCH',
  BEFORE_DINNER: 'AFTER_DINNER',
  AFTER_DINNER: 'BEFORE_DINNER',
};

export const getUnitsFromBeforeAndAfterMealTimeMeasurements = measurement => {
  const {
    before: {
      glucose: beforeGlucose,
      bolus: beforeBolus,
      carbohydrates: beforeCarbohydrates,
    },
    after: { glucose: afterGlucose, bolus: afterBolus },
  } = measurement;

  return [
    { type: 'glucose', value: beforeGlucose },
    { type: 'carbohydrates', value: beforeCarbohydrates },
    { type: 'bolus', value: beforeBolus },
    { type: 'glucose', value: afterGlucose },
    { type: 'bolus', value: afterBolus },
  ];
};

const mealTimeSortMap = {
  NIGHT: 0,
  BEFORE_BREAKFAST: 1,
  AFTER_BREAKFAST: 2,
  BEFORE_LUNCH: 3,
  AFTER_LUNCH: 4,
  BEFORE_DINNER: 5,
  AFTER_DINNER: 6,
  BEDTIME: 7,
};

export const getLogbookMealTimeNames = allMealTimeNames => [
  'NIGHT',
  ...filter(
    mealTimeIsBeforeMeal,
    sort((a, b) => mealTimeSortMap[a] - mealTimeSortMap[b], allMealTimeNames),
  ),
];

export const getNumberOfRows = pipe(
  values,
  map(value => value.length),
  sort((a, b) => a - b),
  last,
);

export const getMaxMealTimeRows = mealTimes => {
  if (!Object.keys(mealTimes).length) {
    return 0;
  }
  const combinedMealTimes = {
    NIGHT: mealTimes.NIGHT,
    BREAKFAST: [...mealTimes.BEFORE_BREAKFAST, ...mealTimes.AFTER_BREAKFAST],
    LUNCH: [...mealTimes.BEFORE_LUNCH, ...mealTimes.AFTER_LUNCH],
    DINNER: [...mealTimes.BEFORE_DINNER, ...mealTimes.AFTER_DINNER],
    BEDTIME: mealTimes.BEDTIME,
  };
  return getNumberOfRows(combinedMealTimes);
};

export const createMealTimeMatrix = (
  beforeMealTimeData: Array<LogbookMeasurement>,
  afterMealTimeData: Array<LogbookMeasurement>,
) => {
  const beforeDataWithChronologicalBeforeAfterFlag = beforeMealTimeData.map(
    measurement => ({
      ...measurement,
      chronologicallyBeforeMealTime: true,
    }),
  );
  const afterDataWithChronologicalBeforeAfterFlag = afterMealTimeData.map(
    measurement => ({
      ...measurement,
      chronologicallyBeforeMealTime: false,
    }),
  );

  const sortedMeasurements = sort((a, b) => a.date.ts - b.date.ts, [
    ...beforeDataWithChronologicalBeforeAfterFlag,
    ...afterDataWithChronologicalBeforeAfterFlag,
  ]);

  let mealTimeMatrix = [];

  sortedMeasurements.forEach((measurement, index) => {
    const {
      beforeMeal,
      afterMeal,
      date,
      chronologicallyBeforeMealTime,
    } = measurement;
    if (beforeMeal || (!afterMeal && chronologicallyBeforeMealTime)) {
      mealTimeMatrix = [
        ...mealTimeMatrix,
        {
          before: measurement,
          after:
            sortedMeasurements[index + 1] &&
            date &&
            date === sortedMeasurements[index + 1].date
              ? sortedMeasurements[index + 1]
              : {},
        },
      ];
    } else {
      if (
        !mealTimeMatrix[mealTimeMatrix.length - 1] ||
        mealTimeMatrix[mealTimeMatrix.length - 1].after !== measurement
      ) {
        mealTimeMatrix = [
          ...mealTimeMatrix,
          {
            before: {},
            after: measurement,
          },
        ];
      }
    }
  });

  return mealTimeMatrix;
};

export const formatStringDate = dateString => {
  if (!dateString) {
    return '';
  }
  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const [day, month, year] = dateString.split('-');

  return `${year}/${monthMap[month]}/${day}`;
};

export const getSelectedRowId = (match, logbookData) => {
  const urlDate = toFormat(LOGBOOK_DATE_FORMAT)(
    convertJSDateGMT(new Date(parseInt(match.params.selectedDate, 10))),
  );

  return logbookData.findIndex(datum => {
    const { day } = datum;
    return day === urlDate;
  });
};

export const getCombinedMealTimeName = mealTime => {
  const mealTimeHeaderMap = {
    NIGHT: 'general.mealBlocks.night',
    BEFORE_BREAKFAST: 'general.mealBlocks.breakfast',
    BEFORE_LUNCH: 'general.mealBlocks.lunch',
    BEFORE_DINNER: 'general.mealBlocks.dinner',
    BEDTIME: 'general.mealBlocks.bedTime',
  };

  return mealTimeHeaderMap[mealTime] || 'none';
};

export const getCombinedMealTimeDate = mealTimeData => {
  const first = head(mealTimeData.measurements);
  return mealTimeData.hasBeforeAndAfterIntervals
    ? !isEmpty(first.before)
      ? first.before.date
      : first.after.date
    : first.date;
};

export const toMealTimeModalDate = date => toFormat('LLL dd/yy')(date);

export const flattenCombinedMeasurements = combinedMeasurements =>
  flatten(combinedMeasurements.map(m => [m.before, m.after]));

export const toMeasurementIndicatorColor = measurement => {
  const { aboveTargetRange, belowTargetRange, hypoSymptoms } = measurement;
  if (aboveTargetRange) return LOGBOOK_STATUS_COLOR.BLUE;
  if (belowTargetRange || hypoSymptoms) return LOGBOOK_STATUS_COLOR.RED;
  return LOGBOOK_STATUS_COLOR.GREEN;
};

export const toMealTimeModalMeasurements = measurement => ({
  glucose: {
    value: measurement.glucose,
    unit: LOGBOOK_UNITS_UNIT.GLUCOSE,
  },
  bolus: {
    value: measurement.bolus,
    unit: LOGBOOK_UNITS_UNIT.BOLUS,
  },
  carbohydrates: {
    value: measurement.carbohydrates,
    unit: LOGBOOK_UNITS_UNIT.CARBOHYDRATES,
  },
  time: toFormat(TIME_FORMAT_24_HOURS)(measurement.date),
  afterMeal: measurement.afterMeal,
  beforeMeal: measurement.beforeMeal,
  statusColor: toMeasurementIndicatorColor(measurement),
});

export const getMealTimeModalMeasurements = mealTimeData => {
  const measurements = mealTimeData.hasBeforeAndAfterIntervals
    ? flattenCombinedMeasurements(mealTimeData.measurements)
    : mealTimeData.measurements;

  const AscByTimeComparer = (a, b) =>
    isAfter(convertJSDate(a.time), convertJSDate(b.time));

  return measurements
    .filter(m => !isEmpty(m))
    .map(toMealTimeModalMeasurements)
    .sort(AscByTimeComparer);
};
