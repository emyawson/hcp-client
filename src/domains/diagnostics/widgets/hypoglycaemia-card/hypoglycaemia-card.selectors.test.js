import { makeOverwrite } from 'src/domains/diagnostics/utils';

import { HypoglycaemiaCardConnector } from './hypoglycaemia-card.selectors';

const mockedState = {
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          date: new Date('Jan 2 2018 01:00:00 GMT+0000'),
          value: 55,
        },
        {
          date: new Date('Jan 1 2018 10:00:00 GMT+0000'),
          value: 130,
        },
        {
          date: new Date('Jan 1 2018 14:00:00 GMT+0000'),
          value: 93,
        },
        {
          date: new Date('Jan 1 2018 15:00:00 GMT+0000'),
          value: 50,
        },
      ],
    },
    patientDateRange: {
      startDate: new Date('Jan 1 2018 GMT+0000'),
      endDate: new Date('Jan 31 2018 GMT+0000'),
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

const overwriteMockedState = makeOverwrite(mockedState);

describe('HypoglycaemiaCardConnector', () => {
  it('gets the hypoglycaemiaTreshold from the store', () => {
    const expected = 90;
    const { hypoglycaemiaTreshold } = HypoglycaemiaCardConnector(mockedState);
    expect(hypoglycaemiaTreshold).toEqual(expected);
  });
  it('counts the number of hypoglycaemia with regard to hypoglycaemia treshold', () => {
    const expected = 2;
    const { hypoglycaemiaCount } = HypoglycaemiaCardConnector(mockedState);
    expect(hypoglycaemiaCount).toEqual(expected);
  });
  it('counts the number of night time hypoglycaemia with regard to hypoglycaemia treshold an time intervals', () => {
    const expected = 1;
    const { hypoglycaemiaNightCount } = HypoglycaemiaCardConnector(mockedState);
    expect(hypoglycaemiaNightCount).toEqual(expected);
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
      const actual = HypoglycaemiaCardConnector(mockState).hasData;
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
      const actual = HypoglycaemiaCardConnector(mockState).hasData;
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
      const actual = HypoglycaemiaCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
  });
});
