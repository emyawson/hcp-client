import { colors } from 'src/domains/diagnostics/styles';
import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';

import {
  formatGraphsDate,
  generateShape,
  getMeasurementDates,
  getMeasurementsTotalDays,
  getToolTipValueColor,
  isSameDay,
  isStandardDayDetailGraph,
  measurementsToDateRange,
  mergeOnDate,
  normalizeVerticalTickValues,
  removeDuplicateDaysFromSortedDateArray,
  togglePointsFilter,
  createThresholdTicks,
  createYAxisTickValues,
  areDatesTheSameDay,
} from './graph.util';
import {
  GRAPH_STANDARD_DAY,
  GRAPH_TYPE_TREND,
  GRAPH_STANDARD_WEEK,
  GRAPH_TYPE_DETAILS,
} from './graph.constants';

const mockThreshold1 = {
  glucoseIdealIntervalMax: 125,
  glucoseIdealIntervalMin: 80,
  hypoglycemiaThreshold: 60,
};

const mockThreshold2 = {
  glucoseIdealIntervalMax: 125,
  glucoseIdealIntervalMin: 115,
  hypoglycemiaThreshold: 60,
};

const mockThreshold3 = {
  glucoseIdealIntervalMax: 125,
  glucoseIdealIntervalMin: 65,
  hypoglycemiaThreshold: 60,
};

const mockThreshold4 = {
  glucoseIdealIntervalMax: 145,
  glucoseIdealIntervalMin: 95,
  hypoglycemiaThreshold: 60,
};

describe('Axis ticks util', () => {
  it('should return all the values for when the threshold diffs are more than 15', () => {
    expect(createThresholdTicks(mockThreshold1)).toEqual({
      hypoglycemiaTicks: [60],
      idealIntervalTicks: [125, 80],
    });
  });

  it('should not return glucoseIdealIntervalMin when the threshold diff is less than 15 between glucoseIdealIntervalMax and glucoseIdealIntervalMin', () => {
    expect(createThresholdTicks(mockThreshold2)).toEqual({
      hypoglycemiaTicks: [60],
      idealIntervalTicks: [125],
    });
  });

  it('should not return glucoseIdealIntervalMin when the threshold diff is less than 15 between hypoglycemiaThreshold and glucoseIdealIntervalMin', () => {
    expect(createThresholdTicks(mockThreshold3)).toEqual({
      hypoglycemiaTicks: [60],
      idealIntervalTicks: [125],
    });
  });

  it('should not return incremental values when the diffs are less than 15 with any threshold values', () => {
    const ticks = createYAxisTickValues(mockThreshold4, 50);
    expect(
      ticks.indexOf(150) === -1 &&
        ticks.indexOf(100) === -1 &&
        ticks.indexOf(50) === -1,
    ).toEqual(true);
  });
});

const mockedParams = {
  measurements: [
    {
      date: convertISOToJsGMT('Tue Nov 6 2017 16:12:53 GMT+0000'),
      value: 70.0,
    },
    {
      date: convertISOToJsGMT('Tue Nov 7 2017 20:12:53 GMT+0000'),
      value: 180.0,
    },
    {
      date: convertISOToJsGMT('Tue Nov 8 2017 02:12:53 GMT+0000'),
      value: 200.0,
    },
    {
      date: convertISOToJsGMT('Tue Nov 8 2017 10:12:53 GMT+0000'),
      value: 120.0,
    },
  ],
  date: convertISOToJsGMT('Tue Nov 8 2017 10:12:53 GMT+0000'),
};

describe('measurementsToDateRange util', () => {
  it('should return correct start and end dates', () => {
    expect(measurementsToDateRange(mockedParams.measurements)).toEqual({
      start: convertISOToJsGMT('Tue Nov 6 2017 16:12:53 GMT+0000'),
      end: convertISOToJsGMT('Tue Nov 8 2017 10:12:53 GMT+0000'),
    });
  });
  it('should return formatted date', () => {
    expect(formatGraphsDate(mockedParams.date)).toEqual('11/08/2017');
  });
});

const mockedState = {
  dashboard: {
    glucoseMeasurements: [
      {
        date: convertISOToJsGMT('Wed Nov 08 2017 13:39:25 GMT+0000'),
        beforeMeal: true,
        afterMeal: false,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 230,
      },
      {
        date: convertISOToJsGMT('Wed Nov 09 2017 13:39:25 GMT+0000'),
        beforeMeal: false,
        afterMeal: true,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 479,
      },
    ],
  },
};

