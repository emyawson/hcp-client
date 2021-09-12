import { convertJSDateGMT } from 'src/domains/diagnostics/utils';
import { TIME_INTERVAL, PAGER_TYPE } from 'src/domains/diagnostics/constants';

import {
  calculateEndDateAfterPagination,
  calculateForVariability,
  calculateMeanBloodGlucose,
  createCalculateForHypoglycaemia,
  hasReliableInfo,
  isHypoRiskLow,
  isHypoRiskMedium,
  isHypoRiskHigh,
  toHypoglycaemiaCount,
  toHypoRiskStatus,
  toMeanBloodGlucoseStatus,
  toMeanBloodGlucoseValue,
  toTimeIntervals,
  toVariabilityStatus,
} from './blood-glucose-overview.utils';
import {
  HYPO_RISK_THRESHOLDS,
  TRAFFIC_LIGHT_COLORS,
  TRAFFIC_LIGHT_LABELS,
} from './blood-glucose-overview.constants';
import {
  dayInHalfTimeIntervals,
  evenDistributedDay1,
  evenDistributedDay2,
  evenDistributedDay3,
  evenDistributedDay4,
  evenDistributedDay5,
  evenDistributedDay6,
  evenDistributedDay7,
  unEvenDistributedDay1,
  unEvenDistributedDay2,
} from './blood-glucose-overview.mock';

const convertObjectJsDateToGMT = object => ({
  ...object,
  date: convertJSDateGMT(object.date),
});

describe('toVariabilityStatus test suite', () => {
  it('should return correctly calculated variability, interval and number of measurements', () => {
    const input = [
      {
        interval: '',
        measurements: [{ value: 60 }, { value: 120 }, { value: 240 }],
        conditionsMet: true,
      },
    ];
    const expected = [
      {
        interval: '',
        numberOfMeasurements: 3,
        value: 65.5,
        conditionsMet: true,
      },
    ];

    expect(calculateForVariability(input)).toEqual(expected);
  });

  it('should return low traffic light options when value < 33', () => {
    const input = [
      { numberOfMeasurements: 29, value: 29, conditionsMet: true },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.LOW,
      },
    ];

    expect(toVariabilityStatus(input)).toEqual(expected);
  });

  it('should return medium traffic light options when value >= 33 and < 50', () => {
    const input = [
      { numberOfMeasurements: 30, value: 33, conditionsMet: true },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.MEDIUM,
      },
    ];

    expect(toVariabilityStatus(input)).toEqual(expected);
  });

  it('should return high traffic light options when value >= 50', () => {
    const input = [
      { numberOfMeasurements: 28, value: 50, conditionsMet: true },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.HIGH,
      },
    ];

    expect(toVariabilityStatus(input)).toEqual(expected);
  });

  it('should return corresponding color with insufficient info label when there are less than 28 measurements', () => {
    const input = [
      { numberOfMeasurements: 27, value: 15 },
      { numberOfMeasurements: 12, value: 35 },
      { numberOfMeasurements: 20, value: 60 },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
    ];

    expect(toVariabilityStatus(input)).toEqual(expected);
  });
});

describe('toMeanGlucoseStatus test suite', () => {
  const thresholds = {
    upperHyperThreshold: 240,
    glucoseIdealIntervalMin: 80,
    glucoseIdealIntervalMax: 120,
    hypoglycemiaThreshold: 70,
  };

  it('should return corresponding colors with insufficient conditions are met', () => {
    const input = [
      { numberOfMeasurements: 15, value: 60, conditionsMet: false },
      { numberOfMeasurements: 18, value: 110, conditionsMet: false },
      { numberOfMeasurements: 10, value: 239, conditionsMet: false },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
    ];
    const actual = toMeanBloodGlucoseStatus(input, thresholds);

    expect(actual).toEqual(expected);
  });

  it('should return yellow and red color with hypo label', () => {
    const input = [
      { numberOfMeasurements: 48, value: 60, conditionsMet: true },
      { numberOfMeasurements: 32, value: 70, conditionsMet: true },
    ];
    const expected = [
      { color: TRAFFIC_LIGHT_COLORS.RED, label: TRAFFIC_LIGHT_LABELS.HYPO },
      { color: TRAFFIC_LIGHT_COLORS.YELLOW, label: TRAFFIC_LIGHT_LABELS.HYPO },
    ];
    const actual = toMeanBloodGlucoseStatus(input, thresholds);

    expect(actual).toEqual(expected);
  });

  it('should return green color with in range label', () => {
    const input = [
      { numberOfMeasurements: 37, value: 100, conditionsMet: true },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.IN_RANGE,
      },
    ];
    const actual = toMeanBloodGlucoseStatus(input, thresholds);

    expect(actual).toEqual(expected);
  });

  it('should return yellow and red color with hyper label', () => {
    const input = [
      { isNA: false, value: 230, conditionsMet: true },
      { isNA: false, value: 250, conditionsMet: true },
    ];
    const expected = [
      { color: TRAFFIC_LIGHT_COLORS.YELLOW, label: TRAFFIC_LIGHT_LABELS.HYPER },
      { color: TRAFFIC_LIGHT_COLORS.RED, label: TRAFFIC_LIGHT_LABELS.HYPER },
    ];
    const actual = toMeanBloodGlucoseStatus(input, thresholds);

    expect(actual).toEqual(expected);
  });
});

