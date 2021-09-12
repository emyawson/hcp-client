import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants.js';

import {
  DeviceDetailsConnector,
  selectPercentageOfStopEvents,
  selectBasalRateProfileChangePerWeek,
} from './device-details.selector.js';
import { insulinBasalsMock, profileChangesMock } from './insulin-basal.mock';
import { insulinBolusMock } from './insulin-bolus.mock';
import { timeIntervalsMock } from './time-intervals.mock';
import { expectedDataMock } from './expected-data.mock';

const initialMockedState = {
  patient: {
    devices: [
      {
        id: 6735,
        serialNumber: '00057305',
        lastDownloadDate: convertISOToJsGMT('2018-03-09T00:00:00.000Z'),
        deviceModel: {
          name: 'Aviva',
          materialType: {
            name: 'PUMP',
          },
        },
      },
    ],
  },
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
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
      insulin: {
        basals: insulinBasalsMock,
        bolus: insulinBolusMock,
      },
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('2018-01-01 07:30:00 GMT+0000'),
      endDate: convertISOToJsGMT('2018-04-01 07:30:00 GMT+0000'),
    },
  },
  stripDelivery: {
    timeIntervals: timeIntervalsMock,
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

describe('Device Details Selector', () => {
  it('should test the mock state against the structured selector', () => {
    const expected = expectedDataMock;
    const actual = DeviceDetailsConnector(initialMockedState);
    expect(actual).toEqual(expected);
  });

  describe('Basal Device Metrics', () => {
    describe('Stop Percentage Event', () => {
      it('should return a correct percentage number (Basal Device Stop Event %)', () => {
        const expected = 26;
        const actual = selectPercentageOfStopEvents.resultFunc(1480, 5760);
        expect(actual).toEqual(expected);
      });

      it('should return zero on division by 0', () => {
        const expected = 0;
        const actual = selectPercentageOfStopEvents.resultFunc(1480, 0);
        expect(actual).toEqual(expected);
      });

      it('should return zero on passing non-numerical args', () => {
        const expected = 0;
        const actual = selectPercentageOfStopEvents.resultFunc('a', 5760);
        expect(actual).toEqual(expected);
      });
    });

    describe('Basal Rate Profile Change Per Week', () => {
      it('should return correct calculation', () => {
        const profileChanges = 3;
        const numberOfDays = 16;
        const expected = ((profileChanges / numberOfDays) * 7).toFixed(1);
        const actual = selectBasalRateProfileChangePerWeek.resultFunc(
          profileChanges,
          numberOfDays,
        );
        expect(actual).toEqual(expected);
      });

      it('should return 0', () => {
        const profileChanges = 0;
        const numberOfDays = 16;
        const expected = '0.0';
        const actual = selectBasalRateProfileChangePerWeek.resultFunc(
          profileChanges,
          numberOfDays,
        );
        expect(actual).toEqual(expected);
      });
    });

    describe('Profile Changes', () => {
      it('should return correct number of profile changes', () => {
        const expected = 2;
        const mockState = overwriteMockedState({
          ui: { patientDashboard: { insulin: { basals: profileChangesMock } } },
        });
        const actual = DeviceDetailsConnector(mockState);
        expect(actual).toHaveProperty(
          'basalDataMetrics.profileChangeCount',
          expected,
        );
      });
    });

    describe('Days in Date Range', () => {
      it('should return correct number of days in date range', () => {
        const selectedDateRangeMock = {
          startDate: new Date('2018-03-07 07:30:00 GMT+0000'),
          endDate: new Date('2018-03-22 07:30:00 GMT+0000'),
        };
        const expected = 16;
        const mockState = overwriteMockedState({
          ui: { patientDateRange: selectedDateRangeMock },
        });
        const actual = DeviceDetailsConnector(mockState);
        expect(actual).toHaveProperty(
          'basalDataMetrics.daysinDateRange',
          expected,
        );
      });
    });

    describe('bolusStats test suite', () => {
      it('should get empty placeholder values if there are no bolus measurements', () => {
        const expected = {
          ext: EMPTY_VALUE_PLACEHOLDER,
          frequency: '0.0',
          max: EMPTY_VALUE_PLACEHOLDER,
          mean: '-',
          min: EMPTY_VALUE_PLACEHOLDER,
          mul: EMPTY_VALUE_PLACEHOLDER,
          scr: EMPTY_VALUE_PLACEHOLDER,
          std: EMPTY_VALUE_PLACEHOLDER,
          total: EMPTY_VALUE_PLACEHOLDER,
        };
        const mockState = overwriteMockedState({
          ui: { patientDashboard: { insulin: { bolus: [] } } },
        });
        const actual = DeviceDetailsConnector(mockState);
        expect(actual).toHaveProperty('bolusStats', expected);
      });
    });
  });
});
