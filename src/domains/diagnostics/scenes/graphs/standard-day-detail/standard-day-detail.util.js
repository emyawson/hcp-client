import { sort, values, isEmpty } from 'ramda';

import { translate } from 'src/i18n';
import {
  toFormat,
  isBefore,
  hourStringToFloat,
  convertGMTDateToFloat,
} from 'src/domains/diagnostics/utils';
import {
  AppleIcon,
  AppleEatenIcon,
  NightIcon,
  OvernightIcon,
} from 'src/domains/diagnostics/assets/icons';
import { GROUPED_TIME_INTERVALS } from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { hourGapNotGreaterThanXHours } from 'src/domains/diagnostics/scenes/graphs/graph.util';
import { colors } from 'src/domains/diagnostics/styles';

import { HOURS_IN_DAY } from './standard-day-detail.constant';

export const formatHours = (value: number): string =>
  value === HOURS_IN_DAY
    ? '00:00'
    : value < 10
      ? `0${value}:00`
      : `${value}:00`;

export const glucoseValueLinesConnector = glucoseValueLineData =>
  glucoseValueLineData.map((line, index, array) => {
    const previous = array[index - 1];
    const current = line;
    const next = array[index + 1];

    if (previous) {
      const lastPointOfPrevious = previous[previous.length - 1];
      // get dates to check for 10 hour gap.
      const aDate = lastPointOfPrevious.date;
      const bDate = current[0].date;
      if (hourGapNotGreaterThanXHours(aDate, bDate, 10)) {
        lastPointOfPrevious.x = lastPointOfPrevious.x - HOURS_IN_DAY;
        lastPointOfPrevious.lineIndex = current[0].lineIndex;
        lastPointOfPrevious.date = current[0].date;
        // Add lastPointPrevious to the beginning of current.
        current.unshift(lastPointOfPrevious);
      }
    }

    if (next) {
      const firstPointOfNext = next[0];
      const aDate = current[current.length - 1].date;
      const bDate = firstPointOfNext.date;
      if (hourGapNotGreaterThanXHours(aDate, bDate, 10)) {
        firstPointOfNext.x = firstPointOfNext.x + HOURS_IN_DAY;
        firstPointOfNext.lineIndex = current[0].lineIndex;
        firstPointOfNext.date = current[0].date;
        // Add firstPointOfNext to the end of current
        current.push(firstPointOfNext);
      }
    }
    return current;
  });

export const groupGlucoseValuesBy24HourIntervals = (
  clinicalData: GlucoseMeasurement[],
  minimumXValue: number,
) => {
  const chronologicalData = sort(
    (a, b) => a.date.valueOf() - b.date.valueOf(),
    clinicalData,
  );

  return values(
    chronologicalData.reduce((datesGroupedBy24H, val) => {
      let dayStart = val.date.set({
        hour: minimumXValue,
        minute: 0,
        second: 0,
        millisecond: 0,
      });

      if (isBefore(dayStart, val.date)) {
        dayStart = dayStart.minus({ days: 1 });
      }

      const key = toFormat('yyyy-MM-dd-HH')(dayStart);

      const entries = datesGroupedBy24H[key] || [];

      return {
        ...datesGroupedBy24H,
        [key]: [...entries, val],
      };
    }, {}),
  );
};

const connectFirstAndLastBG = (bgPoints = []) => {
  if (isEmpty(bgPoints)) return;
  const sortedBgPoints = bgPoints.sort((a, b) => a.x - b.x);
  const first = sortedBgPoints[0];
  const last = sortedBgPoints[sortedBgPoints.length - 1];
  const startingPoint = { ...last, x: last.x - HOURS_IN_DAY };
  const endingPoint = { ...first, x: first.x + HOURS_IN_DAY };
  return [startingPoint, ...bgPoints, endingPoint];
};

export const parseTimeIntervalFloats = timeIntervals =>
  timeIntervals.map(t => {
    const startTimeFloat = hourStringToFloat(t.startTime);
    let endTimeFloat = hourStringToFloat(t.endTime);

    if (endTimeFloat < startTimeFloat) {
      endTimeFloat += HOURS_IN_DAY;
    }

    const midTimeFloat = ((startTimeFloat + endTimeFloat) / 2) % HOURS_IN_DAY;

    return {
      description: t.description,
      startTime: startTimeFloat,
      endTime: endTimeFloat,
      midTime: midTimeFloat,
    };
  });

export const meanBgPointsTransform = (
  bgPointsByTimeInterval,
  minimumXValue,
) => {
  const times = Object.keys(bgPointsByTimeInterval);

  const transformedPoints = times.map(time =>
    bgPointsByTimeInterval[time].reduce((acc, val, i, intervalArr) => {
      let x = parseFloat(time) - minimumXValue;
      let meanValue = val.y / intervalArr.length;
      let glucoseValue = val.glucoseValue / intervalArr.length;

      if (i !== 0) {
        meanValue += acc.y;
        glucoseValue += acc.glucoseValue;
      }

      return {
        x: adjustValueByDay(x),
        y: meanValue,
        data: { value: parseFloat(meanValue.toFixed(2)) },
        glucoseValue: parseFloat(glucoseValue.toFixed(2)),
      };
    }, {}),
  );

  return connectFirstAndLastBG(transformedPoints);
};

