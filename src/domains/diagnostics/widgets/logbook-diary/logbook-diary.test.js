import { shallow } from 'enzyme';
import React from 'react';

import { getBolusTypeIcon } from 'src/domains/diagnostics/scenes/graphs/graph.util';

import { LogbookDiary } from './logbook-diary.component';
import { selectLogbookDiaryData } from './logbook-diary.selector';
import {
  basalRemarkMatchesRegexCondition,
  getBasalRateProfile,
  getGlucoseIcons,
  getPumpIcon,
  getPumpIconIdentifier,
  getTextAfterPumpIcon,
  getTextBeforePumpIcon,
  getBolusValue,
} from './logbook-diary.util';

const mockProps = {
  logbookDiaryData: [
    [
      {
        date: 'Wed, 14 Feb 2018',
        time: '3:08am',
        dayOfWeek: '3',
        glucoseValue: 237,
        carbohydrates: null,
      },
      {
        date: 'Wed, 14 Feb 2018',
        time: '11:01am',
        dayOfWeek: '3',
        glucoseValue: 133,
        carbohydrates: 50,
      },
    ],
    [
      {
        date: 'Thu, 15 Feb 2018',
        time: '11:26am',
        dayOfWeek: '4',
        glucoseValue: 47,
        carbohydrates: null,
      },
      {
        date: 'Thu, 15 Feb 2018',
        time: '3:07pm',
        dayOfWeek: '4',
        glucoseValue: 135,
        carbohydrates: null,
      },
    ],
  ],
};