describe('generateShape util', () => {
  it('should generate correct shape', () => {
    expect(generateShape(mockedState.dashboard.glucoseMeasurements[0])).toEqual(
      {
        type: 'rectangle',
        style: {
          strokeColor: colors.blueLight,
          fillColor: colors.white,
        },
      },
    );
  });
});

describe('isStandardDayDetailGraph util', () => {
  it('should return true when graph=standard-day, graphType=details', () => {
    const graph = GRAPH_STANDARD_DAY;
    const graphType = GRAPH_TYPE_DETAILS;
    const actual = isStandardDayDetailGraph(graph, graphType);
    expect(actual).toBeTruthy();
  });
  it('should return false when graph=standard-day, graphType=trend', () => {
    const graph = GRAPH_STANDARD_DAY;
    const graphType = GRAPH_TYPE_TREND;
    const actual = isStandardDayDetailGraph(graph, graphType);
    expect(actual).toBeFalsy();
  });
  it('should return false when graph=standard-week, graphType=trend', () => {
    const graph = GRAPH_STANDARD_WEEK;
    const graphType = GRAPH_TYPE_DETAILS;
    const actual = isStandardDayDetailGraph(graph, graphType);
    expect(actual).toBeFalsy();
  });
});

describe('getMeasurementsTotalDays util', () => {
  it('should get dates from an array of glucose measurements', () => {
    const { measurements } = mockedParams;
    expect(getMeasurementDates(measurements)).toEqual([
      convertISOToJsGMT('Tue Nov 6 2017 16:12:53 GMT+0000'),
      convertISOToJsGMT('Tue Nov 7 2017 20:12:53 GMT+0000'),
      convertISOToJsGMT('Tue Nov 8 2017 02:12:53 GMT+0000'),
      convertISOToJsGMT('Tue Nov 8 2017 10:12:53 GMT+0000'),
    ]);
  });

  it('should return true when both days are the same', () => {
    const {
      measurements: [, , { date: date1 }, { date: date2 }],
    } = mockedParams;
    expect(isSameDay(date1, date2)).toBeTruthy();
  });

  it('should return false when both days are not the same', () => {
    const {
      measurements: [{ date: date1 }, { date: date2 }],
    } = mockedParams;
    expect(isSameDay(date1, date2)).toBeFalsy();
  });

  it('should remove duplicates from sorted date array', () => {
    const { measurements } = mockedParams;
    const measurementDates = getMeasurementDates(measurements);
    expect(removeDuplicateDaysFromSortedDateArray(measurementDates)).toEqual([
      convertISOToJsGMT('Tue Nov 6 2017 16:12:53 GMT+0000'),
      convertISOToJsGMT('Tue Nov 7 2017 20:12:53 GMT+0000'),
      convertISOToJsGMT('Tue Nov 8 2017 02:12:53 GMT+0000'),
    ]);
  });

  it('should return total number of days from measurements array', () => {
    expect(getMeasurementsTotalDays([])).toBe(0);
    const { measurements } = mockedParams;
    expect(getMeasurementsTotalDays(measurements)).toBe(3);
  });
});

describe('getToolTipValueColor util', () => {
  const mockThreshold = 60;
  const mockTargetRange = { min: 100, max: 150 };

  it('should get the correct blue color for a value greater than the max target range', () => {
    expect(getToolTipValueColor(180, mockThreshold, mockTargetRange)).toEqual(
      colors.blueMarine,
    );
  });

  it('should get the correct black color for a value less than the max target range and greater than the threshold', () => {
    expect(getToolTipValueColor(130, mockThreshold, mockTargetRange)).toEqual(
      colors.black,
    );
  });

  it('should get the correct red color for a value less than the threshold', () => {
    expect(getToolTipValueColor(30, mockThreshold, mockTargetRange)).toEqual(
      colors.red,
    );
  });
});

