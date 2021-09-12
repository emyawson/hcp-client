import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { selectPatient } from 'src/domains/diagnostics/core';
import {
  selectGraphDetailBloodGlucose,
  selectTargetRange,
  selectThreshold,
  selectShowGridLines,
  selectVerticalTicks,
} from 'src/domains/diagnostics/scenes/graphs/graph.selector';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';
import { GRAPH_TYPE_DETAILS } from 'src/domains/diagnostics/utils/graph.constants';

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
          date: convertISOToJsGMT('Mon Nov 06 2017 20:12:33 GMT+0000'),
          value: 79,
        },
        {
          date: convertISOToJsGMT('Tue Nov 07 2017 16:12:53 GMT+0000'),
          value: 93,
        },
        {
          date: convertISOToJsGMT('Wed Nov 08 2017 20:12:53 GMT+0000'),
          value: 50,
        },
      ],
      graphStartTime: '0:00',
      graph: GRAPH_TYPE_DETAILS,
      graphType: GRAPH_TYPE_DETAILS,
      insulin: {
        basals: [
          {
            date: convertISOToJsGMT('Thu Feb 01 2018 00:00:00 GMT+0000'),
            cbrf: 1.1,
            profile: 1,
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 16:12:33 GMT+0000'),
            cbrf: 0.7,
            profile: 1,
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 20:12:53 GMT+0000'),
            cbrf: 0.9,
            profile: 1,
          },
          {
            date: convertISOToJsGMT('Tue Nov 07 2017 16:12:53 GMT+0000'),
            cbrf: 1.1,
            profile: 1,
          },
        ],
        bolus: [
          {
            date: convertISOToJsGMT('Thu Feb 01 2018 00:00:00 GMT+0000'),
            value: 2.3,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 00:00:00 GMT+0000'),
            value: 1.4,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 00:00:00 GMT+0000'),
            value: 2.8,
            remark: 'Bolus Total',
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 16:12:33 GMT+0000'),
            value: 0,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: convertISOToJsGMT('Mon Nov 06 2017 20:12:53 GMT+0000'),
            value: 17.6,
            remark: 'Bolus+Basal Total',
            registerType: 'BolusPlusBasalTotal',
            bolusType: null,
          },
          {
            date: convertISOToJsGMT('Tue Nov 07 2017 16:12:53 GMT+0000'),
            value: 2.3,
            remark: 'Bolus',
            registerType: 'Bolus',
            bolusType: 'Std',
          },
        ],
      },
    },
    patientDateRange: {
      startDate: convertISOToJsGMT('Mon Nov 06 2017 15:55:53 GMT+0000'),
      endDate: convertISOToJsGMT('Thu Nov 09 2017 23:59:33 GMT+0000'),
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

describe('Graph Selector', () => {
  it('should select formatted graph detail blood glucose values', () => {
    const glucoseMeasurements = [
      {
        date: convertISOToJsGMT('Mon Nov 06 2017 16:12:33 GMT+0000'),
        value: 130,
      },
      {
        date: convertISOToJsGMT('Mon Nov 06 2017 20:12:33 GMT+0000'),
        value: 79,
      },
      {
        date: convertISOToJsGMT('Tue Nov 07 2017 16:12:53 GMT+0000'),
        value: 93,
      },
      {
        date: convertISOToJsGMT('Wed Nov 08 2017 20:12:53 GMT+0000'),
        value: 50,
      },
      {
        date: convertISOToJsGMT('Wed Nov 08 2017 18:12:53 GMT+0000'),
        value: 40,
      },
    ];

    const mockedState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements } },
    });

    expect(selectGraphDetailBloodGlucose(mockedState)).toEqual({
      bloodGlucoseMean: 78,
      bloodGlucoseStandardDeviation: 36,
      testsPerDay: 1.3,
    });
  });

  it("should select formatted graph detail blood glucose with standard deviation of '-' when there are 1 or less measurements", () => {
    const expected = { bloodGlucoseStandardDeviation: EMPTY_VALUE_PLACEHOLDER };

    let mockState = overwriteMockedState({
      ui: { patientDashboard: { glucoseMeasurements: [] } },
    });

    expect(selectGraphDetailBloodGlucose(mockState)).toEqual(
      expect.objectContaining(expected),
    );

    mockState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            mockedState.ui.patientDashboard.glucoseMeasurements[0],
          ],
        },
      },
    });

    expect(selectGraphDetailBloodGlucose(mockState)).toEqual(
      expect.objectContaining(expected),
    );
  });

  it('should select patient', () => {
    expect(selectPatient(mockedState)).toEqual({
      id: 123456,
      firstName: '',
      lastName: '',
      dateOfBirth: '01 Jan 1990',
      diabetesType: 2,
      deviceType: '',
      devices: ['', ''],
      treatmentName: '',
      center: '',
    });
  });

  it('should normalize the target range', () => {
    const mockedState = {
      stripDelivery: {
        threshold: {
          glucoseIdealIntervalMax: 125,
          glucoseIdealIntervalMin: 80,
          hypoglycemiaThreshold: 60,
        },
      },
    };
    const { threshold } = mockedState.stripDelivery;

    expect(selectTargetRange.resultFunc(threshold)).toEqual({
      data: { max: 125, min: 80 },
      max: 0.3125,
      min: 0.2,
    });
  });

  it('should normalize the threshold value', () => {
    const mockedState = {
      stripDelivery: {
        threshold: {
          glucoseIdealIntervalMax: 125,
          glucoseIdealIntervalMin: 80,
          hypoglycemiaThreshold: 60,
        },
      },
    };
    const { threshold } = mockedState.stripDelivery;

    expect(selectThreshold.resultFunc(threshold)).toEqual({
      data: { value: 60 },
      value: 0.15,
    });
  });

  describe('selectShowGridLines', () => {
    it('should show/hide horizontal grid lines', () => {
      expect(selectShowGridLines.resultFunc({ showGridLines: false })).toEqual(
        false,
      );

      expect(selectShowGridLines.resultFunc({ showGridLines: true })).toEqual(
        true,
      );
    });
  });

  describe('selectVerticalTicks', () => {
    it('should select vertical ticks', () => {
      const thresholdTicks = [
        {
          value: 0.3125,
          label: '125',
          key: 'targetRangeMax',
          gridLine: false,
          color: '#4FA952',
        },
        {
          value: 0.2,
          label: '80',
          key: 'targetRangeMin',
          gridLine: false,
          color: '#4FA952',
        },
        {
          value: 0.15,
          label: '60',
          key: 'threshold',
          gridLine: false,
          color: '#CF021B',
        },
      ];

      const ceiling = 400;

      expect(selectVerticalTicks.resultFunc(thresholdTicks, ceiling)).toEqual([
        { gridLine: true, label: '0', value: 0 },
        { gridLine: true, label: '50', value: 0.125 },
        { gridLine: true, label: '100', value: 0.25 },
        { gridLine: true, label: '150', value: 0.375 },
        { gridLine: true, label: '200', value: 0.5 },
        { gridLine: true, label: '250', value: 0.625 },
        { gridLine: true, label: '300', value: 0.75 },
        { gridLine: true, label: '350', value: 0.875 },
        { gridLine: true, label: '400', value: 1 },
        {
          color: '#4FA952',
          gridLine: false,
          key: 'targetRangeMax',
          label: '125',
          value: 0.3125,
        },
        {
          color: '#4FA952',
          gridLine: false,
          key: 'targetRangeMin',
          label: '80',
          value: 0.2,
        },
        {
          color: '#CF021B',
          gridLine: false,
          key: 'threshold',
          label: '60',
          value: 0.15,
        },
      ]);
    });
  });
});
