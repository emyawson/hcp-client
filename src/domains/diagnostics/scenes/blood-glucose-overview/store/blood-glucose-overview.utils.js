import { isNil, contains } from 'ramda';
import { compose } from 'recompose';

import {
  average,
  fixToDecimalPlace,
  standardDeviation,
  toDayOfYearFormat,
  diffDays,
  isDatetimeWithinInterval,
  toFormat,
  toStartOfQuarter,
  toEndOfQuarter,
  toEndOfISOWeek,
  plusWeeks,
  plusMonths,
  plusQuarters,
  isBefore,
  isAfter,
  toEndOfMonth,
} from 'src/domains/diagnostics/utils';
import {
  groupByQuarterFilled,
  groupByMonthFilled,
  groupByWeekFilled,
  groupByDay,
  subIntervals,
  toInterval,
  isEqualInterval,
  isAfterInterval,
  isBeforeInterval,
} from 'src/domains/diagnostics/utils';
import { TIME_INTERVAL, PAGER_TYPE } from 'src/domains/diagnostics/constants';
import { calculateIntervalAverageTestsPerDay } from 'src/domains/diagnostics/utils';
import {
  roundToNDecimalPlaces,
  calculateLowBloodGlucoseIndex,
} from 'src/domains/diagnostics/scenes/graphs/graph-statistics.util';
import { translate } from 'src/i18n';

import {
  MINIMUM_TESTS_FOR_INTERVAL,
  MINIMUM_AVERAGE_TESTS_FOR_DAY,
  TRAFFIC_LIGHT_COLORS,
  VARIABILITY_THRESHOLDS,
  TRAFFIC_LIGHT_LABELS,
  NO_MEASUREMENTS_INTERVAL_LABEL,
  NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS,
  HYPO_RISK_THRESHOLDS,
} from './blood-glucose-overview.constants';

const toTrafficLightInsufficientLabel = numberOfMeasurements =>
  numberOfMeasurements === 0
    ? NO_MEASUREMENTS_INTERVAL_LABEL
    : TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO;

const isSufficientInformation = numberOfMeasurements =>
  numberOfMeasurements >= MINIMUM_TESTS_FOR_INTERVAL;

const isMinAverageOfTwoMeasurementPerDay = testsPerDay =>
  testsPerDay >= MINIMUM_AVERAGE_TESTS_FOR_DAY;

const isEvenlyDistributed = (groupByDayMeasurements, intervals) => {
  const evenlyDistributedNumbers = groupByDayMeasurements
    .map(groupByDayMeasurements =>
      groupByDayMeasurements.group.reduce(
        (acc, measurement) => {
          if (
            isDatetimeWithinInterval(
              measurement.date,
              intervals.firstHalf.startTime,
              intervals.firstHalf.endTime,
            )
          ) {
            acc.firstHalf++;
          } else {
            acc.secondHalf++;
          }
          return acc;
        },
        {
          firstHalf: 0,
          secondHalf: 0,
        },
      ),
    )
    .reduce(
      (acc, halfDaysCounts) => {
        acc.total++;
        if (halfDaysCounts.firstHalf > 0 && halfDaysCounts.secondHalf > 0) {
          acc.passed++;
        }
        return acc;
      },
      {
        total: 0,
        passed: 0,
      },
    );

  return (
    evenlyDistributedNumbers.passed / evenlyDistributedNumbers.total >= 8 / 10
  );
};

export const hasReliableInfo = (
  measurements,
  testsPerDay,
  dayInHalfTimeIntervals,
) => {
  const sufficientInformation = isSufficientInformation(measurements.length);
  const minAverageOfTwoMeasurementPerDay = isMinAverageOfTwoMeasurementPerDay(
    testsPerDay,
  );
  const evenlyDistributed = isEvenlyDistributed(
    groupByDay(measurements),
    dayInHalfTimeIntervals,
  );

  return (
    sufficientInformation &&
    minAverageOfTwoMeasurementPerDay &&
    evenlyDistributed
  );
};

export const determineHasReliableInfo = (
  groupedMeasurements,
  dayInHalfIntervals,
) =>
  groupedMeasurements.map(intervalGroup => ({
    ...intervalGroup,
    conditionsMet: hasReliableInfo(
      intervalGroup.measurements,
      intervalGroup.testsPerDay,
      dayInHalfIntervals,
    ),
  }));

