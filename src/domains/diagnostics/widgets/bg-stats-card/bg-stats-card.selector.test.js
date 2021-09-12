import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import {
  tests5Day1,
  tests4Day2,
  tests6Day5,
  tests6Day6,
  tests6Day7,
} from 'src/domains/diagnostics/scenes/graphs/measurements.mock';
import { BLOOD_GLUCOSE_UNITS } from 'src/domains/diagnostics/dashboards/patient-dashboard/store/patient-dashboard.constant';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { BGStatsCardConnector } from './bg-stats-card.selector';

const initialMockedState = {
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: BLOOD_GLUCOSE_UNITS.MG_PER_DL,
      glucoseMeasurements: [
        {
          date: convertISOToJsGMT('2018-01-01 07:30:00 GMT+0000'),
          value: 130,
        },
        {
          date: convertISOToJsGMT('2018-01-01 07:30:00 GMT+0000'),
          value: 79,
        },
        {
          date: convertISOToJsGMT('2018-01-01 07:30:00 GMT+0000'),
          value: 93,
        },
        {
          date: convertISOToJsGMT('2018-01-02 07:30:00 GMT+0000'),
          value: 50,
        },
      ],
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('2018-01-01 07:30:00 GMT+0000'),
      endDate: convertISOToJsGMT('2018-01-07 07:30:00 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('BG Stats Card Selector', () => {
  describe('bloodGlucoseMean test suite ', () => {
    it('Should correctly calculate and return the expected value for bloodGlucoseMean', () => {
      const expected = 88;
      const actual = BGStatsCardConnector(initialMockedState).bloodGlucoseMean;
      expect(actual).toBeCloseTo(expected);
    });
    it('Should return a dash when there are no measurements', () => {
      const expected = EMPTY_VALUE_PLACEHOLDER;

      const mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });
      const actual = BGStatsCardConnector(mockState).bloodGlucoseMean;
      expect(actual).toBe(expected);
    });
  });
  describe('bloodGlucoseStandardDeviation test suite', () => {
    it("should return bloodGlucoseStandardDeviation equal to '-' for 1 or less measurements", () => {
      const expected = {
        bloodGlucoseStandardDeviation: EMPTY_VALUE_PLACEHOLDER,
      };

      let mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });

      let actual = BGStatsCardConnector(mockState);

      expect(actual).toEqual(expect.objectContaining(expected));

      mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            glucoseMeasurements: [
              initialMockedState.ui.patientDashboard.glucoseMeasurements[0],
            ],
          },
        },
      });
      actual = BGStatsCardConnector(mockState);

      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });
  describe('testsPerDay test suite', () => {
    it('calculates tests per day average over the time span between first and last measurement', () => {
      const expected = {
        testsPerDay: 3.9,
      };
      const glucoseMeasurements = [
        ...tests5Day1,
        ...tests4Day2,
        // zero tests on day 3
        // zero tests on day 4
        ...tests6Day5,
        ...tests6Day6,
        ...tests6Day7,
      ];

      const mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements } },
      });

      const actual = BGStatsCardConnector(mockState);
      expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('returns - when there are no measurements between first and last measurement', () => {
      const expected = {
        testsPerDay: '-',
      };

      const mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });

      const actual = BGStatsCardConnector(mockState);
      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });
  describe('numberOfTests test suite ', () => {
    it('Should correctly get the number of total tests', () => {
      const glucoseMeasurements = [
        ...tests5Day1,
        ...tests4Day2,
        ...tests6Day5,
        ...tests6Day6,
        ...tests6Day7,
      ];

      let expected = {
        numberOfTests: glucoseMeasurements.length,
      };
      let mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements } },
      });

      let actual = BGStatsCardConnector(mockState);
      expect(actual).toEqual(expect.objectContaining(expected));

      expected = { numberOfTests: 0 };
      mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });
      actual = BGStatsCardConnector(mockState);
      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });
  describe('bgMeasurementUnit test suite ', () => {
    it('should select Measurement units', () => {
      const expected = BLOOD_GLUCOSE_UNITS.MG_PER_DL;
      const actual = BGStatsCardConnector(initialMockedState).bgMeasurementUnit;
      expect(actual).toEqual(expected);
    });
  });
  describe('isLoading test suite ', () => {
    it('Should correctly select the value for isFetchingClinicalData', () => {
      let expected = true;
      let mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: true,
          },
        },
      });
      let actual = BGStatsCardConnector(mockState).isLoading;
      expect(actual).toEqual(expected);

      mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: false,
          },
        },
      });
      expected = false;
      actual = BGStatsCardConnector(mockState).isLoading;
      expect(actual).toEqual(expected);
    });
  });
  describe('has data', () => {
    it('is false when there is no glucose measurement and clinical data is fetched', () => {
      const expected = false;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            glucoseMeasurements: [],
            isFetchingClinicalData: false,
          },
        },
      });
      const actual = BGStatsCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    it('is true when there is no glucose measurement and clinical data is fetching', () => {
      const expected = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            glucoseMeasurements: [],
            isFetchingClinicalData: true,
          },
        },
      });
      const actual = BGStatsCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    it('is true when there are glucose measurements and data is fetched', () => {
      const expected = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: false,
          },
        },
      });
      const actual = BGStatsCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
  });
});
