import { toFormat, convertISOToJsGMT } from 'src/domains/diagnostics/utils';
import { TIME_INTERVAL } from 'src/domains/diagnostics/constants';

import {
  groupByWeek,
  groupByMonth,
  groupByQuarter,
  subIntervals,
  groupByWeekFilled,
  groupByMonthFilled,
  groupByQuarterFilled,
  isEqualInterval,
  isBeforeInterval,
  isAfterInterval,
  isWeekendDay,
  groupMeasurementsByDate,
  sortTwoMeasurementsByAscendingDate,
} from './time.util';

const toGroupTestableDatetimes = groups =>
  groups.map(group => {
    const {
      interval: { start, end },
    } = group;
    const interval = {
      start: toFormat('yyyy-MM-dd HH:mm:ss')(start),
      end: toFormat('yyyy-MM-dd HH:mm:ss')(end),
    };
    return { ...group, interval };
  });

const toIntervalTestableDates = ({ start, end }) => ({
  start: toFormat('yyyy-MM-dd')(start),
  end: toFormat('yyyy-MM-dd')(end),
});

const toGroupTestableDates = groups =>
  groups.map(group => {
    const {
      interval: { start, end },
    } = group;
    const interval = {
      start: toFormat('yyyy-MM-dd')(start),
      end: toFormat('yyyy-MM-dd')(end),
    };
    return { ...group, interval };
  });

const objectsWithDates = [
  {
    date: convertISOToJsGMT('Sun Jan 1 2017 16:40:00.000 GMT+0000'),
    data: {},
  },
  {
    date: convertISOToJsGMT('Sat Dec 31 2016 16:40:00.000 GMT+0000'),
    data: {},
  },
  {
    date: convertISOToJsGMT('Mon Jan 1 2018 16:40:00.000 GMT+0000'),
    data: {},
  },
  {
    date: convertISOToJsGMT('Tue Jan 2 2018 16:40:00.000 GMT+0000'),
    data: {},
  },
  {
    date: convertISOToJsGMT('Sun Jan 7 2018 16:40:00.000 GMT+0000'),
    data: {},
  },
  {
    date: convertISOToJsGMT('Mon Jan 8 2018 16:40:00.000 GMT+0000'),
    data: {},
  },
];

describe('groupByWeek, util', () => {
  it('returns an array that groups the given object into intervals of weeks', () => {
    const expected = [
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 1 2017 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Sat Dec 31 2016 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2017-01-01 23:59:59',
          start: '2016-12-26 00:00:00',
        },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 1 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Tue Jan 2 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 7 2018 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2018-01-07 23:59:59',
          start: '2018-01-01 00:00:00',
        },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 8 2018 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2018-01-14 23:59:59',
          start: '2018-01-08 00:00:00',
        },
      },
    ];
    const actual = toGroupTestableDatetimes(groupByWeek(objectsWithDates));
    expect(actual).toEqual(expected);
  });
  it('returns an empty array when is given an empty array', () => {
    const expected = [];
    const actual = groupByWeek([]);
    expect(actual).toEqual(expected);
  });
});

describe('groupByMonth, util', () => {
  it('returns an array that groups the given object into intervals of months', () => {
    const expected = [
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 1 2017 16:40:00 GMT+0000'),
          },
        ],
        interval: { end: '2017-01-31 23:59:59', start: '2017-01-01 00:00:00' },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Sun Dec 31 2016 16:40:00 GMT+0000'),
          },
        ],
        interval: { end: '2016-12-31 23:59:59', start: '2016-12-01 00:00:00' },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 1 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Tue Jan 2 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 7 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 8 2018 16:40:00 GMT+0000'),
          },
        ],
        interval: { end: '2018-01-31 23:59:59', start: '2018-01-01 00:00:00' },
      },
    ];
    const actual = toGroupTestableDatetimes(groupByMonth(objectsWithDates));
    expect(actual).toEqual(expected);
  });
  it('returns an empty array when is given an empty array', () => {
    const expected = [];
    const actual = groupByMonth([]);
    expect(actual).toEqual(expected);
  });
});

describe('groupByQuarter, util', () => {
  it('returns an array that groups the given object into intervals of quarters', () => {
    const expected = [
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 1 2017 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2017-03-31 23:59:59',
          start: '2017-01-01 00:00:00',
        },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Sun Dec 31 2016 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2016-12-31 23:59:59',
          start: '2016-10-01 00:00:00',
        },
      },
      {
        group: [
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 1 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Tue Jan 2 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Sun Jan 7 2018 16:40:00 GMT+0000'),
          },
          {
            data: {},
            date: convertISOToJsGMT('Mon Jan 8 2018 16:40:00 GMT+0000'),
          },
        ],
        interval: {
          end: '2018-03-31 23:59:59',
          start: '2018-01-01 00:00:00',
        },
      },
    ];
    const actual = toGroupTestableDatetimes(groupByQuarter(objectsWithDates));
    expect(actual).toEqual(expected);
  });
  it('returns an empty array when is given an empty array', () => {
    const expected = [];
    const actual = groupByQuarter([]);
    expect(actual).toEqual(expected);
  });
});