describe('toMeanGlucoseValue test suite', () => {
  it('should return the mean for a given interval rounded to the nearest integer', () => {
    const input = [
      {
        interval: '',
        measurements: [
          { value: 50 },
          { value: 55 },
          { value: 60 },
          { value: 65 },
        ],
        conditionsMet: true,
      },
    ];
    const expected = [
      {
        interval: '',
        value: 58,
        numberOfMeasurements: 4,
        conditionsMet: true,
      },
    ];
    const actual = calculateMeanBloodGlucose(input);

    expect(actual).toEqual(expected);
  });

  it('should return just the mean value of each date range', () => {
    const input = [
      {
        interval: '',
        value: '58',
        numberOfMeasurements: 40,
      },
    ];
    const expected = ['58'];
    const actual = toMeanBloodGlucoseValue(input);
    expect(actual).toEqual(expected);
  });
});

describe('calculateForHypoglycaemia test suite', () => {
  it('should calculate the correct number of hypoglycemic measurements', () => {
    const calculateForHypoglycaemia = createCalculateForHypoglycaemia(85);
    const input = [
      {
        interval: '',
        measurements: [
          { date: new Date('Tue Jan 2 2018 16:40:00 GMT+0000'), value: 80 },
        ],
      },
      {
        interval: '',
        measurements: [
          { date: new Date('Tue Jan 10 2018 16:41:00 GMT+0000'), value: 100 },
          { date: new Date('Tue Jan 10 2018 16:42:00 GMT+0000'), value: 180 },
        ],
      },
      {
        interval: '',
        measurements: [
          { date: new Date('Tue Jan 20 2018 16:40:00 GMT+0000'), value: 80 },
          { date: new Date('Tue Jan 20 2018 16:41:00 GMT+0000'), value: 100 },
          { date: new Date('Tue Jan 20 2018 16:42:00 GMT+0000'), value: 280 },
        ],
      },
    ];
    const expected = [
      { interval: '', numberOfMeasurements: 1, value: 1 },
      { interval: '', numberOfMeasurements: 2, value: 0 },
      { interval: '', numberOfMeasurements: 3, value: 1 },
    ];

    expect(calculateForHypoglycaemia(input)).toEqual(expected);
  });
});

describe('toHypoglycaemiaCount test suite', () => {
  it('should correctly round values to one decimal place', () => {
    const input = [
      { interval: '', value: 1 },
      { interval: '', value: 0 },
      { interval: '', value: 1 },
    ];
    const expected = ['1', '0', '1'];

    expect(toHypoglycaemiaCount(input)).toEqual(expected);
  });
});

describe('toTimeIntervals test suite', () => {
  it('should return array of extracted intervals', () => {
    const input = [{ interval: 'a' }, { interval: 'b' }, { interval: 'c' }];
    const expected = [
      { info: null, label: 'a' },
      { info: null, label: 'b' },
      { info: null, label: 'c' },
    ];
    expect(toTimeIntervals(input)).toEqual(expected);
  });
});