export const groupByTimeInterval = (bgPoints, timeIntervals) =>
  bgPoints.reduce((acc, bgPoint) => {
    const glucoseTimeInterval = parseTimeIntervalFloats(timeIntervals).reduce(
      (acc, timeFloat) => {
        if (acc) {
          return acc;
        } else if (
          timeFloat.startTime <= bgPoint.x &&
          timeFloat.endTime >= bgPoint.x
        ) {
          return timeFloat;
        }

        return acc;
      },
      null,
    );

    const key = glucoseTimeInterval
      ? glucoseTimeInterval.midTime.toString()
      : null; //TODO: Refactor this whole method

    const entries = acc[key] || [];

    return {
      ...acc,
      [key]: [...entries, bgPoint],
    };
  }, {});

const getIntervalLabel = description => {
  const label = description.replace('BEFORE_', '').replace('AFTER_', '');

  switch (label) {
    case 'BREAKFAST':
      return translate('general.mealBlocks.breakfast');
    case 'LUNCH':
      return translate('general.mealBlocks.lunch');
    case 'DINNER':
      return translate('general.mealBlocks.dinner');
    case 'BEDTIME':
      return translate('general.mealBlocks.bedTime');
    case 'NIGHT':
      return translate('general.mealBlocks.night');
    default:
      return '';
  }
};

export const getParsedIntervalIcon = (parsedInterval, minimumXValue) => {
  let IconComponent;
  let iconWidthScale;

  const { description } = parsedInterval;
  const value = parsedInterval.midTime - minimumXValue;

  if (
    description === 'BEFORE_BREAKFAST' ||
    description === 'BEFORE_LUNCH' ||
    description === 'BEFORE_DINNER'
  ) {
    IconComponent = AppleIcon;
    iconWidthScale = 0.04;
  } else if (
    description === 'AFTER_BREAKFAST' ||
    description === 'AFTER_LUNCH' ||
    description === 'AFTER_DINNER'
  ) {
    IconComponent = AppleEatenIcon;
    iconWidthScale = 0.023;
  } else if (description === 'NIGHT') {
    IconComponent = NightIcon;
    iconWidthScale = 0.035;
  } else if (description === 'BEDTIME') {
    IconComponent = OvernightIcon;
    iconWidthScale = 0.033;
  }

  return {
    value: adjustValueByDay(value) / HOURS_IN_DAY,
    IconComponent,
    iconWidthScale,
    icon: true,
  };
};

export const getParsedIntervalLabel = (parsedInterval, minimumXValue) => {
  const { midTime, endTime, description } = parsedInterval;

  let value = null;

  if (description === 'NIGHT' || description === 'BEDTIME') {
    value = midTime - minimumXValue;
  } else if (
    description === 'BEFORE_BREAKFAST' ||
    description === 'BEFORE_LUNCH' ||
    description === 'BEFORE_DINNER'
  ) {
    value = endTime - minimumXValue;
  }

  return {
    value: value ? adjustValueByDay(value) / HOURS_IN_DAY : null,
    label: getIntervalLabel(parsedInterval.description),
  };
};

export const getParsedIntervalTick = (parsedInterval, minimumXValue) => {
  const { endTime, description } = parsedInterval;

  let value = endTime - minimumXValue;
  let type = null;

  if (
    description === 'BEFORE_BREAKFAST' ||
    description === 'BEFORE_LUNCH' ||
    description === 'BEFORE_DINNER'
  ) {
    type = 'short';
  } else {
    type = 'long';
  }

  return {
    value: adjustValueByDay(value) / HOURS_IN_DAY,
    type,
    tickLine: true,
  };
};

export const getBackgroundPanels = (
  parsedInterval,
  numericalGraphStartTime,
) => {
  const { startTime, endTime, description } = parsedInterval;
  const fillColor =
    description.includes(GROUPED_TIME_INTERVALS.BREAKFAST) ||
    description.includes(GROUPED_TIME_INTERVALS.DINNER)
      ? colors.white
      : colors.silverLight;

  let x1 = startTime - numericalGraphStartTime;
  let x2 = endTime - numericalGraphStartTime;

  return {
    x1: adjustValueByDay(x1) / HOURS_IN_DAY,
    x2: adjustValueByDay(x2) / HOURS_IN_DAY,
    fillColor,
  };
};

// method considers when a panel crosses the end of the graph and continues at the beginning
export const includeInitialPanel = backgroundPanels => {
  let initialPanel = {};

  const modifiedBackgroundPanels = backgroundPanels.map(
    ({ x1, x2, fillColor }) => {
      let newX2 = x2;

      if (x2 < x1) {
        initialPanel = { x1: 0, x2, fillColor };
        newX2 = HOURS_IN_DAY;
      }

      return {
        x1,
        x2: newX2,
        fillColor,
      };
    },
  );

  return [...modifiedBackgroundPanels, initialPanel];
};

export const sortGlucoseValues = (a, b) => a.x - b.x;

export const parseDailyGlucoseValues = (glucoseValue, minimumXValue, index) => {
  let x = convertGMTDateToFloat(glucoseValue.date) - minimumXValue;
  return {
    x: adjustValueByDay(x),
    y: glucoseValue.value,
    date: glucoseValue.date,
    lineIndex: index,
  };
};

export const adjustValueByDay = value =>
  value < 0 ? value + HOURS_IN_DAY : value;