describe('subIntervals, util', () => {
  it('returns x months back interval', () => {
    const expected = {
      start: convertISOToJsGMT('July 1 2017 GMT+0000'),
      end: convertISOToJsGMT('July 31 2017 GMT+0000'),
    };
    const actual = subIntervals(
      convertISOToJsGMT('Nov 8 2017 GMT+0000'),
      TIME_INTERVAL.MONTHLY_INTERVALS,
      4,
    );
    expect(toIntervalTestableDates(actual)).toEqual(
      toIntervalTestableDates(expected),
    );
  });
  it('returns x weeks back interval', () => {
    const expected = {
      start: convertISOToJsGMT('Jan 15 2018 GMT+0000'),
      end: convertISOToJsGMT('Jan 21 2018 GMT+0000'),
    };
    const actual = subIntervals(
      convertISOToJsGMT('Feb 1 2018 GMT+0000'),
      TIME_INTERVAL.WEEKLY_INTERVALS,
      2,
    );
    expect(toIntervalTestableDates(actual)).toEqual(
      toIntervalTestableDates(expected),
    );
  });
});

describe('groupByWeekFilled, util', () => {
  it('fills the empty week with empty group', () => {
    const objects = [
      {
        date: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        data: {},
      },
      {
        date: convertISOToJsGMT('Jan 15 2018 GMT+0000'),
        data: {},
      },
    ];
    const endDate = convertISOToJsGMT('Jan 17 2018 GMT+0000');
    const amount = 3;
    const expected = [
      {
        group: [{ data: {}, date: convertISOToJsGMT('Jan 15 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Jan 21 2018 GMT+0000'),
          start: convertISOToJsGMT('Jan 15 2018 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Jan 14 2018 GMT+0000'),
          start: convertISOToJsGMT('Jan 8 2018 GMT+0000'),
        },
      },
      {
        group: [{ data: {}, date: convertISOToJsGMT('Jan 1 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Jan 7 2018 GMT+0000'),
          start: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        },
      },
    ];
    const actual = groupByWeekFilled(objects, endDate, amount);
    expect(toGroupTestableDates(actual)).toEqual(
      toGroupTestableDates(expected),
    );
  });
});

describe('groupByMonthFilled, util', () => {
  it('fills the empty months empty groups', () => {
    const objects = [
      {
        date: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        data: {},
      },
      {
        date: convertISOToJsGMT('Apr 1 2018 GMT+0000'),
        data: {},
      },
    ];
    const endDate = convertISOToJsGMT('Apr 17 2018 GMT+0000');
    const amount = 4;
    const expected = [
      {
        group: [{ data: {}, date: convertISOToJsGMT('Apr 1 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Apr 30 2018 GMT+0000'),
          start: convertISOToJsGMT('Apr 1 2018 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Mar 31 2018 GMT+0000'),
          start: convertISOToJsGMT('Mar 1 2018 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Feb 28 2018 GMT+0000'),
          start: convertISOToJsGMT('Feb 1 2018 GMT+0000'),
        },
      },
      {
        group: [{ data: {}, date: convertISOToJsGMT('Jan 1 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Jan 31 2018 GMT+0000'),
          start: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        },
      },
    ];
    const actual = groupByMonthFilled(objects, endDate, amount);
    expect(toGroupTestableDates(actual)).toEqual(
      toGroupTestableDates(expected),
    );
  });
});

describe('groupByQuarterFilled, util', () => {
  it('fills the empty quarter with an empty group', () => {
    const objects = [
      {
        date: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        data: {},
      },
      {
        date: convertISOToJsGMT('July 1 2018 GMT+0000'),
        data: {},
      },
    ];
    const endDate = convertISOToJsGMT('July 17 2018 GMT+0000');
    const amount = 6;
    const expected = [
      {
        group: [{ data: {}, date: convertISOToJsGMT('July 1 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Sep 30 2018 GMT+0000'),
          start: convertISOToJsGMT('Jul 1 2018 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Jun 30 2018 GMT+0000'),
          start: convertISOToJsGMT('Apr 1 2018 GMT+0000'),
        },
      },
      {
        group: [{ data: {}, date: convertISOToJsGMT('Jan 1 2018 GMT+0000') }],
        interval: {
          end: convertISOToJsGMT('Mar 31 2018 GMT+0000'),
          start: convertISOToJsGMT('Jan 1 2018 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Dec 31 2017 GMT+0000'),
          start: convertISOToJsGMT('Oct 1 2017 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Sep 30 2017 GMT+0000'),
          start: convertISOToJsGMT('Jul 1 2017 GMT+0000'),
        },
      },
      {
        group: [],
        interval: {
          end: convertISOToJsGMT('Jun 30 2017 GMT+0000'),
          start: convertISOToJsGMT('Apr 1 2017 GMT+0000'),
        },
      },
    ];
    const actual = groupByQuarterFilled(objects, endDate, amount);
    expect(toGroupTestableDates(actual)).toEqual(
      toGroupTestableDates(expected),
    );
  });
});

describe('isEqualInterval, util', () => {
  it('returns true when intervals are equal', () => {
    const intervalA = {
      start: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
    };
    const actual = isEqualInterval(intervalA, intervalB);
    expect(actual).toBeTruthy();
  });
  it('returns false when intervals are not equal', () => {
    const intervalA = {
      start: convertISOToJsGMT('Dec 12 2017 GMT+0000'),
      end: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Feb 1 2017 GMT+0000'),
    };
    const actual = isEqualInterval(intervalA, intervalB);
    expect(actual).toBeFalsy();
  });
});

describe('isBeforeInterval, util', () => {
  it('returns true when interval is before the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 9 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isBeforeInterval(intervalA, intervalB);
    expect(actual).toBeTruthy();
  });
  it('returns false when interval is after the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 9 2017 GMT+0000'),
    };
    const actual = isBeforeInterval(intervalA, intervalB);
    expect(actual).toBeFalsy();
  });
  it('returns true when interval is partialy before the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 5 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 15 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isBeforeInterval(intervalA, intervalB);
    expect(actual).toBeTruthy();
  });
  it('returns false when interval is partialy after the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 15 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 25 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isBeforeInterval(intervalA, intervalB);
    expect(actual).toBeFalsy();
  });
});

