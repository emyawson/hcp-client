import { pick } from 'ramda';

import { makeOverwrite } from 'src/domains/diagnostics/utils';
import { TIME_INTERVAL } from 'src/domains/diagnostics/constants';

import {
  bloodGlucoseOverviewConnector,
  calculateAndFormatVariability,
  selectDayInHalfTimeIntervals,
  selectFormattedDateRanges,
  selectHypoglycaemia,
  selectMeanBloodGlucoseStatistics,
  selectVerifiedGroupMeasurements,
} from './blood-glucose-overview.selector';
import {
  TRAFFIC_LIGHT_COLORS,
  TRAFFIC_LIGHT_LABELS,
} from './blood-glucose-overview.constants';
import {
  lowVariabilityGlucoseMeasurements,
  mediumVariabilityGlucoseMeasurements,
  highVariabilityGlucoseMeasurements,
  hypoRedGlucoseMeasurements,
  evenDistributedDay1,
  evenDistributedDay2,
  evenDistributedDay3,
  evenDistributedDay4,
  evenDistributedDay5,
  evenDistributedDay6,
  evenDistributedDay7,
  unEvenDistributedDay1,
  unEvenDistributedDay2,
} from './blood-glucose-overview.mock';
import { selectAverageTestsPerDay } from './blood-glucose-overview.selector';

