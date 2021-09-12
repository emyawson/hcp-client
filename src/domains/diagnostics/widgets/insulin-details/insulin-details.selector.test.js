import { append } from 'ramda';

import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';

import { insulinDetailsConnector } from './insulin-details.selector';

const acceptableDate = convertISOToJsGMT('2018-03-11T00:00:00.000Z');
const unacceptableDate = convertISOToJsGMT('2018-03-09T00:00:00.000Z');
const acceptableRegisterTypes = ['BolusTotal', 'BolusPlusBasalTotal'];
const unacceptableRegisterTypes = ['Bolus'];

const initialMockedState = {
  ui: {
    patientDateRange: {
      firstMeasurementDate: convertISOToJsGMT('2010-01-01T00:00:00.000Z'),
      lastMeasurementDate: convertISOToJsGMT('2018-03-23T23:00:00.000Z'),
      startDate: convertISOToJsGMT('2018-03-10T00:00:00.000Z'),
      endDate: convertISOToJsGMT('2018-03-23T23:59:59.999Z'),
    },
    patientDashboard: {
      insulin: {
        basals: [
          {
            date: convertISOToJsGMT('2018-03-10T00:00:00.000Z'),
            cbrf: 0.35,
            profile: '2',
            remark: 'dur 0:07 h',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: '70%',
            tbrinc: null,
          },
          {
            date: convertISOToJsGMT('2018-03-10T00:07:00.000Z'),
            cbrf: 0,
            profile: '1',
            remark: 'TBR End',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: convertISOToJsGMT('2018-03-10T00:07:00.000Z'),
            cbrf: 0.5,
            profile: '2',
            remark: 'TBR End',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
        ],
        bolus: [
          {
            date: acceptableDate,
            value: 10.58,
            remark: 'Bolus+Basal Total',
            registerType: acceptableRegisterTypes[0],
            bolusType: null,
          },
          {
            date: acceptableDate,
            value: 0,
            remark: 'Bolus Total',
            registerType: acceptableRegisterTypes[1],
            bolusType: null,
          },
          {
            date: acceptableDate,
            value: 10.6,
            remark: 'Bolus+Basal Total',
            registerType: acceptableRegisterTypes[1],
            bolusType: null,
          },
        ],
      },
    },
  },
};
const overwriteMockedState = makeOverwrite(initialMockedState);

describe('insulinDetailsConnector', () => {
  describe('hasNoData', () => {
    test('returns false if we are still fetching clinical data', () => {
      const expected = false;
      const isFetchingClinicalData = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData,
          },
        },
      });

      const actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);
    });
    test('returns false if we are still fetching patient date range', () => {
      const expected = false;
      const isFetchingClinicalData = false;
      const isFetchingPatientDateRange = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData,
            isFetchingPatientDateRange,
          },
        },
      });

      const actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);
    });
    test("returns false if there are bolus of registerType 'BolusTotal' occuring between patientStartDate and patientEndDate", () => {
      const expected = false;
      const bolus = [
        {
          date: '2018-03-10T00:00:00.000Z',
          value: 10.58,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
        {
          date: '2018-03-10T00:00:00.000Z',
          value: 0,
          remark: 'Bolus Total',
          registerType: 'BolusTotal',
          bolusType: null,
        },
        {
          date: '2018-03-11T00:00:00.000Z',
          value: 10.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: null,
        },
      ];
      const isFetchingClinicalData = false;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: {
              bolus,
            },
            isFetchingClinicalData,
          },
        },
      });
      const actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);
    });
    test("returns false if there are bolus of registerType 'BolusPlusBasalTotal' occuring between patientStartDate and patientEndDate", () => {
      const expected = false;
      const bolus = [
        {
          date: '2018-03-10T00:00:00.000Z',
          value: 10.58,
          remark: 'Bolus+Basal Total',
          registerType: 'BolusPlusBasalTotal',
          bolusType: null,
        },
        {
          date: '2018-03-10T00:00:00.000Z',
          value: 0,
          remark: 'Bolus Total',
          registerType: 'BolusTotal',
          bolusType: null,
        },
        {
          date: '2018-03-11T00:00:00.000Z',
          value: 10.6,
          remark: 'Bolus',
          registerType: 'Bolus',
          bolusType: null,
        },
      ];
      const isFetchingClinicalData = false;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: {
              bolus,
            },
            isFetchingClinicalData,
          },
        },
      });
      const actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);
    });
    test("returns true only if data has been fetched AND there are no bolus of registerType 'BolusPlusBasalTotal' occuring between patientStartDate and patientEndDate AND there are no bolus of registerType 'BolusTotal' occuring between patientStartDate and patientEndDate", () => {
      let expected = true;
      let bolus = [
        {
          date: acceptableDate,
          value: 10.6,
          remark: 'Bolus',
          registerType: unacceptableRegisterTypes[0],
          bolusType: null,
        },
      ];
      let isFetchingClinicalData = false;
      let mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: {
              bolus,
            },
            isFetchingClinicalData,
          },
        },
      });
      let actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);

      expected = true;
      bolus = append(
        {
          date: unacceptableDate,
          value: 10.58,
          remark: 'Bolus+Basal Total',
          registerType: acceptableRegisterTypes[0],
          bolusType: null,
        },
        bolus,
      );

      mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: {
              bolus,
            },
          },
        },
      });
      actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);

      expected = false;
      bolus = append(
        {
          date: acceptableDate,
          value: 10.58,
          remark: 'Bolus+Basal Total',
          registerType: acceptableRegisterTypes[0],
          bolusType: null,
        },
        bolus,
      );

      mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: {
              bolus,
            },
          },
        },
      });
      actual = insulinDetailsConnector(mockState).hasNoData;
      expect(actual).toEqual(expected);
    });
  });
  describe('isLoading', () => {
    test('returns true if we are still fetching clinical data', () => {
      let expected = true;
      let isFetchingClinicalData = true;
      let mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData,
          },
        },
      });

      let actual = insulinDetailsConnector(mockState).isLoading;
      expect(actual).toEqual(expected);
    });

    test('returns true if we are still fetching patient date range', () => {
      let expected = true;
      let isFetchingClinicalData = false;
      let isFetchingPatientDateRange = true;
      let mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData,
            isFetchingPatientDateRange,
          },
        },
      });

      let actual = insulinDetailsConnector(mockState).isLoading;
      expect(actual).toEqual(expected);
    });

    test('return false if we are done fetching clinical data and patient date range', () => {
      const expected = false;
      const isFetchingPatientDateRange = false;
      const isFetchingClinicalData = false;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData,
            isFetchingPatientDateRange,
          },
        },
      });

      let actual = insulinDetailsConnector(mockState).isLoading;
      expect(actual).toEqual(expected);
    });
  });
});
