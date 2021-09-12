import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { selectLogbookStatsData } from './logbook-stats.selector';

const mockedState = {
  stripDelivery: {
    thresholds: {
      hyper: { preIdealInterval: 125 },
      warning: { preIdealInterval: 100 },
      thresholdHypo: { preIdealInterval: 80 },
    },
  },
  ui: {
    patientDashboard: {
      glucoseMeasurements: [
        {
          date: convertISOToJsGMT('February 22, 2018 12:00:00 GMT-0000'),
          value: 90,
          carbohydrates: 10,
        },
        {
          date: convertISOToJsGMT('February 22, 2018 12:00:00 GMT-0000'),
          value: null,
          carbohydrates: 30,
        },
        {
          date: convertISOToJsGMT('February 23, 2018 12:00:00 GMT-0000'),
          value: 78,
          carbohydrates: null,
        },
        {
          date: convertISOToJsGMT('February 23, 2018 12:00:00 GMT-0000'),
          value: 110,
          carbohydrates: null,
        },
        {
          date: convertISOToJsGMT('February 24, 2018 12:00:00 GMT-0000'),
          value: 160,
          carbohydrates: null,
        },
        {
          date: convertISOToJsGMT('February 25, 2018 12:00:00 GMT-0000'),
          value: 110,
          carbohydrates: null,
        },
        {
          date: convertISOToJsGMT('February 26, 2018 12:00:00 GMT-0000'),
          value: null,
          carbohydrates: 35,
        },
      ],
      insulin: {
        basals: [],
        bolus: [
          {
            bolusType: null,
            date: convertISOToJsGMT('Feb 23 2018 19:00:00 GMT-0500'),
            registerType: 'BolusPlusBasalTotal',
            remark: 'Bolus+Basal Total',
            value: 20,
          },
          {
            bolusType: null,
            date: convertISOToJsGMT('Feb 23 2018 19:00:00 GMT-0500'),
            registerType: 'BolusTotal',
            remark: 'Bolus Total',
            value: 5,
          },
          {
            bolusType: 'Std',
            date: convertISOToJsGMT('Feb 23 2018 20:00:00 GMT-0500'),
            registerType: 'Bolus',
            remark: null,
            value: 3,
          },
          {
            bolusType: 'Std',
            date: convertISOToJsGMT('Feb 23 2018 22:00:00 GMT-0500'),
            registerType: 'Bolus',
            remark: null,
            value: 2,
          },
          {
            bolusType: null,
            date: convertISOToJsGMT('Feb 26 2018 19:00:00 GMT-0500'),
            registerType: 'BolusPlusBasalTotal',
            remark: 'Bolus+Basal Total',
            value: 0.01,
          },
        ],
      },
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('February 21, 2018 00:00:00 GMT-0000'),
      endDate: convertISOToJsGMT('February 28, 2018 23:59:99 GMT-0000'),
    },
  },
};

describe('selectLogbookStatsData test suite', () => {
  it.only('should correctly select logbook stats data', () => {
    expect(selectLogbookStatsData(mockedState)).toEqual([
      {
        columns: [
          { label: 'N/A', value: ['Thursday,', 'Feb 22, 2018'] },
          1,
          { label: 'BELOW_TARGET_RANGE', value: 90 },
          EMPTY_VALUE_PLACEHOLDER,
          '',
          40,
          '',
          '',
          '',
          '',
          '',
        ],
        day: 'Thursday, Feb 22, 2018',
      },
      {
        columns: [
          { label: 'N/A', value: ['Friday,', 'Feb 23, 2018'] },
          2,
          { label: 'BELOW_TARGET_RANGE', value: 94 },
          23,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        day: 'Friday, Feb 23, 2018',
      },
      {
        columns: [
          { label: 'WEEKEND', value: ['Saturday,', 'Feb 24, 2018'] },
          1,
          { label: 'HYPER', value: 160 },
          EMPTY_VALUE_PLACEHOLDER,
          '',
          '',
          20,
          15,
          5,
          2,
          '75 / 25',
        ],
        day: 'Saturday, Feb 24, 2018',
      },
      {
        columns: [
          { label: 'WEEKEND', value: ['Sunday,', 'Feb 25, 2018'] },
          1,
          { label: 'IN_RANGE', value: 110 },
          EMPTY_VALUE_PLACEHOLDER,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        day: 'Sunday, Feb 25, 2018',
      },
      {
        columns: [
          { label: 'N/A', value: ['Monday,', 'Feb 26, 2018'] },
          '',
          { label: null },
          '',
          '',
          35,
          '',
          '',
          '',
          '',
          '',
        ],
        day: 'Monday, Feb 26, 2018',
      },
      {
        columns: [
          { label: 'N/A', value: ['Tuesday,', 'Feb 27, 2018'] },
          '',
          { label: null },
          '',
          '',
          '',
          0.01,
          0.01,
          '',
          '',
          '100 / 0',
        ],
        day: 'Tuesday, Feb 27, 2018',
      },
    ]);
  });
});