const formatWeeklyInterval = interval => {
  const getMonthShortForm = date =>
    translate(
      `dashboard.statusCard.monthLabels.${toFormat('MMMM')(
        date,
      ).toLowerCase()}ShortForm`,
    );
  const startMonth = getMonthShortForm(interval.start);
  const startDay = toFormat('dd')(interval.start);
  const endMonth = getMonthShortForm(interval.end);
  const endDay = toFormat('dd')(interval.end);
  const endYear = toFormat('yyyy')(interval.end);
  const startYear = toFormat('yyyy')(interval.start);
  const yearLabel =
    endYear === startYear ? endYear.toUpperCase() : `${startYear} - ${endYear}`;
  return {
    top: `${startMonth} ${startDay} - ${endMonth} ${endDay}`.toUpperCase(),
    bottom: yearLabel.toUpperCase(),
  };
};
const formatMonthlyInterval = interval => ({
  top: toFormat('MMM / yyyy')(interval.start).toUpperCase(),
  bottom: null,
});

const formatQuarterlyInterval = interval => {
  const date = interval.start;
  const quarterStart = toStartOfQuarter(date);
  const year = toFormat('yyyy')(quarterStart);
  const quarter = `${date.quarter} / ${year}`;
  return {
    top: `Q${quarter}`.toUpperCase(),
    bottom: null,
  };
};

const createFormatGroupByInterval = intervalFormatter => groupedMeasurements =>
  groupedMeasurements.map(groupedMeasurement => ({
    ...groupedMeasurement,
    interval: intervalFormatter(groupedMeasurement.interval),
  }));

const formatGroupByWeekInterval = createFormatGroupByInterval(
  formatWeeklyInterval,
);
const formatGroupByMonthInterval = createFormatGroupByInterval(
  formatMonthlyInterval,
);
const formatGroupByQuarterInterval = createFormatGroupByInterval(
  formatQuarterlyInterval,
);

const toMeasurementsGroups = groupedMeasurement =>
  groupedMeasurement
    .map(({ interval, group }) => ({
      interval,
      measurements: group,
    }))
    .slice(0, 6) // might slice off the 7th interval which is partial and we don't display
    .reverse();

const groupByTimeIntervalTransformers = {
  [TIME_INTERVAL.QUARTERLY_INTERVALS]: compose(
    toMeasurementsGroups,
    groupByQuarterFilled,
  ),
  [TIME_INTERVAL.MONTHLY_INTERVALS]: compose(
    toMeasurementsGroups,
    groupByMonthFilled,
  ),
  [TIME_INTERVAL.WEEKLY_INTERVALS]: compose(
    toMeasurementsGroups,
    groupByWeekFilled,
  ),
};

export const groupByTimeInterval = (
  timeInterval = TIME_INTERVAL.WEEKLY_INTERVALS,
  clinicalData = [],
  endDate,
  numberOfColumns,
  firstMeasurementDate,
  lastMeasurementDate,
) =>
  groupByTimeIntervalTransformers[timeInterval](
    clinicalData,
    endDate,
    numberOfColumns,
    firstMeasurementDate,
    lastMeasurementDate,
  );

const toLabelIntervalTransformers = {
  [TIME_INTERVAL.QUARTERLY_INTERVALS]: formatGroupByQuarterInterval,
  [TIME_INTERVAL.MONTHLY_INTERVALS]: formatGroupByMonthInterval,
  [TIME_INTERVAL.WEEKLY_INTERVALS]: formatGroupByWeekInterval,
};
export const toLabelInterval = (groupedMeasurements, interval) =>
  toLabelIntervalTransformers[interval](groupedMeasurements);

export const calculateIntervalEmptyDays = groupedMeasurements =>
  groupedMeasurements.map(intervalGroup => {
    const {
      interval: { start, end },
      measurements,
    } = intervalGroup;
    const daysWithMeasurement = measurements.reduce((acc, { date }) => {
      const day = toDayOfYearFormat(date);
      if (!contains(day, acc)) {
        acc.push(day);
      }
      return acc;
    }, []);

    const numberIntervalOfDays = Math.round(diffDays(end, start).values.days);
    const numberOfMissingDays =
      numberIntervalOfDays - daysWithMeasurement.length;
    return {
      ...intervalGroup,
      numberOfMissingDays,
    };
  });

