import { Settings } from 'luxon';

import { makeOverwrite } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import { convertISOToJsGMT } from 'src/utils';

import {
  selectMetabolicGraphData,
  selectMeanBGSD,
  selectSD1,
} from './metabolic-data.selector';
import { selectGraphStatistics } from './metabolic-statistics.selector';

const initialMockedState = {
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          date: new Date('Nov 06 2017 16:55 GMT+0000'),
          value: 130,
          afterMeal: true,
        },
        {
          date: new Date('Nov 06 2017 20:12 GMT+0000'),
          value: 79,
          beforeMeal: true,
        },
        {
          date: new Date('Nov 07 2017 16:12 GMT+0000'),
          value: 93,
          beforeMeal: true,
        },
        {
          date: new Date('Nov 07 2017 17:12 GMT+0000'),
          value: 93,
        },
        {
          date: new Date('Nov 08 2017 19:59 GMT+0000'),
          value: 50,
          afterMeal: true,
        },
        {
          date: new Date('Nov 08 2017 20:59 GMT+0000'),
          value: 50,
          beforeMeal: true,
        },
      ],
      graphStartTime: '0:00',
    },
    patientDateRange: {
      startDate: new Date('Nov 06 2017 15:55 GMT+0000'),
      endDate: new Date('Nov 09 2017 23:59 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('metabolic graph tests', () => {
  beforeAll(() => {
    Settings.defaultZoneName = 'Etc/GMT-5';
  });

  it('should select the metabolic graph data', () => {
    const expected = [
      {
        date: convertISOToJsGMT('Nov 06 2017 16:55 GMT+0000'),
        dateLabel: 'Nov 06/17',
        index: 0,
        mean: 104.5,
        meanRounded: 105,
        std: 36.062445840513924,
        stdRounded: 36,
        x: 0.24041630560342617,
        y: 0.26125,
      },
      {
        date: convertISOToJsGMT('Nov 07 2017 16:12 GMT+0000'),
        dateLabel: 'Nov 07/17',
        index: 1,
        mean: 93,
        meanRounded: 93,
        std: 0,
        stdRounded: 0,
        x: 0,
        y: 0.2325,
      },
      {
        date: convertISOToJsGMT('Nov 08 2017 19:59 GMT+0000'),
        dateLabel: 'Nov 08/17',
        index: 2,
        mean: 50,
        meanRounded: 50,
        std: 0,
        stdRounded: 0,
        x: 0,
        y: 0.125,
      },
    ];
    expect(selectMetabolicGraphData(initialMockedState)).toEqual(expected);
  });

  it('should select mean blood glucose and standard deviation', () => {
    const expected = {
      mean: 82.5,
      meanRounded: 83,
      selectedDayCount: 3,
      stdDev: 12.020815280171307,
      stdRounded: 12,
      x: 0.08013876853447538,
      y: 0.20625,
    };
    expect(selectMeanBGSD(initialMockedState)).toEqual(expected);
  });

  it('should select rx and ry values for level 1 standard deviation', () => {
    const expected = { rx: 0.11333333333333333, ry: 0.05863907968809424 };
    expect(selectSD1(initialMockedState)).toEqual(expected);
  });

  describe('selectGraphStatistics test suite', () => {
    it('should select the graph statistics data', () => {
      const expected = {
        bloodGlucose: {
          mean: 83,
          meanAfterMeal: 90,
          meanBeforeMeal: 74,
          stdDev: 30,
          stdDevMeanRatio: 37,
        },
        indexes: { hbgi: '0.1', lbgi: '8.7' },
        tests: {
          numberOfTests: 6,
          testsPerDay: '1.5',
          testsPerMeasuredDay: '2.0',
        },
      };
      expect(selectGraphStatistics(initialMockedState)).toEqual(expected);
    });

    it('should get placeholder value for standard deviation and standard deviation mean ratio when there are no BG measurements', () => {
      const expected = {
        bloodGlucose: {
          mean: 0,
          meanAfterMeal: 0,
          meanBeforeMeal: 0,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
          stdDevMeanRatio: EMPTY_VALUE_PLACEHOLDER,
        },
        indexes: {
          hbgi: EMPTY_VALUE_PLACEHOLDER,
          lbgi: EMPTY_VALUE_PLACEHOLDER,
        },
        tests: {
          numberOfTests: 0,
          testsPerDay: '0.0',
          testsPerMeasuredDay: 'NaN', // TODO: make this 0 or "-" when there are no measurements?
        },
      };
      const mockedState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });
      expect(selectGraphStatistics(mockedState)).toEqual(expected);
    });
  });
});