const mockState = {
  ui: {
    patientDashboard: {
      glucoseMeasurements: [
        {
          value: 117.0,
          date: '2016-11-30 06:23:33 GMT+0000',
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: 217.0,
          date: '2016-12-01 06:23:33 GMT+0000',
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
        {
          value: 100.0,
          date: '2016-12-03 07:23:33 GMT+0000',
          beforeMeal: false,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: 50,
        },
        {
          value: null,
          date: '2016-12-03 07:23:33 GMT+0000',
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: 30,
        },
        {
          value: 120.0,
          date: '2016-12-03 12:23:33 GMT+0000',
          beforeMeal: true,
          afterMeal: false,
          hypoSymptoms: false,
          carbohydrates: null,
        },
      ],
      insulin: {
        basals: [
          {
            date: '2016-11-30 06:23:33 GMT+0000',
            cbrf: 1.1,
            profile: 1,
            remark: 'Stop',
            tbrdec: undefined,
            tbrinc: undefined,
          },
          {
            date: '2016-12-01 20:23:33 GMT+0000',
            cbrf: 0.7,
            profile: 2,
            remark: 'Run',
            tbrdec: undefined,
            tbrinc: undefined,
          },
          {
            date: '2016-12-03 07:23:33 GMT+0000',
            cbrf: 0.7,
            profile: 1,
            remark: 'time / date set',
            tbrdec: undefined,
            tbrinc: undefined,
          },
        ],
        bolus: [
          {
            date: '2016-11-30 06:23:33 GMT+0000',
            value: 0,
            registerType: 'Bolus',
            bolusType: 'Std',
          },
          {
            date: '2016-12-01 20:23:33 GMT+0000',
            value: 17.6,
            registerType: 'Bolus',
            bolusType: 'Ext',
          },
          {
            date: '2016-12-01 00:00:00 GMT+0000',
            value: 17.6,
            registerType: 'BolusTotal',
            bolusType: null,
          },
          {
            date: '2016-12-03 07:23:33 GMT+0000',
            value: 4.1,
            registerType: 'Bolus',
            bolusType: 'Scr',
          },
          {
            date: '2016-12-01 12:00:00 GMT+0000',
            value: 3.1,
            registerType: 'Bolus',
            bolusType: 'Mul',
          },
        ],
      },
    },
    patientDateRange: {
      startDate: new Date('2016-11-29 06:23:33 GMT+0000'),
      endDate: new Date('2016-12-06 10:23:33 GMT+0000'),
    },
  },
  stripDelivery: {
    thresholds: {
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
};

describe('Logbook Diary Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LogbookDiary {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Logbook Diary selector test suite', () => {
  const measurementWithNewDate = measurement => ({
    ...measurement,
    date: new Date(measurement.date),
  });

  const mockStateWithNewDates = {
    ...mockState,
    ui: {
      ...mockState.ui,
      patientDashboard: {
        ...mockState.ui.patientDashboard,
        glucoseMeasurements: mockState.ui.patientDashboard.glucoseMeasurements.map(
          measurementWithNewDate,
        ),
        insulin: {
          basals: mockState.ui.patientDashboard.insulin.basals.map(
            measurementWithNewDate,
          ),
          bolus: mockState.ui.patientDashboard.insulin.bolus.map(
            measurementWithNewDate,
          ),
        },
      },
    },
  };

  test('selectLogbookDiaryData works', () => {
    expect(selectLogbookDiaryData(mockStateWithNewDates)).toEqual([
      [
        {
          date: 'Wednesday, Nov 30, 2016',
          dateLine1: 'Wednesday,',
          dateLine2: 'Nov 30, 2016',
          time: '06:23',
          dayOfWeek: '3',
          glucoseValue: 117.0,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: false,
          basalCbrf: undefined,
          basalRateProfile: undefined,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [
            'beforeMeal',
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: null,
        },
        {
          date: 'Wednesday, Nov 30, 2016',
          dateLine1: 'Wednesday,',
          dateLine2: 'Nov 30, 2016',
          time: '06:23',
          dayOfWeek: '3',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: undefined,
          basalRateProfile: undefined,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: 0,
          bolusRemark: undefined,
          bolusRegisterType: 'Bolus',
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: 'standard',
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
        {
          date: 'Wednesday, Nov 30, 2016',
          dateLine1: 'Wednesday,',
          dateLine2: 'Nov 30, 2016',
          time: '06:23',
          dayOfWeek: '3',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: 1.1,
          basalRateProfile: undefined,
          basalRemark: 'Stop',
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: undefined,
          pumpIcon: 'stop',
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
      ],
      [
        {
          date: 'Thursday, Dec 1, 2016',
          dateLine1: 'Thursday,',
          dateLine2: 'Dec 1, 2016',
          time: '06:23',
          dayOfWeek: '4',
          glucoseValue: 217.0,
          aboveTargetRange: true,
          belowTargetRange: false,
          hypoSymptoms: false,
          basalCbrf: undefined,
          basalRateProfile: undefined,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [
            'beforeMeal',
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: null,
        },
        {
          date: 'Thursday, Dec 1, 2016',
          dateLine1: 'Thursday,',
          dateLine2: 'Dec 1, 2016',
          time: '12:00',
          dayOfWeek: '4',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: undefined,
          basalRateProfile: undefined,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: 3.1,
          bolusRemark: undefined,
          bolusRegisterType: 'Bolus',
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: 'multiwave',
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
        {
          date: 'Thursday, Dec 1, 2016',
          dateLine1: 'Thursday,',
          dateLine2: 'Dec 1, 2016',
          time: '20:23',
          dayOfWeek: '4',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: undefined,
          basalRateProfile: undefined,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: 17.6,
          bolusRemark: undefined,
          bolusRegisterType: 'Bolus',
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: 'extended',
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
        {
          date: 'Thursday, Dec 1, 2016',
          dateLine1: 'Thursday,',
          dateLine2: 'Dec 1, 2016',
          time: '20:23',
          dayOfWeek: '4',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: 0.7,
          basalRateProfile: 2,
          basalRemark: 'Run',
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: undefined,
          pumpIcon: 'run',
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
      ],
      [
        {
          date: 'Saturday, Dec 3, 2016',
          dateLine1: 'Saturday,',
          dateLine2: 'Dec 3, 2016',
          time: '07:23',
          dayOfWeek: '6',
          glucoseValue: null,
          aboveTargetRange: false,
          belowTargetRange: true,
          hypoSymptoms: false,
          basalCbrf: undefined,
          basalRateProfile: 2,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [
            'beforeMeal',
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: 30,
        },
        {
          date: 'Saturday, Dec 3, 2016',
          dateLine1: 'Saturday,',
          dateLine2: 'Dec 3, 2016',
          time: '07:23',
          dayOfWeek: '6',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: 0.7,
          basalRateProfile: 2,
          basalRemark: 'time / date set',
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
        {
          date: 'Saturday, Dec 3, 2016',
          dateLine1: 'Saturday,',
          dateLine2: 'Dec 3, 2016',
          time: '07:23',
          dayOfWeek: '6',
          glucoseValue: 100.0,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: false,
          basalCbrf: undefined,
          basalRateProfile: 2,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: 50,
        },
        {
          date: 'Saturday, Dec 3, 2016',
          dateLine1: 'Saturday,',
          dateLine2: 'Dec 3, 2016',
          time: '07:23',
          dayOfWeek: '6',
          glucoseValue: undefined,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: undefined,
          basalCbrf: undefined,
          basalRateProfile: 2,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: 4.1,
          bolusRemark: undefined,
          bolusRegisterType: 'Bolus',
          glucoseIcons: [undefined, undefined, undefined, undefined, undefined],
          bolusTypeIcon: 'quick',
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: undefined,
        },
        {
          date: 'Saturday, Dec 3, 2016',
          dateLine1: 'Saturday,',
          dateLine2: 'Dec 3, 2016',
          time: '12:23',
          dayOfWeek: '6',
          glucoseValue: 120.0,
          aboveTargetRange: false,
          belowTargetRange: false,
          hypoSymptoms: false,
          basalCbrf: undefined,
          basalRateProfile: 2,
          basalRemark: undefined,
          basalTbrdec: undefined,
          basalTbrinc: undefined,
          bolusValue: undefined,
          bolusRemark: undefined,
          bolusRegisterType: undefined,
          glucoseIcons: [
            'beforeMeal',
            undefined,
            undefined,
            undefined,
            undefined,
          ],
          bolusTypeIcon: undefined,
          pumpIcon: undefined,
          pumpTextAfterIcon: undefined,
          pumpTextBeforeIcon: undefined,
          carbohydrates: null,
        },
      ],
    ]);
  });
});

describe('Logbook Diary Utils', () => {
  it('should determine correct glucose icons', () => {
    const measurement = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
    };

    const thresholds = {
      glucoseIdealIntervalMax: 128,
      glucoseIdealIntervalMin: 98,
      hypoglycemiaThreshold: 88,
    };

    const expectedIcons = [
      'hypo',
      'beforeMeal',
      undefined,
      undefined,
      undefined,
    ];

    expect(getGlucoseIcons(measurement, thresholds)).toEqual(expectedIcons);
  });

  it('should determine correct bolus type icons', () => {
    const measurement = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 1,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const expectedIcon = 'standard';

    expect(getBolusTypeIcon(measurement)).toEqual(expectedIcon);
  });

  it('should get correct basal rate profile', () => {
    const listOfMeasurementsWithUpdatedBasalRateProfile = [
      {
        aboveTargetRange: false,
        afterMeal: false,
        beforeMeal: true,
        belowTargetRange: true,
        carbohydrates: null,
        date: 'Tue Feb 25 2018 16:42:00 GMT+0000',
        hypoSymptoms: false,
        value: 78,
        basalCbrf: 0.3,
        basalRateProfile: 1,
        basalRemark: 'Run',
        basalTbrdec: undefined,
        basalTbrinc: undefined,
        bolusValue: 3.5,
        bolusRemark: null,
        bolusRegisterType: 'Bolus',
        bolusType: 'Std',
      },
    ];

    const index = 1;

    const measurementWithRemarkRun = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 1,
      basalRemark: 'Run',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const measurementWithRemarkStop = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 2,
      basalRemark: 'Stop',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const measurementWithRemarkTimeDateSet = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: 'time / date set',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    expect(
      getBasalRateProfile(
        measurementWithRemarkRun,
        index,
        listOfMeasurementsWithUpdatedBasalRateProfile,
      ),
    ).toEqual(1);

    expect(
      getBasalRateProfile(
        measurementWithRemarkStop,
        index,
        listOfMeasurementsWithUpdatedBasalRateProfile,
      ),
    ).toEqual(undefined);

    expect(
      getBasalRateProfile(
        measurementWithRemarkTimeDateSet,
        index,
        listOfMeasurementsWithUpdatedBasalRateProfile,
      ),
    ).toEqual(1);
  });

  it('should return true when basalRemark matches regex condition', () => {
    const basalRemark = '1 - 2';
    const condition = /^[1-5|A-B]\s-\s[1-5|A-B]$/;

    expect(basalRemarkMatchesRegexCondition(basalRemark)(condition)).toBe(true);
  });

  it('should determine correct pump icon identifier', () => {
    const basalRemark1 = '1 - 2';
    const basalTbrdec1 = null;
    const basalTbrinc1 = null;

    const basalRemark2 = 'Run';
    const basalTbrdec2 = null;
    const basalTbrinc2 = null;

    const basalRemark3 = null;
    const basalTbrdec3 = '70%';
    const basalTbrinc3 = null;

    const basalRemark4 = null;
    const basalTbrdec4 = null;
    const basalTbrinc4 = '120%';

    expect(
      getPumpIconIdentifier(basalRemark1, basalTbrdec1, basalTbrinc1),
    ).toEqual('changedProfile');

    expect(
      getPumpIconIdentifier(basalRemark2, basalTbrdec2, basalTbrinc2),
    ).toEqual('run');

    expect(
      getPumpIconIdentifier(basalRemark3, basalTbrdec3, basalTbrinc3),
    ).toEqual('tbrdec');

    expect(
      getPumpIconIdentifier(basalRemark4, basalTbrdec4, basalTbrinc4),
    ).toEqual('tbrinc');
  });

  it('should determine correct pump icon', () => {
    const measurement = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: 'Stop',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const expectedIcon = 'stop';

    expect(getPumpIcon(measurement)).toEqual(expectedIcon);
  });

  it('should get correct text before pump icon', () => {
    const measurement1 = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: 'Stop',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const measurement2 = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: '1 - 2',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    expect(getTextBeforePumpIcon(measurement1)).toEqual(undefined);

    expect(getTextBeforePumpIcon(measurement2)).toEqual('1');
  });

  it('should get correct text after pump icon', () => {
    const measurement1 = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: 'Stop',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    const measurement2 = {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: 'Tue Feb 27 2018 16:42:00 GMT+0000',
      hypoSymptoms: false,
      value: 78,
      basalCbrf: 0.3,
      basalRateProfile: 3,
      basalRemark: '1 - 2',
      basalTbrdec: undefined,
      basalTbrinc: undefined,
      bolusValue: 3.5,
      bolusRemark: null,
      bolusRegisterType: 'Bolus',
      bolusType: 'Std',
    };

    expect(getTextAfterPumpIcon(measurement1)).toEqual(undefined);

    expect(getTextAfterPumpIcon(measurement2)).toEqual('2');
  });

  it('should return the insulin1 value if defined', () => {
    const measurement = {
      insulin1: 10,
    };

    expect(getBolusValue(measurement)).toEqual(10);
  });

  it('should return the bolusValue if defined', () => {
    const measurement = {
      bolusValue: 10,
    };

    expect(getBolusValue(measurement)).toEqual(10);
  });

  it('should first check the bolusValue and return it', () => {
    const measurement = {
      bolusValue: 10,
      insulin1: 20,
    };

    expect(getBolusValue(measurement)).toEqual(10);
  });
});