export const calculateBloodGlucoseStartDate = (
  endDate,
  timeInterval,
  numberOfColumns,
) => subIntervals(endDate, timeInterval, numberOfColumns - 1).start;

export const calculateMeanBloodGlucose = groupedMeasurements =>
  groupedMeasurements.map(({ interval, measurements, conditionsMet }) => {
    const measurementValues = measurements.map(
      measurement => measurement.value,
    );

    const mean = fixToDecimalPlace(average(measurementValues), 1);

    return {
      interval,
      value: Math.round(mean),
      numberOfMeasurements: measurementValues.length,
      conditionsMet,
    };
  });

export const calculateForVariability = groupedMeasurementIntervals =>
  groupedMeasurementIntervals.map(
    ({ interval, measurements, conditionsMet }) => {
      const measurementValues = measurements.map(
        measurement => measurement.value,
      );
      const mean = fixToDecimalPlace(average(measurementValues), 1);
      return {
        interval,
        numberOfMeasurements: measurementValues.length,
        value: fixToDecimalPlace(
          (standardDeviation(measurementValues) / mean) * 100,
          1,
        ),
        conditionsMet,
      };
    },
  );

export const createCalculateForHypoglycaemia = hypoglycaemiaThreshold => groupedMeasurementIntervals =>
  groupedMeasurementIntervals.map(
    ({ interval, measurements, conditionsMet }) => {
      const hypoglycaemiaCount = measurements.reduce(
        (count, { value }) =>
          value < hypoglycaemiaThreshold ? count + 1 : count,
        0,
      );

      return {
        interval,
        numberOfMeasurements: measurements.length,
        value: hypoglycaemiaCount,
        conditionsMet,
      };
    },
  );

export const calculateVariabilityStatus = value => {
  if (isNil(value) || isNaN(value)) {
    return {
      color: TRAFFIC_LIGHT_COLORS.GRAY,
      label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
    };
  } else if (value < VARIABILITY_THRESHOLDS.MEDIUM) {
    return {
      color: TRAFFIC_LIGHT_COLORS.GREEN,
      label: TRAFFIC_LIGHT_LABELS.LOW,
    };
  } else if (value < VARIABILITY_THRESHOLDS.HIGH) {
    return {
      color: TRAFFIC_LIGHT_COLORS.YELLOW,
      label: TRAFFIC_LIGHT_LABELS.MEDIUM,
    };
  } else {
    return {
      color: TRAFFIC_LIGHT_COLORS.RED,
      label: TRAFFIC_LIGHT_LABELS.HIGH,
    };
  }
};

export const toVariabilityStatus = groupedValues =>
  groupedValues.map(groupedValue => {
    const { numberOfMeasurements, value, conditionsMet } = groupedValue;
    const trafficLightOptions = calculateVariabilityStatus(value);

    if (!conditionsMet) {
      return {
        ...trafficLightOptions,
        label: toTrafficLightInsufficientLabel(numberOfMeasurements),
      };
    }
    return trafficLightOptions;
  });

export const calculateAvgTestsPerDay = groupedMeasurements =>
  groupedMeasurements.map(intervalGroup => {
    const {
      interval: { start, end },
      measurements,
    } = intervalGroup;

    const testsPerDay = calculateIntervalAverageTestsPerDay(
      measurements,
      start,
      end,
    );

    return {
      ...intervalGroup,
      testsPerDay,
    };
  });

export const formatTestsPerDayAvg = groups =>
  groups.map(
    group =>
      group.testsPerDay === 0
        ? NO_MEASUREMENTS_INTERVAL_LABEL
        : Number(group.testsPerDay).toFixed(1),
  );

export const isHypoRed = (value, hypoglycemiaThreshold) =>
  value > 0 && value < hypoglycemiaThreshold;

export const isHypoYellow = (
  value,
  hypoglycemiaThreshold,
  glucoseIdealIntervalMin,
) => value >= hypoglycemiaThreshold && value < glucoseIdealIntervalMin;

export const isInRange = (
  value,
  glucoseIdealIntervalMin,
  glucoseIdealIntervalMax,
) => value >= glucoseIdealIntervalMin && value <= glucoseIdealIntervalMax;

