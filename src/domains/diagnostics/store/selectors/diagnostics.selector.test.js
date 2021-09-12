import {
  makeOverwrite,
  convertISOToJsGMT,
} from 'src/domains/diagnostics/utils';
import { GRAPH_TYPE_DETAILS } from 'src/domains/diagnostics/utils/graph.constants';

import {
  selectGraphType,
  selectGraphDetailTargetRanges,
  selectGraphThreshold,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphStartTime,
} from './diagnostics.selector';
import { selectTimeIntervals } from './strip-delivery.selectors';
import { selectPatient } from './patient.selector';

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
  it('should select graph type', () => {
    expect(selectGraphType(mockedState)).toEqual(GRAPH_TYPE_DETAILS);
  });

  it('should select graph detail target ranges values', () => {
    expect(selectGraphDetailTargetRanges(mockedState)).toEqual({
      aboveCount: 1,
      abovePercentage: 25,
      belowCount: 1,
      belowPercentage: 25,
      belowAndHypoCount: 2,
      belowAndHypoPercentage: 50,
      hypoglycaemiaNumber: 1,
      hypoglycaemiaPercentage: 25,
      hypoglycemiaThreshold: 60,
      targetBloodGlucoseMaximum: 125,
      targetBloodGlucoseMinimum: 80,
      withinCount: 1,
      withinPercentage: 25,
    });
  });

  it('should select thresholds', () => {
    expect(selectGraphThreshold(mockedState)).toEqual({
      glucoseIdealIntervalMax: 125,
      glucoseIdealIntervalMin: 80,
      hypoglycemiaThreshold: 60,
      upperHyperThreshold: 240,
    });
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

  it('should select glucose measurements', () => {
    const mockState = overwriteMockedState({
      ui: {
        patientDashboard: {
          glucoseMeasurements: [
            ...mockedState.ui.patientDashboard.glucoseMeasurements,
            {
              ...mockedState.ui.patientDashboard.glucoseMeasurements[0],
              control: true,
            },
          ],
        },
      },
    });

    const expected = [...mockedState.ui.patientDashboard.glucoseMeasurements];

    expect(selectGlucoseMeasurementsInDateSliderRange(mockState)).toEqual(
      expected,
    );
  });

  it('should select graph start time', () => {
    expect(selectGraphStartTime(mockedState)).toEqual('0:00');
  });

  it('should select time intervals', () => {
    expect(selectTimeIntervals(mockedState)).toEqual([
      {
        id: 2161,
        description: 'BEFORE_BREAKFAST',
        startTime: '06:00:00',
        endTime: '08:30:00',
        label: null,
      },
    ]);
  });
});