describe('mergeOnDate util', () => {
  const measurements = [
    {
      date: 'Wed Nov 08 2017 13:39:25',
      beforeMeal: true,
      afterMeal: false,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 230,
    },
    {
      date: 'Wed Nov 09 2017 13:39:25',
      beforeMeal: false,
      afterMeal: true,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 479,
    },
  ];
  const basals = [
    {
      date: 'Wed Nov 08 2017 13:39:25',
      basalCbrf: 1.1,
      basalRateProfile: 1,
    },
    {
      date: 'Wed Nov 10 2017 13:39:25',
      basalCbrf: 0.7,
      basalRateProfile: 1,
    },
  ];
  const bolus = [
    {
      date: 'Wed Nov 08 2017 13:39:25',
      bolusValue: 0,
      bolusRegisterType: 'BolusTotal',
    },
    {
      date: 'Wed Nov 10 2017 13:39:25',
      bolusValue: 17.6,
      bolusRegisterType: 'BolusPlusBasalTotal',
    },
  ];
  const mergedResult = [
    {
      date: 'Wed Nov 08 2017 13:39:25',
      beforeMeal: true,
      afterMeal: false,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 230,
      basalCbrf: 1.1,
      basalRateProfile: 1,
      bolusValue: 0,
      bolusRegisterType: 'BolusTotal',
    },
    {
      date: 'Wed Nov 09 2017 13:39:25',
      beforeMeal: false,
      afterMeal: true,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 479,
    },
    {
      date: 'Wed Nov 10 2017 13:39:25',
      basalCbrf: 0.7,
      basalRateProfile: 1,
      bolusValue: 17.6,
      bolusRegisterType: 'BolusPlusBasalTotal',
    },
  ];

  it('should merge arrays of objects on common dates', () => {
    expect(mergeOnDate(measurements, basals, bolus)).toEqual(mergedResult);
  });
});

describe('normalizeVerticalTickValues util', () => {
  const verticalTicks = [
    { value: 0, label: '0', gridLine: true },
    { value: 50, label: '50', gridLine: true },
    { value: 100, label: '100', gridLine: true },
  ];
  const ceiling = 400;

  const expected = [
    { value: 0, label: '0', gridLine: true },
    { value: 50 / 400, label: '50', gridLine: true },
    { value: 100 / 400, label: '100', gridLine: true },
    { value: 400 / 400, label: '400', gridLine: true },
  ];

  it('should return normalized vertical tick values', () => {
    expect(normalizeVerticalTickValues(verticalTicks, ceiling)).toEqual(
      expected,
    );
  });
});