export const isHyperYellow = (value, glucoseIdealIntervalMax, upperThreshold) =>
  value > glucoseIdealIntervalMax && value <= upperThreshold;

export const isHyperRed = (value, upperThreshold) => value > upperThreshold;

export const calculateMeanColor = (
  value,
  {
    hypoglycemiaThreshold,
    glucoseIdealIntervalMin,
    glucoseIdealIntervalMax,
    upperHyperThreshold,
  },
) => {
  if (
    isHypoRed(value, hypoglycemiaThreshold) ||
    isHyperRed(value, upperHyperThreshold)
  ) {
    return TRAFFIC_LIGHT_COLORS.RED;
  }
  if (
    isHypoYellow(value, hypoglycemiaThreshold, glucoseIdealIntervalMin) ||
    isHyperYellow(value, glucoseIdealIntervalMax, upperHyperThreshold)
  ) {
    return TRAFFIC_LIGHT_COLORS.YELLOW;
  }
  if (isInRange(value, glucoseIdealIntervalMin, glucoseIdealIntervalMax)) {
    return TRAFFIC_LIGHT_COLORS.GREEN;
  }
  return TRAFFIC_LIGHT_COLORS.GRAY;
};

export const calculateMeanLabel = (
  value,
  { glucoseIdealIntervalMin, glucoseIdealIntervalMax },
) => {
  if (value > 0 && value < glucoseIdealIntervalMin) {
    return TRAFFIC_LIGHT_LABELS.HYPO;
  }
  if (value > glucoseIdealIntervalMax) {
    return TRAFFIC_LIGHT_LABELS.HYPER;
  }
  if (value >= glucoseIdealIntervalMin && value <= glucoseIdealIntervalMax) {
    return TRAFFIC_LIGHT_LABELS.IN_RANGE;
  }
};

export const toMeanBloodGlucoseStatus = (meanGlucoseValues, thresholds) =>
  meanGlucoseValues.map(({ value, numberOfMeasurements, conditionsMet }) => ({
    color: calculateMeanColor(value, thresholds),
    label: conditionsMet
      ? calculateMeanLabel(value, thresholds)
      : toTrafficLightInsufficientLabel(numberOfMeasurements),
  }));

export const toMeanBloodGlucoseValue = meanGlucoseValues =>
  meanGlucoseValues.map(
    ({ value, numberOfMeasurements }) =>
      numberOfMeasurements === 0
        ? NO_MEASUREMENTS_INTERVAL_LABEL
        : value.toString(),
  );

export const toHypoglycaemiaCount = groupedValues =>
  groupedValues.map(
    ({ value, numberOfMeasurements }) =>
      numberOfMeasurements === 0
        ? NO_MEASUREMENTS_INTERVAL_LABEL
        : value.toString(),
  );

export const toTimeIntervals = groupedValues =>
  groupedValues.map(({ interval, numberOfMissingDays }) => ({
    label: interval,
    info: numberOfMissingDays
      ? `${numberOfMissingDays} ${translate(
          'dashboard.statusCard.monthLabels.daysMissing',
        )}.`
      : null,
  }));

export const calculateEndDateAfterPagination = (
  pagerType,
  pagerEndDate,
  interval,
  earlieastMeasurementDate,
  lastestMeasurementDate,
) => {
  const addIntervalTransformers = {
    [TIME_INTERVAL.WEEKLY_INTERVALS]: plusWeeks,
    [TIME_INTERVAL.MONTHLY_INTERVALS]: plusMonths,
    [TIME_INTERVAL.QUARTERLY_INTERVALS]: plusQuarters,
  };

  const addIntervalAmountByPager = {
    [PAGER_TYPE.NEXT]: 1,
    [PAGER_TYPE.SUPER_NEXT]: NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS,
    [PAGER_TYPE.PREV]: -1,
    [PAGER_TYPE.SUPER_PREV]: -NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS,
  };

  const endOfInterval = {
    [TIME_INTERVAL.WEEKLY_INTERVALS]: toEndOfISOWeek,
    [TIME_INTERVAL.MONTHLY_INTERVALS]: toEndOfMonth,
    [TIME_INTERVAL.QUARTERLY_INTERVALS]: toEndOfQuarter,
  };

  const newPagerEndDate = addIntervalTransformers[interval](
    pagerEndDate,
    addIntervalAmountByPager[pagerType],
  );

  const endDateOffsetFromFirstDate = addIntervalTransformers[interval](
    earlieastMeasurementDate,
    NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS - 1,
  );

  const isForwardMoving =
    pagerType === PAGER_TYPE.NEXT || pagerType === PAGER_TYPE.SUPER_NEXT;

  const isBackWardMoving =
    pagerType === PAGER_TYPE.PREV || pagerType === PAGER_TYPE.SUPER_PREV;

  if (isForwardMoving && isAfter(newPagerEndDate, lastestMeasurementDate))
    return lastestMeasurementDate.toJSDate();
  if (isBackWardMoving && isBefore(newPagerEndDate, endDateOffsetFromFirstDate))
    return endDateOffsetFromFirstDate.toJSDate();

  return endOfInterval[interval](newPagerEndDate).toJSDate();
};