describe('calculateEndDateAfterPagination, util', () => {
  it('returns endDate representing the next interval when Nexting', () => {
    const pagerType = PAGER_TYPE.NEXT;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Jun 15 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 1 2017 GMT+0000'));

    const expected = new Date('Jul 31 2017 23:59:59.999 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });

  it('returns the same endDate when Nexting from the last interval', () => {
    const pagerType = PAGER_TYPE.NEXT;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Nov 5 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 15 2017 GMT+0000'));

    const expected = new Date('Nov 15 2017 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });
  it('returns endDate representing 6 interval forward when Super Nexting', () => {
    const pagerType = PAGER_TYPE.SUPER_NEXT;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Mar 5 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 15 2017 GMT+0000'));

    const expected = new Date('Sep 30 2017 23:59:59.999 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });
  it('never return an enddate representing interval after the last interval when Super Nexting', () => {
    const pagerType = PAGER_TYPE.SUPER_NEXT;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Aug 5 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 15 2017 GMT+0000'));

    const expected = new Date('Nov 15 2017 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });
  it('returns endDate representing the previous interval when Preving', () => {
    const pagerType = PAGER_TYPE.PREV;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Sep 15 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 1 2017 GMT+0000'));

    const expected = new Date('Aug 31 2017 23:59:59.999 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });

  it('returns endDate representing the previous 6 interval when super Preving', () => {
    const pagerType = PAGER_TYPE.SUPER_PREV;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Apr 15 2018 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 1 2017 GMT+0000'));

    const expected = new Date('Oct 31 2017 23:59:59.999 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });

  it('never return endDate representing interval before the first interval when Preving', () => {
    const pagerType = PAGER_TYPE.PREV;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('May 15 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 1 2017 GMT+0000'));

    const expected = new Date('Jul 1 2017 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });

  it('never return endDate representing interval before the first interval when super Preving', () => {
    const pagerType = PAGER_TYPE.SUPER_PREV;
    const interval = TIME_INTERVAL.MONTHLY_INTERVALS;
    const endDate = convertJSDateGMT(new Date('Sep 15 2017 GMT+0000'));
    const firstDate = convertJSDateGMT(new Date('Feb 1 2017 GMT+0000'));
    const lastDate = convertJSDateGMT(new Date('Nov 1 2017 GMT+0000'));

    const expected = new Date('Jul 1 2017 GMT+0000');
    const actual = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstDate,
      lastDate,
    );
    expect(actual).toEqual(expected);
  });
});

describe('isHypoRiskLow, isHypoRiskMedium isHypoRiskHigh utils test suite', () => {
  it('Should correctly determine whether lbgi is low risk', () => {
    const lowRiskLBGIValue = 0.9;

    expect(
      isHypoRiskLow(0) && !isHypoRiskMedium(0) && !isHypoRiskHigh(0),
    ).toBeTruthy();
    expect(
      isHypoRiskLow(lowRiskLBGIValue) &&
        !isHypoRiskMedium(lowRiskLBGIValue) &&
        !isHypoRiskHigh(lowRiskLBGIValue),
    ).toBeTruthy();
    expect(
      isHypoRiskLow(HYPO_RISK_THRESHOLDS.MEDIUM) &&
        !isHypoRiskMedium(HYPO_RISK_THRESHOLDS.MEDIUM) &&
        !isHypoRiskHigh(HYPO_RISK_THRESHOLDS.MEDIUM),
    ).toBeTruthy();
  });
  it('Should correctly determine whether lbgi is medium risk', () => {
    const mediumRiskLBGIValue = 1.4;

    expect(
      !isHypoRiskLow(mediumRiskLBGIValue) &&
        isHypoRiskMedium(mediumRiskLBGIValue) &&
        !isHypoRiskHigh(mediumRiskLBGIValue),
    ).toBeTruthy();
    expect(
      !isHypoRiskLow(HYPO_RISK_THRESHOLDS.HIGH) &&
        isHypoRiskMedium(HYPO_RISK_THRESHOLDS.HIGH) &&
        !isHypoRiskHigh(HYPO_RISK_THRESHOLDS.HIGH),
    ).toBeTruthy();
  });
  it('Should correctly determine whether lbgi is high risk', () => {
    const highRiskLBGIValue = 2.8;

    expect(
      !isHypoRiskLow(highRiskLBGIValue) &&
        !isHypoRiskMedium(highRiskLBGIValue) &&
        isHypoRiskHigh(highRiskLBGIValue),
    ).toBeTruthy();
  });
});

describe('toHypoRiskStatus', () => {
  it('should convert hypo risk measurements to statuses', () => {
    const hypoRisks = [
      {
        lbgi: 0.1,
        numberOfMeasurements: 28,
        conditionsMet: true,
      },
      {
        lbgi: 1.6,
        numberOfMeasurements: 28,
        conditionsMet: true,
      },
      {
        lbgi: 2.6,
        numberOfMeasurements: 28,
        conditionsMet: true,
      },
      {
        lbgi: HYPO_RISK_THRESHOLDS.MEDIUM,
        numberOfMeasurements: 26,
        conditionsMet: false,
      },
      {
        lbgi: HYPO_RISK_THRESHOLDS.HIGH,
        numberOfMeasurements: 27,
        conditionsMet: false,
      },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.LOW,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.MEDIUM,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.HIGH,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
    ];
    const actual = toHypoRiskStatus(hypoRisks);

    expect(actual).toEqual(expected);
  });

  it('should output N/A label if insufficient information', () => {
    const hypoRisks = [
      {
        lbgi: 0.1,
        conditionsMet: false,
        numberOfMeasurements: 24,
      },
      {
        lbgi: 1.6,
        conditionsMet: false,
        numberOfMeasurements: 24,
      },
      {
        lbgi: 2.6,
        conditionsMet: false,
        numberOfMeasurements: 24,
      },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GREEN,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.YELLOW,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
      {
        color: TRAFFIC_LIGHT_COLORS.RED,
        label: TRAFFIC_LIGHT_LABELS.INSUFFICIENT_INFO,
      },
    ];
    const actual = toHypoRiskStatus(hypoRisks);

    expect(actual).toEqual(expected);
  });

  it('should return a no info label if there are no measurements', () => {
    const hypoRisks = [
      {
        lbgi: 0,
        conditionsMet: false,
        numberOfMeasurements: 0,
      },
    ];
    const expected = [
      {
        color: TRAFFIC_LIGHT_COLORS.GRAY,
        label: TRAFFIC_LIGHT_LABELS.NO_INFO,
      },
    ];
    const actual = toHypoRiskStatus(hypoRisks);

    expect(actual).toEqual(expected);
  });
});

describe('hasReliableInfo test suite', () => {
  it('should return true when measurements meet criteria of there being at least 28 measurements, 2 measurements per day and measurements are sufficiently distributed ', () => {
    const measurements = [
      ...evenDistributedDay1,
      ...evenDistributedDay2,
      ...evenDistributedDay3,
      ...evenDistributedDay4,
      ...evenDistributedDay5,
      ...evenDistributedDay6,
      ...evenDistributedDay7,
    ].map(convertObjectJsDateToGMT);
    const numberOfTests = 35;
    expect(
      hasReliableInfo(measurements, numberOfTests, dayInHalfTimeIntervals),
    ).toBeTruthy();
  });

  it('should return false when there are less than 28 measurements', () => {
    const measurements = [
      ...evenDistributedDay1,
      ...evenDistributedDay2,
      ...evenDistributedDay3,
      ...evenDistributedDay4,
      ...evenDistributedDay5,
    ].map(convertObjectJsDateToGMT);
    const numberOfTests = 25;
    expect(
      hasReliableInfo(measurements, numberOfTests, dayInHalfTimeIntervals),
    ).toBeFalsy();
  });

  it('should return false when there are less than 2 measurements per day', () => {
    const measurements = [
      evenDistributedDay1[0],
      evenDistributedDay2[0],
      evenDistributedDay3[0],
      evenDistributedDay4[0],
      ...evenDistributedDay5,
    ].map(convertObjectJsDateToGMT);

    const numberOfTests = 28; // actually 9, but should return false when there are less than 2 measurements per day
    expect(
      hasReliableInfo(measurements, numberOfTests, dayInHalfTimeIntervals),
    ).toBeFalsy();
  });

  it('should return false when measurements are not adequately distributed', () => {
    const measurements = [
      ...unEvenDistributedDay1,
      ...unEvenDistributedDay2,
      ...evenDistributedDay3,
      ...evenDistributedDay4,
      ...evenDistributedDay5,
      ...evenDistributedDay6,
      ...evenDistributedDay7,
    ].map(convertObjectJsDateToGMT);
    const numberOfTests = 35;
    expect(
      hasReliableInfo(measurements, numberOfTests, dayInHalfTimeIntervals),
    ).toBeFalsy();
  });
});