const initialMockedState = {
  ui: {
    patientDashboard: {
      bgOverview: {
        endDate: new Date('Tue Jan 30 2018 11:59:00 GMT+0000'),
        timeInterval: TIME_INTERVAL.WEEKLY_INTERVALS,
      },

      glucoseMeasurements: [
        { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 80 },
        { date: new Date('Tue Jan 10 2018 16:40:00 GMT+0000'), value: 80 },
        { date: new Date('Tue Jan 10 2018 16:41:00 GMT+0000'), value: 100 },
        { date: new Date('Tue Jan 10 2018 16:42:00 GMT+0000'), value: 180 },
        { date: new Date('Tue Jan 20 2018 16:40:00 GMT+0000'), value: 80 },
        { date: new Date('Tue Jan 20 2018 16:41:00 GMT+0000'), value: 100 },
        { date: new Date('Tue Jan 20 2018 16:42:00 GMT+0000'), value: 280 },
      ],
    },
    patientDateRange: {
      firstMeasurementDate: new Date('Jul 30 2017 5:59:00 GMT+0000'),
      lastMeasurementDate: new Date('Feb 10 2018 12:59:00 GMT+0000'),
    },
  },
  stripDelivery: {
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
    thresholds: {
      hyper: {
        preIdealInterval: 130,
      },
      hypo: {
        preIdealInterval: 90,
      },
      warning: {
        preIdealInterval: 100,
      },
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

const noDataTraficLight = {
  color: TRAFFIC_LIGHT_COLORS.GRAY,
  label: TRAFFIC_LIGHT_LABELS.NO_INFO,
};

const emptyInterval = {
  interval: {},
  measurements: [],
  conditionsMet: false,
};

describe('bloodGlucoseOverviewConnector', () => {
  describe('dateRanges', () => {
    it('creates partial interval at the end if the last measurement is within the last interval', () => {
      const expected = [
        {
          label: { bottom: '2017', top: 'DEC 25 - DEC 31' },
        },
        {
          label: { bottom: '2018', top: 'JAN 01 - JAN 07' },
        },
        {
          label: { bottom: '2018', top: 'JAN 08 - JAN 14' },
        },
        {
          label: { bottom: '2018', top: 'JAN 15 - JAN 21' },
        },
        {
          label: { bottom: '2018', top: 'JAN 22 - JAN 28' },
        },
        {
          label: { bottom: '2018', top: 'JAN 29 - FEB 01' },
        },
      ];
      const lastMeasurementDate = new Date('Feb 1 2018 12:59:00 GMT+0000');

      const mockedState = overwriteMockedState({
        ui: { patientDateRange: { lastMeasurementDate } },
      });

      const actual = bloodGlucoseOverviewConnector(
        mockedState,
      ).bloodGlucoseOverview.dateRanges.map(pick(['label']));

      expect(actual).toEqual(expected);
    });

    it('creates partial interval at the beginning if the first measurement is within the first interval', () => {
      const expected = [
        {
          label: { bottom: '2017', top: 'DEC 27 - DEC 31' },
        },
        {
          label: { bottom: '2018', top: 'JAN 01 - JAN 07' },
        },
        {
          label: { bottom: '2018', top: 'JAN 08 - JAN 14' },
        },
        {
          label: { bottom: '2018', top: 'JAN 15 - JAN 21' },
        },
        {
          label: { bottom: '2018', top: 'JAN 22 - JAN 28' },
        },
        {
          label: { bottom: '2018', top: 'JAN 29 - FEB 04' },
        },
      ];
      const firstMeasurementDate = new Date('Dec 27 2017 12:59:00 GMT+0000');

      const mockedState = overwriteMockedState({
        ui: { patientDateRange: { firstMeasurementDate } },
      });

      const actual = bloodGlucoseOverviewConnector(
        mockedState,
      ).bloodGlucoseOverview.dateRanges.map(pick(['label']));

      expect(actual).toEqual(expected);
    });
  });
});

describe('calculateAndFormatVariability test suite', () => {
  it('should select low, medium and high colors with N/A label', () => {
    const expected = [
      noDataTraficLight,
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },

      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      noDataTraficLight,
      noDataTraficLight,
    ];

    const data = [
      emptyInterval,
      {
        interval: {},
        measurements: [
          { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 80 },
        ],
        conditionsMet: false,
      },
      {
        interval: {},
        measurements: [
          { date: new Date('Tue Jan 10 2018 16:40:00 GMT+0000'), value: 200 },
          { date: new Date('Tue Jan 10 2018 16:41:00 GMT+0000'), value: 100 },
          { date: new Date('Tue Jan 10 2018 16:42:00 GMT+0000'), value: 180 },
        ],
        conditionsMet: false,
      },
      {
        interval: {},
        measurements: [
          { date: new Date('Tue Jan 20 2018 16:40:00 GMT+0000'), value: 80 },
          { date: new Date('Tue Jan 20 2018 16:41:00 GMT+0000'), value: 100 },
          { date: new Date('Tue Jan 20 2018 16:42:00 GMT+0000'), value: 280 },
        ],
        conditionsMet: false,
      },

      emptyInterval,
      emptyInterval,
    ];

    expect(calculateAndFormatVariability(data)).toEqual(expected);
  });
  it('should select low traffic light options', () => {
    const expected = [
      noDataTraficLight,
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.LOW,
      },
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
    ];

    const data = [
      emptyInterval,
      {
        interval: {},
        measurements: lowVariabilityGlucoseMeasurements,
        conditionsMet: true,
      },
      emptyInterval,
      emptyInterval,
      emptyInterval,
      emptyInterval,
    ];

    expect(calculateAndFormatVariability(data)).toEqual(expected);
  });

  it('should select medium traffic light options', () => {
    const expected = [
      noDataTraficLight,
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.MEDIUM,
      },
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
    ];

    const data = [
      emptyInterval,
      {
        interval: {},
        measurements: mediumVariabilityGlucoseMeasurements,
        conditionsMet: true,
      },
      emptyInterval,
      emptyInterval,
      emptyInterval,
      emptyInterval,
    ];

    expect(calculateAndFormatVariability(data)).toEqual(expected);
  });

  it('should select high traffic light options', () => {
    const expected = [
      noDataTraficLight,
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.HIGH,
      },
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
      noDataTraficLight,
    ];

    const data = [
      emptyInterval,
      {
        interval: {},
        measurements: highVariabilityGlucoseMeasurements,
        conditionsMet: true,
      },
      emptyInterval,
      emptyInterval,
      emptyInterval,
      emptyInterval,
    ];

    expect(calculateAndFormatVariability(data)).toEqual(expected);
  });
});

