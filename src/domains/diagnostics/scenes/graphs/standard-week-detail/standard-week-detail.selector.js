import { createSelector, createStructuredSelector } from 'reselect';
import { append, flatten, values, groupWith } from 'ramda';

import {
  selectShowGridLines,
  selectThreshold,
  selectTargetRange,
  selectGraphDetails,
  selectVerticalTicks,
  selectVerticalLabel,
  selectVerticalAxesCeiling,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import {
  GRAPH_Y_MIN,
  GRAPH_Y_MAX,
  DAYS_OF_WEEK,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import {
  togglePointsFilter,
  convertMeasurementsToPoints,
  getYFromTwoPointsAndOneXValue,
  areDatesTheSameDay,
} from 'src/domains/diagnostics/scenes/graphs/graph.util';
import {
  convertDateToWeeklyFloat,
  toEndOfDay,
  toStartOfDay,
  toDayOfWeekNumFormat,
} from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n'; // TODO: move to diagnostics
import {
  selectGraphThreshold,
  selectGraphToggles,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';

import { createMeanBgPoints } from './standard-week-detail.util';

const groupByDay = groupWith(
  ({ data: { date: dateA } }, { data: { date: dateB } }) =>
    areDatesTheSameDay(dateA, dateB),
);

export const groupBgByWeek = clinicalData =>
  values(
    clinicalData.reduce((datesGroupedByWeek, val) => {
      const date = val.date ? val.date : val.data.date;
      const week = date.weekNumber;
      const year = date.weekYear;

      const yearAndWeek = `${year}-${week}`;

      const entries = datesGroupedByWeek[yearAndWeek] || [];

      return {
        ...datesGroupedByWeek,
        [yearAndWeek]: [...entries, val],
      };
    }, {}),
  );

const glucoseValueLinesConnector = glucoseValueLineData =>
  glucoseValueLineData.map((line, index, array) => {
    // An array.length of 2 indicates there's data selected for two different weeks
    // connecting lines are only needed when data spans two different weeks.
    if (array.length <= 1) {
      return line;
    } else {
      const previous = array[index - 1];
      const current = line;
      const next = array[index + 1];
      if (previous) {
        const lastPointOfPrevious = previous[previous.length - 1];
        lastPointOfPrevious.x = lastPointOfPrevious.x - 7;
        lastPointOfPrevious.date = current[0].date;
        current.unshift(lastPointOfPrevious);
      }
      if (next) {
        const firstPointOfNext = next[0];
        firstPointOfNext.x = firstPointOfNext.x + 7;
        firstPointOfNext.date = current[current.length - 1].date;
        current.push(firstPointOfNext);
      }
      return current;
    }
  });

export const convertMeasurementsToLinePoints = measurements =>
  measurements.map(measurement => {
    const x = convertDateToWeeklyFloat(measurement.date);
    const y = measurement.value;

    return {
      x,
      y,
      data: measurement,
    };
  });

const createGlucoseValueLines = measurements =>
  convertMeasurementsToLinePoints(measurements).sort((a, b) => a.x - b.x);

export const createConnectedGlucoseValueLines = measurements =>
  glucoseValueLinesConnector(
    groupBgByWeek(measurements).map(weeklyGlucoseValues =>
      createGlucoseValueLines(weeklyGlucoseValues),
    ),
  );

const normalizeGlucoseLines = (weeks, floor, ceiling) =>
  weeks.map(week =>
    week.map((datum, index) => {
      const { x, y } = datum;

      return {
        x: x / DAYS_OF_WEEK.length,
        y: y / ceiling,
        data: datum.data,
      };
    }),
  );

const normalizeGraphLines = (measurements, graphYMax = GRAPH_Y_MAX) =>
  normalizeGlucoseLines(
    createConnectedGlucoseValueLines(measurements),
    GRAPH_Y_MIN,
    graphYMax,
  );

export const generateLines = week => groupByDay(week);

export const selectGraphLines = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectVerticalAxesCeiling,
  normalizeGraphLines,
);
const convertMSToWeeklyFloat = ms => {
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
  return (7 * ms) / sevenDaysInMs;
};

const toEndOfDayJSDate = date => toEndOfDay(date).toJSDate();
const toStartOfDayJSDate = date => toStartOfDay(date).toJSDate();

const pointsXValueComparator = (a, b) => a.x - b.x;
const tenHoursXValue = (1 / 24) * 10;
const tenHoursNormalizedXValue = (1 / 7 / 24) * 10;
const areDatesLessThan10HoursApart = (dateA, dateB) =>
  convertMSToWeeklyFloat(dateB - dateA) > tenHoursXValue;
const generateDayCrossoverPointsReducer = (
  crossoverPoints,
  day,
  index,
  originalArray,
) => {
  const oneMillisecondXValue = tenHoursXValue / 3600000;
  const nextDay = originalArray[index + 1];

  if (!nextDay || !nextDay.length) {
    return crossoverPoints;
  }

  const lastPointOfDay = day[day.length - 1];
  const firstPointOfNextDay = nextDay[0];

  if (
    areDatesLessThan10HoursApart(
      lastPointOfDay.data.date,
      firstPointOfNextDay.data.date,
    )
  ) {
    return crossoverPoints;
  }

  const dayOfWeekNum =
    parseInt(toDayOfWeekNumFormat(lastPointOfDay.data.date), 10) /
    DAYS_OF_WEEK.length;

  const x = dayOfWeekNum <= 0 ? dayOfWeekNum + 7 : dayOfWeekNum;

  const y = getYFromTwoPointsAndOneXValue(
    lastPointOfDay.x,
    lastPointOfDay.y,
    firstPointOfNextDay.x,
    firstPointOfNextDay.y,
    x,
  );
  return [
    ...crossoverPoints,
    {
      crossOverPoint: false,
      x: x - oneMillisecondXValue,
      y,
      data: {
        date: toEndOfDayJSDate(lastPointOfDay.data.date),
      },
    },
    {
      crossOverPoint: true,
      x,
      y,
      data: {
        date: toStartOfDayJSDate(firstPointOfNextDay.data.date),
      },
    },
  ];
};

const getFinalLines = sortedPointsWithDayCrossoverPointsAdded => {
  let previousX = 0;
  let previousIndex = 0;
  let lines = [];

  sortedPointsWithDayCrossoverPointsAdded.forEach(
    (point, index, originalArray) => {
      if (
        point.x - previousX > tenHoursNormalizedXValue ||
        point.crossOverPoint
      ) {
        lines = append(originalArray.slice(previousIndex, index), lines);
        previousIndex = index;
      }

      if (index === originalArray.length - 1) {
        lines = append(originalArray.slice(previousIndex), lines);
      }

      previousX = point.x;
    },
  );

  return lines;
};

const selectFilteredLines = createSelector(
  selectGraphLines,
  selectGraphToggles,
  (linesGroupedByWeek, toggles) => {
    const linesGroupedByWeekAndDay = linesGroupedByWeek.map(generateLines);
    const groupedLinesWithDayCrossovers = linesGroupedByWeekAndDay.map(week => {
      const dayCrossoverPoints = week
        .reduce(generateDayCrossoverPointsReducer)
        .filter(
          point =>
            point.crossOverPoint === false || point.crossOverPoint === true,
        );

      return [...flatten(week), ...dayCrossoverPoints].sort(
        pointsXValueComparator,
      );
    });
    const newLines = groupedLinesWithDayCrossovers.map(week =>
      getFinalLines(week),
    );
    return toggles.showBloodGlucoseLines ? newLines : [];
  },
);

const selectHorizontalTicks = () =>
  DAYS_OF_WEEK.map((day, index) => ({
    value: index / DAYS_OF_WEEK.length,
    label: translate(`general.days.${DAYS_OF_WEEK[index]}`),
  }));

const normalizePoints = (points = [], floor, ceiling) =>
  points.map((point, index) => {
    const { x, y } = point;

    return {
      ...point,
      x: x / DAYS_OF_WEEK.length,
      y: y / ceiling,
    };
  });

export const selectGlucoseMeasurementPoints = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  selectVerticalAxesCeiling,
  (measurements, thresholds, graphYMax = GRAPH_Y_MAX) =>
    normalizePoints(
      convertMeasurementsToPoints(measurements, thresholds),
      GRAPH_Y_MIN,
      graphYMax,
    ),
);

export const selectFilteredGlucoseMeasurementPoints = createSelector(
  selectGlucoseMeasurementPoints,
  selectGraphToggles,
  togglePointsFilter,
);

export const selectGroupedPoints = createSelector(
  selectFilteredGlucoseMeasurementPoints,
  points => groupBgByWeek(points),
);

export const selectDayMeanPoints = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectVerticalAxesCeiling,
  (measurements, graphYMax = GRAPH_Y_MAX) =>
    normalizePoints(createMeanBgPoints(measurements), GRAPH_Y_MIN, graphYMax),
);

const selectFilteredMeanPoints = createSelector(
  selectDayMeanPoints,
  selectGraphToggles,
  (meanPoints, toggles) => (toggles.showMeanBloodGlucose ? meanPoints : []),
);

export const standardWeekDetailConnector = createStructuredSelector({
  measurements: selectGlucoseMeasurementsInDateSliderRange,
  lines: selectFilteredLines,
  points: selectFilteredGlucoseMeasurementPoints,
  meanPoints: selectFilteredMeanPoints,
  verticalLabel: selectVerticalLabel,
  verticalTicks: selectVerticalTicks,
  horizontalTicks: selectHorizontalTicks,
  targetRange: selectTargetRange,
  threshold: selectThreshold,
  showGridLines: selectShowGridLines,
  graphDetails: selectGraphDetails,
  graphYMax: selectVerticalAxesCeiling,
  isLoading: selectGraphLoading,
});
