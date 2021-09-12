import { colors } from 'src/domains/diagnostics/styles';
import { makeOverwrite } from 'src/domains/diagnostics/utils';

import { DistributionCardConnector } from './distribution-card.selector';

const initialMockedState = {
  stripDelivery: {
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
          value: 79,
        },
        {
          date: 1510089173000,
          value: 93,
        },
        {
          date: 1510189973000,
          value: 50,
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

describe('Distribution Card Selectors', () => {
  describe('DistributionCardConnector', () => {
    it('should return all distribution data', () => {
      const distribution = {
        above: 0.25,
        within: 0.25,
        below: 0.25,
        hypoglycaemia: 0.25,
      };
      const distributionSegments = [
        { fill: colors.blueLight, name: 'above-segment', value: 0.25 },
        { fill: colors.trafficGreen, name: 'within-segment', value: 0.25 },
        { fill: colors.trafficOrange, name: 'below-segment', value: 0.25 },
        { fill: colors.red, name: 'hypoglycaemia-segment', value: 0.25 },
      ];
      const threshold = {
        glucoseIdealIntervalMax: 125,
        glucoseIdealIntervalMin: 80,
        hypoglycemiaThreshold: 60,
        upperHyperThreshold: 240,
      };
      const actual = DistributionCardConnector(initialMockedState);

      expect(actual).toEqual({
        distribution,
        distributionSegments,
        threshold,
        hasData: true,
        isLoading: false,
      });
    });

    it('should return segment for displaying gray circle when all other segments have no values', () => {
      const distribution = {
        above: 0,
        within: 0,
        below: 0,
        hypoglycaemia: 0,
      };
      const distributionSegments = [
        { fill: colors.blueLight, name: 'above-segment', value: 0 },
        { fill: colors.trafficGreen, name: 'within-segment', value: 0 },
        { fill: colors.trafficOrange, name: 'below-segment', value: 0 },
        { fill: colors.red, name: 'hypoglycaemia-segment', value: 0 },
        { fill: colors.gray, name: 'empty-filler', value: 100 },
      ];

      const mockState = overwriteMockedState({
        ui: { patientDashboard: { glucoseMeasurements: [] } },
      });

      const actual = DistributionCardConnector(mockState);

      expect(actual).toEqual(expect.objectContaining({ distribution }));
      expect(actual).toEqual(expect.objectContaining({ distributionSegments }));
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
        const actual = DistributionCardConnector(mockState).hasData;
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
        const actual = DistributionCardConnector(mockState).hasData;
        expect(actual).toEqual(expected);
      });
      it('is true when there is no glucose measurement and clinical data has not fetched but patient date range is fetching', () => {
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
        const actual = DistributionCardConnector(mockState).hasData;
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
        const actual = DistributionCardConnector(mockState).hasData;
        expect(actual).toEqual(expected);
      });
    });
  });
});