describe('selectTestsPerDayTimeInterval, selector', () => {
  it('returns arrays of avg of tests per day of each the interval', () => {
    const glucoseMeasurements = [
      {
        data: {},
        date: new Date('Sun Jan 1 2017 16:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Sun Dec 31 2017 16:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Sun Dec 31 2017 20:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Mon Jan 1 2018 16:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Tue Jan 2 2018 10:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Tue Jan 2 2018 20:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Sun Jan 7 2018 16:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Sun Jan 7 2018 9:40:00 GMT+0000'),
        value: 90,
      },
      {
        data: {},
        date: new Date('Mon Jan 8 2018 16:40:00 GMT+0000'),
        value: 90,
      },
    ];

    const mockedState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements } },
    });

    const expected = ['0.3', '0.9', '0.1', '-', '-', '-'];
    const actual = selectAverageTestsPerDay(mockedState);
    expect(actual).toEqual(expected);
  });
  it('returns an empty array of empty interval label when there are no measurements', () => {
    const glucoseMeasurements = [];
    const mockedState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements } },
    });
    const expected = ['-', '-', '-', '-', '-', '-'];
    const actual = selectAverageTestsPerDay(mockedState);
    expect(actual).toEqual(expected);
  });
});

describe('selectMeanBloodGlucoseStatistics', () => {
  it('should select mean blood glucose value with N/A flag', () => {
    const glucoseMeasurements = [
      { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 85 },
      { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 90 },
      { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 95 },
    ];

    const mockedState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements } },
    });

    const expected = ['-', '90', '-', '-', '-', '-'];
    const actual = selectMeanBloodGlucoseStatistics(mockedState);

    expect(actual).toEqual(expected);
  });

  it('should select mean blood glucose value without N/A flag', () => {
    const expected = ['-', '73', '-', '-', '-', '-'];

    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: { glucoseMeasurements: hypoRedGlucoseMeasurements },
      },
    });

    const actual = selectMeanBloodGlucoseStatistics(mockedState);

    expect(actual).toEqual(expected);
  });
});

describe('selectHypoglycaemia test suite', () => {
  it('should select the correct value from measurements', () => {
    const expected = ['-', '1', '1', '1', '-', '-'];
    expect(selectHypoglycaemia(initialMockedState)).toEqual(expected);
  });
});

describe('selectFormattedDateRanges test suite', () => {
  it('should select weekly date ranges', () => {
    const expected = [
      {
        info: '7 days of information are missing.',
        label: { bottom: '2017', top: 'DEC 25 - DEC 31' },
      },
      {
        info: '6 days of information are missing.',
        label: { bottom: '2018', top: 'JAN 01 - JAN 07' },
      },
      {
        info: '6 days of information are missing.',
        label: { bottom: '2018', top: 'JAN 08 - JAN 14' },
      },
      {
        info: '6 days of information are missing.',
        label: { bottom: '2018', top: 'JAN 15 - JAN 21' },
      },
      {
        info: '7 days of information are missing.',
        label: { bottom: '2018', top: 'JAN 22 - JAN 28' },
      },
      {
        info: '7 days of information are missing.',
        label: { bottom: '2018', top: 'JAN 29 - FEB 04' },
      },
    ];
    expect(selectFormattedDateRanges(initialMockedState)).toEqual(expected);
  });

  it('should select monthly date ranges', () => {
    const expected = [
      {
        info: '31 days of information are missing.',
        label: { bottom: null, top: 'AUG / 2017' },
      },
      {
        info: '30 days of information are missing.',
        label: { bottom: null, top: 'SEP / 2017' },
      },
      {
        info: '31 days of information are missing.',
        label: { bottom: null, top: 'OCT / 2017' },
      },
      {
        info: '30 days of information are missing.',
        label: { bottom: null, top: 'NOV / 2017' },
      },
      {
        info: '31 days of information are missing.',
        label: { bottom: null, top: 'DEC / 2017' },
      },
      {
        info: '28 days of information are missing.',
        label: { bottom: null, top: 'JAN / 2018' },
      },
    ];

    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          bgOverview: { timeInterval: TIME_INTERVAL.MONTHLY_INTERVALS },
        },
      },
    });

    expect(selectFormattedDateRanges(mockedState)).toEqual(expected);
  });

  it('should select monthly date ranges from 6 Feb 2018', () => {
    const expected = [
      {
        info: '30 days of information are missing.',
        label: { bottom: null, top: 'SEP / 2017' },
      },
      {
        info: '31 days of information are missing.',
        label: { bottom: null, top: 'OCT / 2017' },
      },
      {
        info: '30 days of information are missing.',
        label: { bottom: null, top: 'NOV / 2017' },
      },
      {
        info: '31 days of information are missing.',
        label: { bottom: null, top: 'DEC / 2017' },
      },
      {
        info: '28 days of information are missing.',
        label: { bottom: null, top: 'JAN / 2018' },
      },
      {
        info: '28 days of information are missing.',
        label: { bottom: null, top: 'FEB / 2018' },
      },
    ];

    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          bgOverview: {
            timeInterval: TIME_INTERVAL.MONTHLY_INTERVALS,
            endDate: new Date('Tue Feb 06 2018 11:59:00'),
          },
        },
      },
    });

    expect(selectFormattedDateRanges(mockedState)).toEqual(expected);
  });

  it('should select quarterly date ranges', () => {
    const expected = [
      {
        info: '92 days of information are missing.',
        label: { bottom: null, top: 'Q4 / 2016' },
      },
      {
        info: '90 days of information are missing.',
        label: { bottom: null, top: 'Q1 / 2017' },
      },
      {
        info: '91 days of information are missing.',
        label: { bottom: null, top: 'Q2 / 2017' },
      },
      {
        info: '92 days of information are missing.',
        label: { bottom: null, top: 'Q3 / 2017' },
      },
      {
        info: '92 days of information are missing.',
        label: { bottom: null, top: 'Q4 / 2017' },
      },
      {
        info: '87 days of information are missing.',
        label: { bottom: null, top: 'Q1 / 2018' },
      },
    ];

    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          bgOverview: {
            timeInterval: TIME_INTERVAL.QUARTERLY_INTERVALS,
          },
        },
      },
    });

    expect(selectFormattedDateRanges(mockedState)).toEqual(expected);
  });
});

