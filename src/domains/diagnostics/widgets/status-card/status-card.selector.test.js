import {
  TRAFFIC_LIGHT_COLORS,
  TRAFFIC_LIGHT_LABELS,
} from 'src/domains/diagnostics/scenes/blood-glucose-overview/store';
import { makeOverwrite } from 'src/domains/diagnostics/utils';
import { translate } from 'src/i18n';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { StatusCardConnector } from './status-card.selector';
import { STATUS_LABELS } from './status-card.util';

import {
  evenDistributedDay1,
  evenDistributedDay2,
  evenDistributedDay3,
  evenDistributedDay4,
  evenDistributedDay5,
  evenDistributedDay6,
  evenDistributedDay7,
} from '../../scenes/blood-glucose-overview/store/blood-glucose-overview.mock';

const initialMockedState = {
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
      actualHyper: {
        preIdealInterval: 240,
      },
      hyper: {
        preIdealInterval: 125,
      },
      hypo: {
        preIdealInterval: 60,
      },
      warning: {
        preIdealInterval: 80,
      },
    },
  },
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          date: 1510002753000,
          value: 130,
        },
        {
          date: 1510017173000,
          value: 120,
        },
        {
          date: 1510089173000,
          value: 110,
        },
        {
          date: 1510189973000,
          value: 100,
        },
      ],
      isFetchingClinicalData: false,
    },
    patientDateRange: {
      startDate: new Date(1510001753000),
      endDate: new Date(1510289973000),
    },
  },
};

const overwriteMockedState = makeOverwrite(initialMockedState);

describe('Status Card Selectors', () => {
  test('StatusCardConnector', () => {
    const threshold = {
      upperHyperThreshold: 240,
      glucoseIdealIntervalMax: 125,
      glucoseIdealIntervalMin: 80,
      hypoglycemiaThreshold: 60,
    };
    const hypoRisk = {
      value: {
        lbgi: 0.1,
        numberOfMeasurements: 4,
      },
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      },
    };
    const variability = {
      value: '11.2%',
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      },
    };
    const meanBloodGlucose = {
      value: 115,
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: `${translate(STATUS_LABELS.WITHIN)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      },
    };

    const actual = StatusCardConnector(initialMockedState);
    expect(actual).toEqual({
      hasReliableInfo: false,
      hypoRisk,
      meanBloodGlucose,
      placeholderStatusLabel: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      showPlaceholderStatusLabelAndHideValues: true,
      showStatusLabels: true,
      threshold,
      variability,
      hasData: true,
      isLoading: false,
    });
  });

  test('StatusCardConnector with evenly distributed measurements', () => {
    const stateWithEvenlyDistributedMeasurements = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...evenDistributedDay1,
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

    stateWithEvenlyDistributedMeasurements.ui.patientDateRange = {
      startDate: new Date('2018-01-01T05:30:00'),
      endDate: new Date('2018-01-07T17:00:00'),
    };

    const hypoRisk = {
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      },
      value: {
        lbgi: 0.5,
        numberOfMeasurements: 38,
      },
    };

    const meanBloodGlucose = {
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: `${translate(STATUS_LABELS.WITHIN)} ${translate(
          STATUS_LABELS.TARGET_RANGE,
        )}`,
      },
      value: 100,
    };

    const variability = {
      status: {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: translate(STATUS_LABELS.LOW),
      },
      value: '0%',
    };

    const threshold = {
      glucoseIdealIntervalMax: 125,
      glucoseIdealIntervalMin: 80,
      hypoglycemiaThreshold: 60,
      upperHyperThreshold: 240,
    };

    const actual = StatusCardConnector(stateWithEvenlyDistributedMeasurements);
    expect(actual).toEqual({
      hasReliableInfo: true,
      hypoRisk,
      meanBloodGlucose,
      placeholderStatusLabel: '',
      showPlaceholderStatusLabelAndHideValues: false,
      showStatusLabels: true,
      threshold,
      variability,
      hasData: true,
      isLoading: false,
    });
  });

  describe('variability test suite', () => {
    test("variability is equal to '-' when number of measurements is <= 1", () => {
      const expected = {
        variability: {
          status: {
            color: TRAFFIC_LIGHT_COLORS.GRAY,
            label: STATUS_LABELS.NONE,
          },
          value: `${EMPTY_VALUE_PLACEHOLDER}%`,
        },
      };

      let mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });
      let actual = StatusCardConnector(mockState);

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
      actual = StatusCardConnector(mockState);

      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });

  describe('has data', () => {
    it('is false when there is no glucose measurement and clinical data and patient date range are fetched', () => {
      const expected = false;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            glucoseMeasurements: [],
            isFetchingClinicalData: false,
            isFetchingPatientDateRange: false,
          },
        },
      });
      const actual = StatusCardConnector(mockState).hasData;
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
      const actual = StatusCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    it('is true when there is no glucose measurement and patient date range is fetching', () => {
      const expected = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            glucoseMeasurements: [],
            isFetchingClinicalData: false,
            isFetchingPatientDateRange: true,
          },
        },
      });
      const actual = StatusCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
    it('is true when there are glucose measurements and data is fetched', () => {
      const expected = true;
      const mockState = overwriteMockedState({
        ui: {
          patientDashboard: {
            isFetchingClinicalData: false,
            isFetchingPatientDateRange: false,
          },
        },
      });
      const actual = StatusCardConnector(mockState).hasData;
      expect(actual).toEqual(expected);
    });
  });
});

describe('placeholderLabel test suite ', () => {
  it("Should return '-' for the label when there are no measurements", () => {
    const expected = { placeholderStatusLabel: EMPTY_VALUE_PLACEHOLDER };
    const mockState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements: [] } },
    });
    const actual = StatusCardConnector(mockState);
    expect(actual).toEqual(expect.objectContaining(expected));
  });
});
