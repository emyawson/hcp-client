import React from 'react';
import { shallow } from 'enzyme';
import { take } from 'ramda';

import {
  AppleIcon,
  AppleEatenIcon,
  NightIcon,
  OvernightIcon,
} from 'src/domains/diagnostics/assets/icons';
import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import {
  selectGraphData,
  selectTimeHorizontalTicks,
  selectMealHorizontalTicks,
  selectIconHorizontalTicks,
  standardDayTrendConnector,
} from './standard-day-trend.selector';
import { StandardDayTrend } from './standard-day-trend.component';

const mockedData = {
  stripDelivery: {
    timeIntervals: [
      {
        startTime: '05:00:00',
        endTime: '08:30:00',
      },
      {
        startTime: '08:30:00',
        endTime: '11:30:00',
      },
      {
        startTime: '11:30:00',
        endTime: '14:30:00',
      },
      {
        startTime: '14:30:00',
        endTime: '17:30:00',
      },
      {
        startTime: '17:30:00',
        endTime: '21:00:00',
      },
      {
        startTime: '21:00:00',
        endTime: '22:00:00',
      },
      {
        startTime: '22:00:00',
        endTime: '00:00:00',
      },
      {
        startTime: '00:00:00',
        endTime: '05:00:00',
      },
    ],
    threshold: {
      glucoseIdealIntervalMax: 125,
      glucoseIdealIntervalMin: 80,
      hypoglycemiaThreshold: 60,
    },
  },
  dashboard: {
    glucoseMeasurements: [
      {
        value: 212,
        date: convertISOToJsGMT('2017-07-01 07:37:00 GMT+0000'),
      },
      {
        value: 130,
        date: convertISOToJsGMT('2017-07-01 07:30:00 GMT+0000'),
      },
      {
        value: 79,
        date: convertISOToJsGMT('2017-07-02 09:35:00 GMT+0000'),
      },
      {
        value: 122,
        date: convertISOToJsGMT('2017-07-02 12:25:00 GMT+0000'),
      },
      {
        value: 142,
        date: convertISOToJsGMT('2017-07-02 14:55:00 GMT+0000'),
      },
      {
        value: 142,
        date: convertISOToJsGMT('2017-07-02 16:55:00 GMT+0000'),
      },
      {
        value: 222,
        date: convertISOToJsGMT('2017-07-02 20:55:00 GMT+0000'),
      },
      {
        value: 142,
        date: convertISOToJsGMT('2017-07-02 21:55:00 GMT+0000'),
      },
      {
        value: 179,
        date: convertISOToJsGMT('2017-07-02 23:35:00 GMT+0000'),
      },
      {
        value: 411,
        date: convertISOToJsGMT('2017-07-02 00:35:00 GMT+0000'),
      },
    ],
  },
};

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
  },
  ui: {
    patientDashboard: {
      bloodGlucoseUnit: 'mg/dL',
      glucoseMeasurements: [
        {
          value: 212,
          date: convertISOToJsGMT('Wed Nov 08 2017 18:39:25 GMT-0500 (EST)'),
        },
        {
          value: 130,
          date: convertISOToJsGMT('Wed Nov 09 2017 13:39:25 GMT-0500 (EST)'),
        },
        {
          value: 140,
          date: convertISOToJsGMT('Wed Nov 09 2017 20:39:25 GMT-0500 (EST)'),
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

describe('Standard Day Trend Component', () => {
  it('renders correctly', () => {
    const mockProps = {
      graphData: [
        {
          max: 0.605,
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

    const wrapper = shallow(<StandardDayTrend {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Standard Day Trend Selector', () => {
  it('should normalize graph data', () => {
    const { timeIntervals } = mockedData.stripDelivery;
    const { glucoseMeasurements } = mockedData.dashboard;

    expect(
      selectGraphData.resultFunc(glucoseMeasurements, timeIntervals),
    ).toEqual([
      {
        data: {
          count: 2,
          icon: AppleIcon,
          max: 212,
          mean: 171,
          min: 130,
          stdDev: 57.982756057296896,
        },
        deviation: 0.14495689014324223,
        max: 0.53,
        min: 0.325,
        x: 0,
        y: 0.4275,
      },
      {
        data: {
          count: 1,
          icon: AppleEatenIcon,
          max: 79,
          mean: 79,
          min: 79,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 0.1975,
        min: 0.1975,
        x: 0.125,
        y: 0.1975,
      },
      {
        data: {
          count: 1,
          icon: AppleIcon,
          max: 122,
          mean: 122,
          min: 122,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 0.305,
        min: 0.305,
        x: 0.25,
        y: 0.305,
      },
      {
        data: {
          count: 2,
          icon: AppleEatenIcon,
          max: 142,
          mean: 142,
          min: 142,
          stdDev: 0,
        },
        deviation: 0,
        max: 0.355,
        min: 0.355,
        x: 0.375,
        y: 0.355,
      },
      {
        data: {
          count: 1,
          icon: AppleIcon,
          max: 222,
          mean: 222,
          min: 222,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 0.555,
        min: 0.555,
        x: 0.5,
        y: 0.555,
      },
      {
        data: {
          count: 1,
          icon: AppleEatenIcon,
          max: 142,
          mean: 142,
          min: 142,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 0.355,
        min: 0.355,
        x: 0.625,
        y: 0.355,
      },
      {
        data: {
          count: 1,
          icon: NightIcon,
          max: 179,
          mean: 179,
          min: 179,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 0.4475,
        min: 0.4475,
        x: 0.75,
        y: 0.4475,
      },
      {
        data: {
          count: 1,
          icon: OvernightIcon,
          max: 411,
          mean: 411,
          min: 411,
          stdDev: EMPTY_VALUE_PLACEHOLDER,
        },
        deviation: 0,
        max: 1.0275,
        min: 1.0275,
        x: 0.875,
        y: 1.0275,
      },
    ]);
  });

  it('should select time horizontal graph tick values', () => {
    const { timeIntervals } = mockedData.stripDelivery;

    expect(selectTimeHorizontalTicks.resultFunc(timeIntervals)).toEqual([
      { label: '05:00', value: 0 },
      { label: '08:30', value: 0.125 },
      { label: '11:30', value: 0.25 },
      { label: '14:30', value: 0.375 },
      { label: '17:30', value: 0.5 },
      { label: '21:00', value: 0.625 },
      { label: '22:00', value: 0.75 },
      { label: '00:00', value: 0.875 },
    ]);
  });

  it('should select the correct icon horizontal graph ticks', () => {
    expect(selectIconHorizontalTicks()).toEqual([
      { value: 1 / 16, component: AppleIcon, iconWidthScale: 0.04 },
      { value: 3 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
      { value: 5 / 16, component: AppleIcon, iconWidthScale: 0.04 },
      { value: 7 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
      { value: 9 / 16, component: AppleIcon, iconWidthScale: 0.04 },
      { value: 11 / 16, component: AppleEatenIcon, iconWidthScale: 0.023 },
      { value: 13 / 16, component: NightIcon, iconWidthScale: 0.035 },
      { value: 15 / 16, component: OvernightIcon, iconWidthScale: 0.033 },
    ]);
  });

  it('should select meal horizontal graph tick values', () => {
    expect(selectMealHorizontalTicks()).toEqual([
      { value: 1 / 8, label: 'Breakfast' },
      { value: 3 / 8, label: 'Lunch' },
      { value: 5 / 8, label: 'Dinner' },
      { value: 13 / 16, label: 'Bed Time' },
      { value: 15 / 16, label: 'Night' },
    ]);
  });

  describe('dynamic vertical ticks', () => {
    describe('when the highest measurements value is less than 400', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 18:39:25 GMT-0500 (EST)'),
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
          date: convertISOToJsGMT('Thu Nov 09 2017 16:39:25 GMT-0500 (EST)'),
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
          standardDayTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const afterBed = 240 / 300;
        const dinner = (280 + 230) / 2 / 300;
        const expected = [NaN, NaN, NaN, NaN, NaN, afterBed, dinner, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardDayTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 300;
        const hyperY = 125 / 300;
        const expected = { min: warningY, max: hyperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 300;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is less than the upper limit', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 18:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 20,
        },
        {
          date: convertISOToJsGMT('Thu Nov 08 2017 15:39:25 GMT-0500 (EST)'),
          beforeMeal: true,
          afterMeal: false,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          value: 24,
        },
        {
          date: convertISOToJsGMT('Thu Nov 09 2017 16:39:25 GMT-0500 (EST)'),
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
          standardDayTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const afterBed = 24 / 150;
        const dinner = (30 + 20) / 2 / 150;
        const expected = [NaN, NaN, NaN, NaN, NaN, afterBed, dinner, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardDayTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 150;
        const hyperY = 125 / 150;
        const expected = { min: warningY, max: hyperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 150;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });

    describe('when the highest measurements value is more than 400', () => {
      const glucoseMeasurements = [
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 18:39:25 GMT-0500 (EST)'),
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
          date: convertISOToJsGMT('Thu Nov 09 2017 16:39:25 GMT-0500 (EST)'),
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
          standardDayTrendConnector(mockState).verticalTicks,
        );
        expect(actual).toEqual(expected);
      });

      it('graph data should reflect the dynamic ceiling', () => {
        const afterBed = 240 / 400;
        const dinner = (420 + 230) / 2 / 400;
        const expected = [NaN, NaN, NaN, NaN, NaN, afterBed, dinner, NaN];

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });

        const actual = standardDayTrendConnector(mockState).graphData.map(
          x => x.y,
        );
        expect(actual).toEqual(expected);
      });

      it('target range should reflect the dynamic ceiling', () => {
        const warningY = 80 / 400;
        const hyperY = 125 / 400;
        const expected = { min: warningY, max: hyperY };

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).targetRange;
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('threshold should reflect the dynamic ceiling', () => {
        const expected = 60 / 400;

        const mockState = overwriteMockedState({
          ui: { patientDashboard: { glucoseMeasurements } },
        });
        const actual = standardDayTrendConnector(mockState).threshold.value;
        expect(actual).toEqual(expected);
      });
    });
  });
});
