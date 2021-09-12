import { makeOverwrite } from 'src/domains/diagnostics/utils';

import { insulinConnector } from './insulin.selector';

const initialMockedState = {
  ui: {
    patientDashboard: {
      glucoseMeasurements: [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          carbohydrates: 10,
          date: '2018-03-13T22:34:00.000Z',
          hypoSymptoms: false,
          value: 101,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: null,
          date: '2018-03-14T19:15:00.000Z',
          hypoSymptoms: false,
          value: 301,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          carbohydrates: 15,
          date: '2018-03-14T19:51:00.000Z',
          hypoSymptoms: false,
          value: 302,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          carbohydrates: 50,
          date: '2018-03-14T19:54:00.000Z',
          hypoSymptoms: false,
          value: 50,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: false,
          carbohydrates: 2,
          date: '2018-03-14T19:56:00.000Z',
          hypoSymptoms: false,
          value: 112,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: 1,
          date: '2018-03-14T19:58:00.000Z',
          hypoSymptoms: false,
          value: 122,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: null,
          date: '2018-03-14T21:28:00.000Z',
          hypoSymptoms: false,
          value: 90,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: 1,
          date: '2018-03-16T16:17:00.000Z',
          hypoSymptoms: false,
          value: 96,
          control: false,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: null,
          date: '2018-03-21T15:16:00.000Z',
          hypoSymptoms: false,
          value: 114,
          control: false,
        },
      ],
      isFetchingClinicalData: false,
      insulin: {
        basals: [
          {
            date: '2018-03-10T00:00:00.000Z',
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
            date: '2018-03-11T10:00:00.000Z',
            cbrf: 0.4,
            profile: '2',
            remark: null,
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-13T00:00:00.000Z',
            cbrf: 0.5,
            profile: '2',
            remark: null,
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-13T00:03:00.000Z',
            cbrf: 0,
            profile: '1',
            remark: 'Stop',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-13T19:46:00.000Z',
            cbrf: 0,
            profile: '1',
            remark: 'power up',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-13T19:53:00.000Z',
            cbrf: 0.4,
            profile: '2',
            remark: 'Run',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-13T22:54:00.000Z',
            cbrf: 0.4,
            profile: '2',
            remark: 'Run',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-14T19:09:00.000Z',
            cbrf: 1.1,
            profile: '1',
            remark: 'Run',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-14T19:09:00.000Z',
            cbrf: 0,
            profile: '1',
            remark: 'time / date set (time shift back)',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-14T20:04:00.000Z',
            cbrf: 0.4,
            profile: '2',
            remark: 'TBR End',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-14T20:05:00.000Z',
            cbrf: 0.48,
            profile: '2',
            remark: 'dur 0:15 h',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: '120%',
          },
          {
            date: '2018-03-15T00:00:00.000Z',
            cbrf: 0.5,
            profile: '2',
            remark: null,
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-21T15:01:00.000Z',
            cbrf: 0,
            profile: '1',
            remark: 'time / date set (time shift back)',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
          {
            date: '2018-03-21T16:00:00.000Z',
            cbrf: 0,
            profile: '1',
            remark: 'time / date set (time shift back)',
            virtual: null,
            tsb: null,
            tsbDiffMins: null,
            tbrdec: null,
            tbrinc: null,
          },
        ],
        bolus: [
          {
            date: '2018-03-10T00:00:00.000Z',
            value: 10.58,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-11T00:00:00.000Z',
            value: 10.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-12T00:00:00.000Z',
            value: 11.85,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-14T00:00:00.000Z',
            value: 6.84,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: '2018-03-14T19:18:00.000Z',
            value: 0.04,
            remark: ' 0:04 h',
            registerType: 'Bolus',
            bolusType: 'Ext',
          },
          {
            date: '2018-03-15T00:00:00.000Z',
            value: 10.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-15T00:00:00.000Z',
            value: 0,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: '2018-03-16T00:00:00.000Z',
            value: 5,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-16T00:00:00.000Z',
            value: 0,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: '2018-03-21T00:00:00.000Z',
            value: 1,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: '2018-03-22T16:13:00.000Z',
            value: 0.5,
            remark: null,
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: '2018-03-22T16:14:00.000Z',
            value: 1.5,
            remark: null,
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: '2018-03-23T00:00:00.000Z',
            value: 1.3,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
        ],
      },
    },
    patientDateRange: {
      firstMeasurementDate: new Date('2010-01-01T00:00:00.000Z'),
      lastMeasurementDate: new Date('2018-03-23T23:00:00.000Z'),
      startDate: '2018-03-10T00:00:00.000Z',
      endDate: '2018-03-23T23:59:59.999Z',
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('insulinConnector', () => {
  describe('hasData', () => {
    test('is true until data has been fetched, even if there are no basals or bolus', () => {
      const expected = true;
      const bolus = [];
      const basals = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus, basals },
            isFetchingClinicalData: true,
          },
        },
      });

      const actual = insulinConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });

    test('is false if data has been fetched and there are no basals or bolus', () => {
      const expected = false;
      const bolus = [];
      const basals = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus, basals },
          },
        },
      });

      const actual = insulinConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });

    test('is true if data has been fetched and there is bolus, even if there are no basals', () => {
      const expected = true;
      const basals = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { basals },
          },
        },
      });

      const actual = insulinConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });

    test('is true if data has been fetched and there are basals, even if there is no bolus', () => {
      const expected = true;
      const bolus = [];
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            insulin: { bolus },
          },
        },
      });

      const actual = insulinConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
  });
  describe('isLoading', () => {
    test('should correctly select the value for isFetchingClinicalData', () => {
      let expected = false;
      let actual = insulinConnector(initialMockedState).isLoading;
      expect(actual).toEqual(expected);

      let mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: true,
          },
        },
      });

      expected = true;
      actual = insulinConnector(mockState).isLoading;
      expect(actual).toEqual(expected);
    });
  });
});
