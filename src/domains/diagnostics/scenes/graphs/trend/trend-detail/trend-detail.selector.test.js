import { take, flatten } from 'ramda';

import { makeOverwrite } from 'src/domains/diagnostics/utils';
import { trendDetailConnector } from 'src/domains/diagnostics/scenes/graphs/trend/trend-detail/trend-detail.selector';

const mockedState = {
  stripDelivery: {
    thresholds: {
      actualHyper: {
        preIdealInterval: 100,
        postIdealInterval: 99,
        noctIdealInterval: 99,
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
  },
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          date: new Date('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 230,
        },
        {
          date: new Date('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 479,
        },
      ],
      graphStartTime: '0:00',
      showBloodGlucoseLines: true,
      showBloodGlucosePoints: true,
      showBloodGlucoseBeforeMealPoints: true,
      showBloodGlucoseAfterMealPoints: true,
      showCarbohydrates: true,
      showMeanBloodGlucose: true,
    },
    patientDateRange: {
      startDate: new Date('Mon Nov 06 2017 15:55:53 GMT+0000'),
      endDate: new Date('Thu Nov 09 2017 23:59:33 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(mockedState);

describe('Trend Detail Selector', () => {
  describe('dynamic vertical ticks', () => {
    describe('when the highest measurements value is less than 400', () => {
      const glucoseMeasurements = [
        {
          date: new Date('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 230,
        },
        {
          date: new Date('Thu Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 240,
        },
        {
          date: new Date('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 280,
        },
      ];

      it('vertical ticks start from highest value rounded up to a dividend of 50', () => {
        const expected = [
          { gridLine: true, label: '0', value: 0 },
          { gridLine: true, label: '50', value: 50 / 300 },
          { gridLine: true, label: '100', value: 100 / 300 },
          { gridLine: true, label: '150', value: 150 / 300 },
          { gridLine: true, label: '200', value: 200 / 300 },
          { gridLine: true, label: '250', value: 250 / 300 },
          { gridLine: true, label: '300', value: 1 },
        ];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = take(7)(trendDetailConnector(mockState).verticalTicks);
        expect(actual).toEqual(expected);
      });

      it('graph max Y is the highest value rounded up to a dividend of 50', () => {
        const expected = 300;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(mockState).graphYMax;
        expect(actual).toEqual(expected);
      });

      it('mean points should reflect the dynamic ceiling', () => {
        const day8MeanY = (240 + 230) / 2 / 300;
        const day9MeanY = 280 / 300;
        const expected = [day8MeanY, day9MeanY];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.meanBloodGlucosePoints.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('points should reflect the dynamic ceiling', () => {
        const day8Y1 = 230 / 300;
        const day8Y2 = 240 / 300;
        const day9Y = 280 / 300;
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.glucoseMeasurements.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('lines should reflect the dynamic ceiling', () => {
        const day8Y1 = 230 / 300;
        const day8Y2 = 240 / 300;
        const day9Y = 280 / 300;
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = flatten(
          trendDetailConnector(mockState).graphData.lines,
        ).map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 300;
        const upperY = 125 / 300;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 300;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is less than the upper limit', () => {
      const glucoseMeasurements = [
        {
          date: new Date('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 20,
        },
        {
          date: new Date('Wed Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 24,
        },
        {
          date: new Date('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 30,
        },
      ];

      it('vertical ticks start from the dividend of 50 upper limit', () => {
        const expected = [
          { gridLine: true, label: '0', value: 0 },
          { gridLine: true, label: '50', value: 1 / 3 },
          { gridLine: true, label: '100', value: 2 / 3 },
          { gridLine: true, label: '150', value: 3 / 3 },
        ];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = take(4)(trendDetailConnector(mockState).verticalTicks);
        expect(actual).toEqual(expected);
      });

      it('graph max Y is the dividend of 50 above upper limit', () => {
        const expected = 150;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(mockState).graphYMax;
        expect(actual).toEqual(expected);
      });

      it('mean points should reflect the dynamic ceiling', () => {
        const day8MeanY = (20 + 24) / 2 / 150;
        const day9MeanY = 30 / 150;
        const expected = [day8MeanY, day9MeanY];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.meanBloodGlucosePoints.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('points should reflect the dynamic ceiling', () => {
        const day8Y1 = 20 / 150;
        const day8Y2 = 24 / 150;
        const day9Y = 30 / 150;
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.glucoseMeasurements.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('lines should reflect the dynamic ceiling', () => {
        const day8Y1 = 20 / 150;
        const day8Y2 = 24 / 150;
        const day9Y = 30 / 150;
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = flatten(
          trendDetailConnector(mockState).graphData.lines,
        ).map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 150;
        const upperY = 125 / 150;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 150;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is more than 400', () => {
      const glucoseMeasurements = [
        {
          date: new Date('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 230,
        },
        {
          date: new Date('Thu Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 240,
        },
        {
          date: new Date('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 420,
        },
      ];

      it('vertical ticks start from 400', () => {
        const expected = [
          { gridLine: true, label: '0', value: 0 },
          { gridLine: true, label: '50', value: 50 / 400 },
          { gridLine: true, label: '100', value: 100 / 400 },
          { gridLine: true, label: '150', value: 150 / 400 },
          { gridLine: true, label: '200', value: 200 / 400 },
          { gridLine: true, label: '250', value: 250 / 400 },
          { gridLine: true, label: '300', value: 300 / 400 },
          { gridLine: true, label: '350', value: 350 / 400 },
          { gridLine: true, label: '400', value: 1 },
        ];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = take(9)(trendDetailConnector(mockState).verticalTicks);
        expect(actual).toEqual(expected);
      });

      it('graph max Y is 400', () => {
        const expected = 400;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(mockState).graphYMax;
        expect(actual).toEqual(expected);
      });

      it('mean points should reflect the dynamic ceiling', () => {
        const day8MeanY = (240 + 230) / 2 / 400;
        const day9MeanY = 420 / 400;
        const expected = [day8MeanY, day9MeanY];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.meanBloodGlucosePoints.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('points should reflect the dynamic ceiling', () => {
        const day8Y1 = 230 / 400;
        const day8Y2 = 240 / 400;
        const day9Y = 400 / 400; // for the measurement with 420 value
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = trendDetailConnector(
          mockState,
        ).graphData.glucoseMeasurements.map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('lines should reflect the dynamic ceiling', () => {
        const day8Y1 = 230 / 400;
        const day8Y2 = 240 / 400;
        const day9Y = 400 / 400; // for the measurement with 420 value
        const expected = [day8Y1, day8Y2, day9Y];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = flatten(
          trendDetailConnector(mockState).graphData.lines,
        ).map(x => x.y);
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 400;
        const upperY = 125 / 400;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 400;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = trendDetailConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });
  });
});
