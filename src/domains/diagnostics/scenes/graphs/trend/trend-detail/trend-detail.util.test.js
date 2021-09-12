import { Settings } from 'luxon';

import { colors } from 'src/domains/diagnostics/styles';
import { convertISOToJsGMT, toISO } from 'src/domains/diagnostics/utils';

import {
  calculateFullRange,
  convertMeasurementsToPoints,
  normalizeMeans,
  generateLines,
} from './trend-detail.util';

const DAY_IN_MS = 86399999; // 12:00 am to 11:59:59:9999
const MID_DAY = 43200000; // at 12:00 pm

const startDate = convertISOToJsGMT('Feb 5 2018 00:00:00 GMT+0000');
const endDate = convertISOToJsGMT('Feb 6 2018 23:59:59 GMT+0000');

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

const points2 = [
  {
    x: 0.1,
    y: 0.5,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
  {
    x: 0.2,
    y: 0.6,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
  {
    x: 0.3,
    y: 0.7,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
];

const points3 = [
  {
    x: 0.01,
    y: 0.5,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
  {
    x: 0.98,
    y: 0.6,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
  {
    x: 0.99,
    y: 0.7,
    data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
  },
];

const points4 = [
  {
    x: 0.9166666772762347,
    y: 0.125,
    data: { date: convertISOToJsGMT('Feb 5 2018 22:00:00 GMT+0000') },
  },
  {
    x: 1.041666678722994,
    y: 0.1875,
    data: { date: convertISOToJsGMT('Feb 6 2018 1:00:00 GMT+0000') },
  },
];

// there reason we are doing that is dates in the expected variables are brand new Luxon date
// therefore their weekData property is null, vs the array that gets return in some cases
// due to some date operations have an object assigned to the date object weekDate property
// for which we are caring in these tests
const convertDatesToISO = items =>
  items.map(y =>
    y.map(x => ({ ...x, ...{ data: { date: toISO(x.data.date) } } })),
  );

describe('Trend detail utils', () => {
  beforeEach(() => {
    Settings.defaultLocale = 'en'; // To ensure that the unit tests run in en
  });

  describe('calculateFullRange', () => {
    it('should return time in ms of a full day', () => {
      const expected = DAY_IN_MS;
      const actual = calculateFullRange(startDate, startDate);

      expect(actual).toBe(expected);
    });

    it('should return time in ms of 2 full days', () => {
      const expected = DAY_IN_MS * 2 + 1;
      const actual = calculateFullRange(startDate, endDate);

      expect(actual).toBe(expected);
    });
  });

  describe('convertMeasurementsToPoints', () => {
    it('should convert blood glucose measurements to points', () => {
      const expected = points;
      const thresholds = {
        upperHyperThreshold: 250,
        glucoseIdealIntervalMax: 125,
        glucoseIdealIntervalMin: 80,
        hypoglycemiaThreshold: 60,
      };

      const actual = convertMeasurementsToPoints(
        glucoseMeasurements,
        DAY_IN_MS,
        startDate,
        thresholds,
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('normalizeMeans', () => {
    it('should convert glucose measurements to mean values by day', () => {
      const expected = [
        {
          data: { value: 230.4 },
          fillColor: '#333',
          x: 0.25,
          y: 0.5760000000000001,
        },
      ];
      const actual = normalizeMeans(glucoseMeasurements, startDate, endDate);

      expect(actual).toEqual(expected);
    });
  });

  describe('generateLines', () => {
    it('should create connecting lines for points', () => {
      const expected = [
        [
          {
            x: 0.1,
            y: 0.5,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
          {
            x: 0.2,
            y: 0.6,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
          {
            x: 0.3,
            y: 0.7,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
        ],
      ];

      const actual = generateLines(points2, startDate, endDate);
      expect(convertDatesToISO(actual)).toEqual(convertDatesToISO(expected));
    });

    it('should not connect points that are more than 10 hours apart', () => {
      // x value (rather than date) is used to determine distance; the test will fail if the date property is not there though
      const expected = [
        [
          {
            x: 0.01,
            y: 0.5,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
        ],
        [
          {
            x: 0.98,
            y: 0.6,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
          {
            x: 0.99,
            y: 0.7,
            data: { date: convertISOToJsGMT('Feb 5 2018 12:00:00 GMT+0000') },
          },
        ],
      ];

      const actual = generateLines(points3, startDate, endDate);
      expect(convertDatesToISO(actual)).toEqual(convertDatesToISO(expected));
    });

    it('should connect points that cross over a day and are not more than 10 hours apart, and add points on the boundary of each day', () => {
      const expected = [
        [],
        [
          {
            x: 0.9166666772762347,
            y: 0.125,
            data: { date: convertISOToJsGMT('Feb 5 2018 22:00:00 GMT+0000') },
          },
          {
            x: 1,
            y: 0.1666666608796296,
            data: {
              date: convertISOToJsGMT('Feb 5 2018 23:59:59:999 GMT+0000'),
            },
            crossOverPoint: false,
          },
        ],
        [
          {
            crossOverPoint: true,
            x: 1.000000005787037,
            y: 0.1666666608796296,
            data: { date: convertISOToJsGMT('Feb 6 2018 0:00:00 GMT+0000') },
          },
          {
            x: 1.041666678722994,
            y: 0.1875,
            data: { date: convertISOToJsGMT('Feb 6 2018 1:00:00 GMT+0000') },
          },
        ],
      ];

      const actual = generateLines(
        points4,
        startDate,
        endDate,
        calculateFullRange(startDate, startDate),
      );

      expect(convertDatesToISO(actual)).toEqual(convertDatesToISO(expected));
    });
  });
});