describe('togglePointsFilter', () => {
  const DAY_IN_MS = 86399999; // 12:00 am to 11:59:59:9999
  const MID_DAY = 43200000; // at 12:00 pm

  const glucoseMeasurements = [
    {
      date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000'),
      beforeMeal: true,
      afterMeal: false,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 230,
    },
    {
      date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000'),
      beforeMeal: false,
      afterMeal: true,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 300,
    },
    {
      date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000'),
      beforeMeal: false,
      afterMeal: true,
      aboveTargetRange: true,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 479,
    },
    {
      date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000'),
      beforeMeal: false,
      afterMeal: false,
      aboveTargetRange: false,
      belowTargetRange: false,
      hypoSymptoms: false,
      value: 93,
    },
    {
      date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000'),
      beforeMeal: false,
      afterMeal: false,
      aboveTargetRange: false,
      belowTargetRange: true,
      hypoSymptoms: true,
      value: 50,
    },
  ];

  const points = [
    {
      shape: 'square',
      x: MID_DAY / DAY_IN_MS,
      y: 230 / 400,
      strokeColor: colors.blueLight,
      fillColor: colors.white,
      data: glucoseMeasurements[0],
    },
    {
      shape: 'square',
      x: MID_DAY / DAY_IN_MS,
      y: 300 / 400,
      strokeColor: colors.blueLight,
      fillColor: colors.blueLight,
      data: glucoseMeasurements[1],
    },
    {
      shape: 'triangle',
      x: MID_DAY / DAY_IN_MS,
      y: 1,
      strokeColor: colors.blueLight,
      fillColor: colors.blueLight,
      data: glucoseMeasurements[2],
    },
    {
      shape: 'x',
      x: MID_DAY / DAY_IN_MS,
      y: 93 / 400,
      strokeColor: colors.black,
      fillColor: colors.white,
      data: glucoseMeasurements[3],
    },
    {
      shape: 'x',
      x: MID_DAY / DAY_IN_MS,
      y: 50 / 400,
      strokeColor: colors.red,
      fillColor: colors.white,
      data: glucoseMeasurements[4],
    },
  ];

  const toggles1 = {
    showBloodGlucosePoints: false,
    showBloodGlucoseBeforeMealPoints: true,
    showBloodGlucoseAfterMealPoints: true,
  };
  const toggles2 = {
    showBloodGlucosePoints: true,
    showBloodGlucoseBeforeMealPoints: false,
    showBloodGlucoseAfterMealPoints: true,
  };
  const toggles3 = {
    showBloodGlucosePoints: true,
    showBloodGlucoseBeforeMealPoints: true,
    showBloodGlucoseAfterMealPoints: false,
  };

  it('should filter out regular points', () => {
    const expected = [
      {
        shape: 'square',
        x: MID_DAY / DAY_IN_MS,
        y: 230 / 400,
        strokeColor: colors.blueLight,
        fillColor: colors.white,
        data: glucoseMeasurements[0],
      },
      {
        shape: 'square',
        x: MID_DAY / DAY_IN_MS,
        y: 300 / 400,
        strokeColor: colors.blueLight,
        fillColor: colors.blueLight,
        data: glucoseMeasurements[1],
      },
      {
        shape: 'triangle',
        x: MID_DAY / DAY_IN_MS,
        y: 1,
        strokeColor: colors.blueLight,
        fillColor: colors.blueLight,
        data: glucoseMeasurements[2],
      },
    ];
    const actual = togglePointsFilter(points, toggles1);

    expect(actual).toEqual(expected);
  });

  it('should filter out before meal points', () => {
    const expected = [
      {
        shape: 'square',
        x: MID_DAY / DAY_IN_MS,
        y: 300 / 400,
        strokeColor: colors.blueLight,
        fillColor: colors.blueLight,
        data: glucoseMeasurements[1],
      },
      {
        shape: 'triangle',
        x: MID_DAY / DAY_IN_MS,
        y: 1,
        strokeColor: colors.blueLight,
        fillColor: colors.blueLight,
        data: glucoseMeasurements[2],
      },
      {
        shape: 'x',
        x: MID_DAY / DAY_IN_MS,
        y: 93 / 400,
        strokeColor: colors.black,
        fillColor: colors.white,
        data: glucoseMeasurements[3],
      },
      {
        shape: 'x',
        x: MID_DAY / DAY_IN_MS,
        y: 50 / 400,
        strokeColor: colors.red,
        fillColor: colors.white,
        data: glucoseMeasurements[4],
      },
    ];
    const actual = togglePointsFilter(points, toggles2);

    expect(actual).toEqual(expected);
  });

  it('should filter out after meal points', () => {
    const expected = [
      {
        shape: 'square',
        x: MID_DAY / DAY_IN_MS,
        y: 230 / 400,
        strokeColor: colors.blueLight,
        fillColor: colors.white,
        data: glucoseMeasurements[0],
      },
      {
        shape: 'x',
        x: MID_DAY / DAY_IN_MS,
        y: 93 / 400,
        strokeColor: colors.black,
        fillColor: colors.white,
        data: glucoseMeasurements[3],
      },
      {
        shape: 'x',
        x: MID_DAY / DAY_IN_MS,
        y: 50 / 400,
        strokeColor: colors.red,
        fillColor: colors.white,
        data: glucoseMeasurements[4],
      },
    ];
    const actual = togglePointsFilter(points, toggles3);

    expect(actual).toEqual(expected);
  });
});

describe('areDatesTheSameDay test suite ', () => {
  it('Should return true if dates are the same day, regardless of time', () => {
    const dateWithEarlierTime = convertISOToJsGMT(
      'Feb 5 2018 12:00:00 GMT+0000',
    );
    const dateWithLaterTime = convertISOToJsGMT('Feb 5 2018 2:30:00 GMT+0000');
    expect(
      areDatesTheSameDay(dateWithEarlierTime, dateWithLaterTime),
    ).toBeTruthy();
  });
  it('Should return false when dates are not the same day', () => {
    const dateOnFirstDay = convertISOToJsGMT('Feb 5 2018 11:00:00 GMT+0000');
    const dateOnSecondDay = convertISOToJsGMT('Feb 6 2018 11:00:00 GMT+0000');
    expect(areDatesTheSameDay(dateOnFirstDay, dateOnSecondDay)).toBeFalsy();
  });
});