describe('selectVerifiedGroupMeasurements', () => {
  const intervalWithMeasurements = intervalGroup =>
    intervalGroup.measurements.length > 0;

  it('fails for an interval when there less than 28 measurements', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...evenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
          ],
        },
      },
    });

    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeFalsy();
  });

  it('passes for an interval with 28 or more measurements', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...evenDistributedDay1,
            ...evenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
            ...evenDistributedDay7,
          ],
        },
      },
    });

    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeTruthy();
  });

  it('fails for an interval with avg tests per day of less than two', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          bgOverview: {
            endDate: new Date('Tue Jan 30 2018 11:59:00 GMT+0000'),
            timeInterval: TIME_INTERVAL.MONTHLY_INTERVALS,
          },
          glucoseMeasurements: [
            ...evenDistributedDay1,
            ...evenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
            ...evenDistributedDay7,
          ],
        },
        patientDateRange: {
          firstMeasurementDate: new Date('Mar 2 2017 16:40:00 GMT+0000'),
        },
      },
    });

    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeFalsy();
  });

  it('passes for an interval with avg tests per day of equal or more than two', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...evenDistributedDay1,
            ...evenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
            {
              date: new Date('Tue Jan 6 2018 8:40:00 GMT+0000'),
              data: {},
            },
            ...evenDistributedDay7,
          ],
        },
      },
    });

    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeTruthy();
  });

  it('fails when measurements are not distributed in atleast 80% of the days evenly', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...unEvenDistributedDay1,
            ...unEvenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
            ...evenDistributedDay6,
            ...evenDistributedDay7,
          ],
        },
      },
    });
    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeFalsy();
  });

  it('passes when measurements are distributed in atleast 80% of the days evenly', () => {
    const mockedState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...unEvenDistributedDay1,
            ...evenDistributedDay2,
            ...evenDistributedDay3,
            ...evenDistributedDay4,
            ...evenDistributedDay5,
            ...evenDistributedDay6,
            ...evenDistributedDay7,
          ],
        },
      },
    });
    const intervalGroups = selectVerifiedGroupMeasurements(mockedState);
    const weekWithData = intervalGroups.find(intervalWithMeasurements);
    expect(weekWithData.conditionsMet).toBeTruthy();
  });
});

describe('selectDayInHalfTimeIntervals test suite ', () => {
  it('Should successfully return day in half time intervals', () => {
    const expected = {
      firstHalf: {
        endTime: '12:30:00',
        startTime: '01:00:00',
      },
      secondHalf: {
        endTime: '01:00:00',
        startTime: '12:30:00',
      },
    };
    expect(selectDayInHalfTimeIntervals(initialMockedState)).toEqual(expected);
  });
});
