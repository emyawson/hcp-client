import { makeOverwrite } from 'src/domains/diagnostics/utils';
import {
  BASAL_RATE_PLUS_BOLUS,
  BOLUS_TYPE_ICONS,
} from 'src/domains/diagnostics/scenes/graphs';

import { insulinPumpConnector } from './insulin-pump.selector';
import { EMPTY_ICON } from './insulin-pump.constant';

const initialMockedState = {
  ui: {
    patientDashboard: {
      insulin: {
        basals: [],
        bolus: [
          {
            date: new Date('Feb 01 2018 00:00:00 GMT+0000'),
            value: 2.3,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 06 2017 00:00:00 GMT+0000'),
            value: 8.4,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 06 2017 16:12:33 GMT+0000'),
            value: 3.1,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: new Date('Nov 06 2017 18:12:33 GMT+0000'),
            value: 6.4,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'scr',
          },
          {
            date: new Date('Nov 06 2017 20:12:53 GMT+0000'),
            value: 17.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 07 2017 00:00:00 GMT+0000'),
            value: 10.4,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 07 2017 11:12:53 GMT+0000'),
            value: 2.3,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'ext',
          },
          {
            date: new Date('Nov 07 2017 20:12:53 GMT+0000'),
            value: 14.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 08 2017 16:12:53 GMT+0000'),
            value: 1.4,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'mul',
          },
          {
            date: new Date('Nov 08 2017 00:00:00 GMT+0000'),
            value: 11.4,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Nov 08 2017 20:12:53 GMT+0000'),
            value: 19.2,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
        ],
      },
    },
    patientDateRange: {
      startDate: new Date('Nov 03 2017 15:55:53 GMT+0000'),
      endDate: new Date('Nov 09 2017 23:59:33 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('insulinPumpConnector', () => {
  describe('groups bolus data by dates', () => {
    test('returns 3 groups given bolus data in 3 distinct days', () => {
      const expected = 3;
      const actual = insulinPumpConnector(initialMockedState).daysData;
      expect(actual.length).toEqual(expected);
    });
    test('sorts the group by days in ascending order', () => {
      const expected = [
        'Tuesday, Nov 7, 2017',
        'Wednesday, Nov 8, 2017',
        'Thursday, Nov 9, 2017',
      ];
      const bolus = [
        {
          date: new Date('Nov 08 2017 6:12:53 GMT+0000'),
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
        {
          date: new Date('Nov 07 2017 6:12:53 GMT+0000'),
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
        {
          date: new Date('Nov 09 2017 6:12:53 GMT+0000'),
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(x => x.date);
      expect(actual).toEqual(expected);
    });
    test('filters out invalid date', () => {
      const expected = 1;
      const bolus = [
        {
          date: new Date('Nov 08 2017 16:12:53 GMT+0000'),
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
        {
          date: '2018',
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData;
      expect(actual.length).toEqual(expected);
    });
    test('group should have a date when there only a bolus-plus-basal-total', () => {
      const expected = ['Wednesday, Nov 8, 2017'];
      const bolus = [
        {
          date: new Date('Nov 08 2017 16:12:53 GMT+0000'),
          value: 17.6,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(x => x.date);
      expect(actual).toEqual(expected);
    });
    test('when there is no boluses data returns one empty bolus', () => {
      const expected = [
        [
          {
            bolusValue: '0',
            bolusRemark: '',
            bolusRegisterType: '',
            bolusType: '',
            date: null,
            time: '',
            types: [EMPTY_ICON],
          },
        ],
      ];
      const bolus = [
        {
          date: new Date('Nov 08 2017 16:12:53 GMT+0000'),
          value: 17.6,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(
        x => x.boluses,
      );
      expect(actual).toEqual(expected);
    });
  });
  describe('groups dates', () => {
    test('are in the expected value and format', () => {
      const expected = [
        'Monday, Nov 6, 2017',
        'Tuesday, Nov 7, 2017',
        'Wednesday, Nov 8, 2017',
      ];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.date,
      );
      expect(actual).toEqual(expected);
    });
    test('accounts for timezone', () => {
      const expected = ['Monday, Nov 6, 2017'];
      const bolus = [
        {
          date: new Date('Nov 07 2017 2:12:53 GMT+0500'),
          value: 1.4,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(x => x.date);
      expect(actual).toEqual(expected);
    });
  });
  describe("day's total bolus total", () => {
    test('corresponds to the bolus total from the bolus data', () => {
      const expected = [8.4, 10.4, 11.4];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.daysTotal.bolusTotal,
      );
      expect(actual).toEqual(expected);
    });
    test('handles having two bolus total in a day by using the bigger one', () => {
      const expected = [10.4];
      const bolus = [
        {
          date: new Date('Nov 06 2017 00:00:00 GMT+0000'),
          value: 8.4,
          remark: 'Bolus Total',
          registerType: 'BolusTotal',
          bolusType: null,
        },
        {
          date: new Date('Nov 06 2017 00:00:00 GMT+0000'),
          value: 10.4,
          remark: 'Bolus Total',
          registerType: 'BolusTotal',
          bolusType: null,
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(
        x => x.daysTotal.bolusTotal,
      );
      expect(actual).toEqual(expected);
    });
  });
  describe("day's total comment", () => {
    test('comment text corresponds to the bolus-basil-total from the bolus data', () => {
      const expected = ['17.6 U', '14.6 U', '19.2 U'];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.daysTotal.comment.text,
      );
      expect(actual).toEqual(expected);
    });
    test('handles having two bolus total in a day uses the bigger one', () => {
      const expected = ['21.6 U'];
      const bolus = [
        {
          date: new Date('Nov 06 2017 20:12:53 GMT+0000'),
          value: 17.6,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
        {
          date: new Date('Nov 06 2017 20:12:53 GMT+0000'),
          value: 21.6,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(
        x => x.daysTotal.comment.text,
      );
      expect(actual).toEqual(expected);
    });
    test('has the basils rate plus bolus icons', () => {
      const expected = [
        [BASAL_RATE_PLUS_BOLUS],
        [BASAL_RATE_PLUS_BOLUS],
        [BASAL_RATE_PLUS_BOLUS],
      ];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.daysTotal.comment.types,
      );
      expect(actual).toEqual(expected);
    });
  });
  describe('groups boluses', () => {
    test('only has boluses', () => {
      const expected = [2, 1, 1];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.boluses.length,
      );
      expect(actual).toEqual(expected);
    });
    describe('time', () => {
      test('has the expected value and format', () => {
        const expected = [['16:12', '18:12'], ['11:12'], ['16:12']];
        const actual = insulinPumpConnector(initialMockedState).daysData.map(
          x => x.boluses.map(bolus => bolus.time),
        );
        expect(actual).toEqual(expected);
      });
      test('boluses are sorted acs by time', () => {
        const expected = [['15:12', '20:12']];
        const bolus = [
          {
            date: new Date('Nov 06 2017 20:12:53 GMT+0000'),
            value: 17.6,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: new Date('Nov 06 2017 15:12:53 GMT+0000'),
            value: 21.6,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
        ];
        const mockState = overwriteMockedState({
          ui: {
            patientDashboard: {
              insulin: { bolus },
            },
          },
        });
        const actual = insulinPumpConnector(mockState).daysData.map(x =>
          x.boluses.map(bolus => bolus.time),
        );
        expect(actual).toEqual(expected);
      });
    });
    describe('bolus value', () => {
      test('has the expected value', () => {
        const expected = [[3.1, 6.4], [2.3], [1.4]];
        const actual = insulinPumpConnector(initialMockedState).daysData.map(
          x => x.boluses.map(bolus => bolus.bolusValue),
        );
        expect(actual).toEqual(expected);
      });
    });
    describe('types', () => {
      test('has the corresponding bolus type', () => {
        const expected = [
          [[BOLUS_TYPE_ICONS.STANDARD], [BOLUS_TYPE_ICONS.QUICK]],
          [[BOLUS_TYPE_ICONS.EXTENDED]],
          [[BOLUS_TYPE_ICONS.MULTIWAVE]],
        ];
        const actual = insulinPumpConnector(initialMockedState).daysData.map(
          x => x.boluses.map(bolus => bolus.types),
        );
        expect(actual).toEqual(expected);
      });
    });
  });
  describe('groups isWeekend', () => {
    test('indicates its not weekend when data is not sat or sun', () => {
      const expected = [false, false, false];
      const actual = insulinPumpConnector(initialMockedState).daysData.map(
        x => x.isWeekend,
      );
      expect(actual).toEqual(expected);
    });
    test('indicates is weekend when data is sat or sun', () => {
      const expected = [true, true];
      const bolus = [
        {
          date: new Date('Nov 05 2017 20:12:53 GMT+0000'),
          value: 17.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
        {
          date: new Date('Nov 04 2017 15:12:53 GMT+0000'),
          value: 21.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });
      const actual = insulinPumpConnector(mockState).daysData.map(
        x => x.isWeekend,
      );
      expect(actual).toEqual(expected);
    });
  });
  describe('has data', () => {
    test('is false when there is no boluses data and clinical data and patient date range are fetched', () => {
      const expected = false;
      const bolus = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
            isFetchingClinicalData: false,
            isFetchingPatientDateRange: false,
          },
        },
      });
      const actual = insulinPumpConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    test('is true when there are no boluses data and clinical data is fetching', () => {
      const expected = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: true,
          },
        },
      });
      const actual = insulinPumpConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    test('is true when there are no boluses data and patient date range is fetching', () => {
      const expected = true;
      const bolus = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
            isFetchingClinicalData: false,
            isFetchingPatientDateRange: true,
          },
        },
      });
      const actual = insulinPumpConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    test('is true when there are boluses data and clinical data is fetched', () => {
      const expected = true;
      const bolus = [
        {
          date: new Date('Nov 05 2017 20:12:53 GMT+0000'),
          value: 17.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
        {
          date: new Date('Nov 04 2017 15:12:53 GMT+0000'),
          value: 21.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: 'Std',
        },
      ];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
            isFetchingClinicalData: false,
          },
        },
      });
      const actual = insulinPumpConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
  });
});