export const isLastInterval = (interval, endDate, lastMeasurementDate) => {
  const endInterval = toInterval(endDate, interval);
  const lastInterval = toInterval(lastMeasurementDate, interval);
  return (
    isEqualInterval(endInterval, lastInterval) ||
    isAfterInterval(endInterval, lastInterval)
  );
};

export const isFirstInterval = (interval, firstDate, firstMeasurementDate) => {
  const startInterval = toInterval(firstDate, interval);
  const firstInterval = toInterval(firstMeasurementDate, interval);

  const isEqual = isEqualInterval(startInterval, firstInterval);
  const isBefore = isBeforeInterval(startInterval, firstInterval);

  return isEqual || isBefore;
};

export const calculateHypoRisk = measurements => {
  const lbgi = calculateLowBloodGlucoseIndex(measurements);

  return {
    lbgi: roundToNDecimalPlaces(lbgi, 1),
    numberOfMeasurements: measurements.length,
  };
};

export const calculateHypoRiskForIntervals = intervals =>
  intervals.map(interval => ({
    ...calculateHypoRisk(interval.measurements),
    conditionsMet: interval.conditionsMet,
  }));

export const isHypoRiskLow = lbgi =>
  lbgi <= HYPO_RISK_THRESHOLDS.MEDIUM && lbgi >= 0;
export const isHypoRiskMedium = lbgi =>
  lbgi <= HYPO_RISK_THRESHOLDS.HIGH && lbgi > HYPO_RISK_THRESHOLDS.MEDIUM;
export const isHypoRiskHigh = lbgi => lbgi > HYPO_RISK_THRESHOLDS.HIGH;

export const calculateHypoRiskColor = (lbgi, numberOfMeasurements) => {
  if (numberOfMeasurements === 0 || isNil(lbgi)) {
    return TRAFFIC_LIGHT_COLORS.GRAY;
  }

  if (isHypoRiskLow(lbgi)) {
    return TRAFFIC_LIGHT_COLORS.GREEN;
  } else if (isHypoRiskMedium(lbgi)) {
    return TRAFFIC_LIGHT_COLORS.YELLOW;
  } else if (isHypoRiskHigh(lbgi)) {
    return TRAFFIC_LIGHT_COLORS.RED;
  }

  return TRAFFIC_LIGHT_COLORS.GRAY;
};

export const calculateHypoRiskLabel = lbgi => {
  if (isHypoRiskLow(lbgi)) {
    return TRAFFIC_LIGHT_LABELS.LOW;
  } else if (isHypoRiskMedium(lbgi)) {
    return TRAFFIC_LIGHT_LABELS.MEDIUM;
  } else if (isHypoRiskHigh(lbgi)) {
    return TRAFFIC_LIGHT_LABELS.HIGH;
  }

  return TRAFFIC_LIGHT_LABELS.NO_INFO;
};

export const toHypoRiskStatus = hypoRisks =>
  hypoRisks.map(({ lbgi, numberOfMeasurements, conditionsMet }) => ({
    color: calculateHypoRiskColor(lbgi, numberOfMeasurements),
    label: conditionsMet
      ? calculateHypoRiskLabel(lbgi)
      : toTrafficLightInsufficientLabel(numberOfMeasurements),
  }));
