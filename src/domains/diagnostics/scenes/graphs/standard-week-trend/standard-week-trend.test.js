import React from 'react';
import { shallow } from 'enzyme';
import { take } from 'ramda';

import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  selectGraphData,
  selectHorizontalTicks,
  standardWeekTrendConnector,
} from './standard-week-trend.selector';
import { StandardWeekTrend } from './standard-week-trend.component';

const mockNormalizedGraphData = [
  {
    data: {
      count: 2,
      max: 303,
      mean: 191,
      min: 79,
      stdDev: 158.39191898578665,
    },
    deviation: 0.3959797974644666,
    max: 0.7575,
    min: 0.1975,
    x: 0,
    y: 0.4775,
  },
  {
    data: {
      count: 1,
      max: 122,
      mean: 122,
      min: 122,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.305,
    min: 0.305,
    x: 0.14285714285714285,
    y: 0.305,
  },
  {
    data: {
      count: 1,
      max: 142,
      mean: 142,
      min: 142,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.355,
    min: 0.355,
    x: 0.2857142857142857,
    y: 0.355,
  },
  {
    data: {
      count: 1,
      max: 142,
      mean: 142,
      min: 142,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.355,
    min: 0.355,
    x: 0.42857142857142855,
    y: 0.355,
  },
  {
    data: {
      count: 1,
      max: 222,
      mean: 222,
      min: 222,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.555,
    min: 0.555,
    x: 0.5714285714285714,
    y: 0.555,
  },
  {
    data: {
      count: 1,
      max: 212,
      mean: 212,
      min: 212,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.53,
    min: 0.53,
    x: 0.7142857142857143,
    y: 0.53,
  },
  {
    data: {
      count: 1,
      max: 130,
      mean: 130,
      min: 130,
      stdDev: EMPTY_VALUE_PLACEHOLDER,
    },
    deviation: 0,
    max: 0.325,
    min: 0.325,
    x: 0.8571428571428571,
    y: 0.325,
  },
];

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
          value: 212,
          date: convertISOToJsGMT('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
        },
        {
          value: 130,
          date: convertISOToJsGMT('Wed Nov 09 2017 13:39:25 GMT-0500 (EST)'),
        },
        {
          value: 140,
          date: convertISOToJsGMT('Wed Nov 09 2017 13:39:25 GMT-0500 (EST)'),
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
      startDate: convertISOToJsGMT('Mon Nov 06 2017 15:55:53 GMT+0000'),
      endDate: convertISOToJsGMT('Thu Nov 09 2017 23:59:33 GMT+0000'),
    },
  },
};

const overwriteMockedState = makeOverwrite(mockedState);

describe('Standard Week Trend Component', () => {
  it('renders correctly', () => {
    const mockProps = {
      graphData: [
        {
          max: 0.1255,
          min: 0.155,
          deviation: 0.23340326333051414,
          x: 0,
          y: 0.41583333333333333,
          data: {
            max: 242,
            min: 62,
            mean: 166.33333333333334,
            stdDev: 93.36130533220566,
          },
        },
      ],
      targetRange: {
        minTargetWindow: 0.245,
        maxTargetWindow: 0.32,
      },
      threshold: 0.22,
    };

    const wrapper = shallow(<StandardWeekTrend {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Standard Week Trend Selector', () => {
  it('should normalize graph data', () => {
    const glucoseMeasurements = [
      {
        value: 212,
        date: convertISOToJsGMT('2017-07-01 07:37:00 GMT+0000'),
      },
      {
        value: 130,
        date: convertISOToJsGMT('2017-07-02 07:30:00 GMT+0000'),
      },
      {
        value: 79,
        date: convertISOToJsGMT('2017-07-03 09:35:00 GMT+0000'),
      },
      {
        value: 122,
        date: convertISOToJsGMT('2017-07-04 12:25:00 GMT+0000'),
      },
      {
        value: 142,
        date: convertISOToJsGMT('2017-07-05 14:55:00 GMT+0000'),
      },
      {
        value: 142,
        date: convertISOToJsGMT('2017-07-06 16:55:00 GMT+0000'),
      },
      {
        value: 222,
        date: convertISOToJsGMT('2017-07-07 20:55:00 GMT+0000'),
      },
      {
        value: 303,
        date: convertISOToJsGMT('2017-07-03 20:55:00 GMT+0000'),
      },
    ];

    expect(selectGraphData.resultFunc(glucoseMeasurements)).toEqual(
      mockNormalizedGraphData,
    );
  });

  it('should select horizontal graph tick values', () => {
    expect(selectHorizontalTicks.resultFunc(mockNormalizedGraphData)).toEqual([
      { label: 'Monday', value: 0 },
      { label: 'Tuesday', value: 0.14285714285714285 },
      { label: 'Wednesday', value: 0.2857142857142857 },
      { label: 'Thursday', value: 0.42857142857142855 },
      { label: 'Friday', value: 0.5714285714285714 },
      { label: 'Saturday', value: 0.7142857142857143 },
      { label: 'Sunday', value: 0.8571428571428571 },
    ]);
  });

  describe('dynamic vertical ticks', () => {
    describe('when the highest measurements value is less than 400', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 230,
        },
        {
          date: convertISOToJsGMT('Thu Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 240,
        },
        {
          date: convertISOToJsGMT('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
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

        const actual = take(7)(
          standardWeekTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const day8MeanY = (240 + 230) / 2 / 300;
        const day9MeanY = 280 / 300;
        const expected = [NaN, NaN, day8MeanY, day9MeanY, NaN, NaN, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardWeekTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 300;
        const upperY = 125 / 300;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 300;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is less than the upper limit', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 20,
        },
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 24,
        },
        {
          date: convertISOToJsGMT('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 30,
        },
      ];

      it('vertical ticks start from the dividend of 50 above upper limit', () => {
        const expected = [
          { gridLine: true, label: '0', value: 0 },
          { gridLine: true, label: '50', value: 1 / 3 },
          { gridLine: true, label: '100', value: 2 / 3 },
          { gridLine: true, label: '150', value: 3 / 3 },
        ];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = take(4)(
          standardWeekTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const day8MeanY = (20 + 24) / 2 / 150;
        const day9MeanY = 30 / 150;
        const expected = [NaN, NaN, day8MeanY, day9MeanY, NaN, NaN, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardWeekTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 150;
        const upperY = 125 / 150;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 150;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is more than 400', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 13:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 230,
        },
        {
          date: convertISOToJsGMT('Thu Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: false,
          afterMeal: true,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 240,
        },
        {
          date: convertISOToJsGMT('Thu Nov 09 2017 13:39:25 GMT-0500 (EST)'),
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

        const actual = take(9)(
          standardWeekTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const day8MeanY = (240 + 230) / 2 / 400;
        const day9MeanY = 420 / 400;
        const expected = [NaN, NaN, day8MeanY, day9MeanY, NaN, NaN, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardWeekTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 400;
        const upperY = 125 / 400;
        const expected = { min: warningY, max: upperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 400;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardWeekTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });
  });
});
