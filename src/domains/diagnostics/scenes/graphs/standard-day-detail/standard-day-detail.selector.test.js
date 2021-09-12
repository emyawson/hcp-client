import { makeOverwrite } from 'src/domains/diagnostics/utils';
import {
  GRAPH_STANDARD_DAY,
  GRAPH_TYPE_TREND,
  GRAPH_TYPE_DETAILS,
  GRAPH_STANDARD_WEEK,
} from 'src/domains/diagnostics/scenes/graphs';

import { selectNumericalGraphStartTime } from './standard-day-detail.selector';

const mockedState = {
  stripDelivery: {
    thresholds: {
      actualHyper: {
        preIdealInterval: 240,
        postIdealInterval: 120,
        noctIdealInterval: 120,
      },
      hyper: {
        preIdealInterval: 125,
        postIdealInterval: 99,
        noctIdealInterval: 99,
      },
      hypo: {
        preIdealInterval: 60,
        postIdealInterval: 99,
        noctIdealInterval: 99,
      },
      warning: {
        preIdealInterval: 80,
        postIdealInterval: 99,
        noctIdealInterval: 99,
      },
    },
    timeIntervals: [
      {
        id: 2161,
        description: 'BEFORE_BREAKFAST',
        startTime: '06:00:00',
        endTime: '08:30:00',
        label: null,
      },
    ],
  },
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          date: new Date('Mon Nov 06 2017 16:12:33 GMT+0000'),
          value: 130,
        },
        {
          date: new Date('Mon Nov 06 2017 20:12:33 GMT+0000'),
          value: 79,
        },
        {
          date: new Date('Tue Nov 07 2017 16:12:53 GMT+0000'),
          value: 93,
        },
        {
          date: new Date('Wed Nov 08 2017 20:12:53 GMT+0000'),
          value: 50,
        },
      ],
      graphStartTime: '0:00',
      graph: GRAPH_TYPE_DETAILS,
      graphType: GRAPH_TYPE_DETAILS,
      insulin: {
        basals: [
          {
            date: new Date('Thu Feb 01 2018 00:00:00 GMT+0000'),
            cbrf: 1.1,
            profile: 1,
          },
          {
            date: new Date('Mon Nov 06 2017 16:12:33 GMT+0000'),
            cbrf: 0.7,
            profile: 1,
          },
          {
            date: new Date('Mon Nov 06 2017 20:12:53 GMT+0000'),
            cbrf: 0.9,
            profile: 1,
          },
          {
            date: new Date('Tue Nov 07 2017 16:12:53 GMT+0000'),
            cbrf: 1.1,
            profile: 1,
          },
        ],
        bolus: [
          {
            date: new Date('Thu Feb 01 2018 00:00:00 GMT+0000'),
            value: 2.3,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Mon Nov 06 2017 00:00:00 GMT+0000'),
            value: 1.4,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Mon Nov 06 2017 00:00:00 GMT+0000'),
            value: 2.8,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: new Date('Mon Nov 06 2017 16:12:33 GMT+0000'),
            value: 0,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: new Date('Mon Nov 06 2017 20:12:53 GMT+0000'),
            value: 17.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: new Date('Tue Nov 07 2017 16:12:53 GMT+0000'),
            value: 2.3,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
        ],
      },
    },
    patientDateRange: {
      startDate: new Date('Mon Nov 06 2017 15:55:53 GMT+0000'),
      endDate: new Date('Thu Nov 09 2017 23:59:33 GMT+0000'),
    },
  },
  patient: {
    id: 123456,
    firstName: '',
    lastName: '',
    dateOfBirth: '01 Jan 1990',
    diabetesType: 2,
    deviceType: '',
    devices: ['', ''],
    treatmentName: '',
    center: '',
  },
};

const overwriteMockedState = makeOverwrite(mockedState);

describe('selectNumericalGraphStartTime', () => {
  describe('when graph x-axis is not impacted by time change', () => {
    it('should select 0 when graph=standard-day, graphType=trend, graphStartTime=00:00', () => {
      const expected = 0;
      const graph = GRAPH_STANDARD_DAY;
      const graphType = GRAPH_TYPE_TREND;
      const graphStartTime = '00:00';

      const mockedState = overwriteMockedState({
        ui: {
          patientDashboard: {
            graph,
            graphType,
            graphStartTime,
          },
        },
      });

      const actual = selectNumericalGraphStartTime(mockedState);
      expect(actual).toEqual(expected);
    });
    it('should select 0 when graph=standard-day, graphType=trend, graphStartTime=06:00', () => {
      const expected = 0;
      const graph = GRAPH_STANDARD_DAY;
      const graphType = GRAPH_TYPE_TREND;
      const graphStartTime = '06:00';

      const mockedState = overwriteMockedState({
        ui: {
          patientDashboard: {
            graph,
            graphType,
            graphStartTime,
          },
        },
      });

      const actual = selectNumericalGraphStartTime(mockedState);
      expect(actual).toEqual(expected);
    });
    it('should select 0 when graph=standard-week, graphType=trend, graphStartTime=06:00', () => {
      const expected = 0;
      const graph = GRAPH_STANDARD_WEEK;
      const graphType = GRAPH_TYPE_TREND;
      const graphStartTime = '06:00';

      const mockedState = overwriteMockedState({
        ui: {
          patientDashboard: {
            graph,
            graphType,
            graphStartTime,
          },
        },
      });

      const actual = selectNumericalGraphStartTime(mockedState);
      expect(actual).toEqual(expected);
    });
  });
  describe('when graph x-axis is impacted by time change', () => {
    it('should select 0 when graph=standard-day, graphType=details, graphStartTime=00:00', () => {
      const expected = 0;
      const graph = GRAPH_STANDARD_DAY;
      const graphType = GRAPH_TYPE_DETAILS;
      const graphStartTime = '00:00';

      const mockedState = overwriteMockedState({
        ui: {
          patientDashboard: {
            graph,
            graphType,
            graphStartTime,
          },
        },
      });

      const actual = selectNumericalGraphStartTime(mockedState);
      expect(actual).toEqual(expected);
    });
    it('should select 6 when graph=standard-day, graphType=trend, graphStartTime=06:00', () => {
      const expected = 6;
      const graph = GRAPH_STANDARD_DAY;
      const graphType = GRAPH_TYPE_DETAILS;
      const graphStartTime = '06:00';

      const mockedState = overwriteMockedState({
        ui: {
          patientDashboard: {
            graph,
            graphType,
            graphStartTime,
          },
        },
      });

      const actual = selectNumericalGraphStartTime(mockedState);
      expect(actual).toEqual(expected);
    });
  });
});