describe('isAfterInterval, util', () => {
  it('returns false when interval is before the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 9 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isAfterInterval(intervalA, intervalB);
    expect(actual).toBeFalsy();
  });
  it('returns true when interval is after the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 1 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 9 2017 GMT+0000'),
    };
    const actual = isAfterInterval(intervalA, intervalB);
    expect(actual).toBeTruthy();
  });
  it('returns false when interval is partialy before the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 5 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 15 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isAfterInterval(intervalA, intervalB);
    expect(actual).toBeFalsy();
  });
  it('returns true when interval is partialy after the comparing interval', () => {
    const intervalA = {
      start: convertISOToJsGMT('Jun 15 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 25 2017 GMT+0000'),
    };
    const intervalB = {
      start: convertISOToJsGMT('Jun 10 2017 GMT+0000'),
      end: convertISOToJsGMT('Jun 20 2017 GMT+0000'),
    };
    const actual = isAfterInterval(intervalA, intervalB);
    expect(actual).toBeTruthy();
  });
});

describe('isWeekendDay test suite', () => {
  it('should return true for weekend day', () => {
    const saturday = convertISOToJsGMT('Feb 10 2018 GMT+0000');
    const sunday = convertISOToJsGMT('Feb 11 2018 GMT+0000');

    expect(isWeekendDay(saturday)).toBeTruthy();
    expect(isWeekendDay(sunday)).toBeTruthy();
  });

  it('should return false for weekday', () => {
    const monday = convertISOToJsGMT('Monday, Feb 12, 2018 GMT+0000');

    expect(isWeekendDay(monday)).toBeFalsy();
  });
});

describe('Group by Day', () => {
  it('should group measurement objects by day using date property', () => {
    const measurements = [
      {
        date: 'Wed, 14 Feb 2018',
        time: '3:08am',
        dayOfWeek: 3,
        glucoseValue: 237,
      },
      {
        date: 'Wed, 14 Feb 2018',
        time: '11:01am',
        dayOfWeek: 3,
        glucoseValue: 133,
      },
      {
        date: 'Thu, 15 Feb 2018',
        time: '11:26am',
        dayOfWeek: 4,
        glucoseValue: 47,
      },
      {
        date: 'Thu, 15 Feb 2018',
        time: '3:07pm',
        dayOfWeek: 4,
        glucoseValue: 135,
      },
    ];
    const groupedMeasurements = [
      [
        {
          date: 'Wed, 14 Feb 2018',
          time: '3:08am',
          dayOfWeek: 3,
          glucoseValue: 237,
        },
        {
          date: 'Wed, 14 Feb 2018',
          time: '11:01am',
          dayOfWeek: 3,
          glucoseValue: 133,
        },
      ],
      [
        {
          date: 'Thu, 15 Feb 2018',
          time: '11:26am',
          dayOfWeek: 4,
          glucoseValue: 47,
        },
        {
          date: 'Thu, 15 Feb 2018',
          time: '3:07pm',
          dayOfWeek: 4,
          glucoseValue: 135,
        },
      ],
    ];
    expect(groupMeasurementsByDate(measurements)).toEqual(groupedMeasurements);
  });
});

describe('Sort measurements by date', () => {
  it('should sort two measurement objects by ascending date property', () => {
    const measurementA = {
      date: convertISOToJsGMT('Fri Nov 18 2017 15:07:00 GMT-0500 (EST)'),
      time: '3:07pm',
      dayOfWeek: 4,
      glucoseValue: 135,
    };
    const measurementB = {
      date: convertISOToJsGMT('Fri Nov 17 2017 11:01:00 GMT-0500 (EST)'),
      time: '11:01am',
      dayOfWeek: 3,
      glucoseValue: 133,
    };
    const result = 1;

    expect(sortTwoMeasurementsByAscendingDate(measurementA, measurementB)).toBe(
      result,
    );
  });
});
