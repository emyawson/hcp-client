export const mockProps = {
  measurements: [
    {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: true,
      carbohydrates: null,
      date: '2018-02-19 07:37:00 GMT+0000',
      hypoSymptoms: false,
      value: 33,
      control: false,
    },
    {
      aboveTargetRange: false,
      afterMeal: false,
      beforeMeal: false,
      belowTargetRange: false,
      carbohydrates: null,
      date: '2018-02-20 07:37:00 GMT+0000',
      hypoSymptoms: false,
      value: 106,
      control: false,
    },
  ],
  lines: [
    [
      {
        x: 0.11057142857142857,
        y: 0.0825,
        data: {
          x: 0.774,
          y: 33,
          date: '2018-02-19 07:37:00 GMT+0000',
        },
      },
      {
        x: 0.14242857142857143,
        y: 0.265,
        data: {
          x: 0.997,
          y: 106,
          date: '2018-02-20 07:37:00 GMT+0000',
        },
      },
    ],
  ],
  points: [
    {
      shape: 'square',
      x: 0.11057142857142857,
      y: 0.0825,
      strokeColor: '#CF021B',
      fillColor: '#FFF',
      data: {
        aboveTargetRange: false,
        afterMeal: false,
        beforeMeal: true,
        belowTargetRange: true,
        carbohydrates: null,
        date: '2018-02-19 07:37:00 GMT+0000',
        hypoSymptoms: false,
        value: 33,
        control: false,
      },
    },
    {
      shape: 'x',
      x: 0.14242857142857143,
      y: 0.265,
      strokeColor: '#333',
      fillColor: '#FFF',
      data: {
        aboveTargetRange: false,
        afterMeal: false,
        beforeMeal: false,
        belowTargetRange: false,
        carbohydrates: null,
        date: '2018-02-20 07:37:00 GMT+0000',
        hypoSymptoms: false,
        value: 106,
        control: false,
      },
    },
  ],
  meanPoints: [
    {
      glucoseValue: 69.5,
      intervalArr: [
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: true,
          belowTargetRange: true,
          carbohydrates: null,
          date: '2018-02-19 07:37:00 GMT+0000',
          hypoSymptoms: false,
          value: 33,
          control: false,
          weeklyFloat: 0.774,
        },
        {
          aboveTargetRange: false,
          afterMeal: false,
          beforeMeal: false,
          belowTargetRange: false,
          carbohydrates: null,
          date: '2018-02-20 07:37:00 GMT+0000',
          hypoSymptoms: false,
          value: 106,
          control: false,
          weeklyFloat: 0.997,
        },
      ],
      shape: {
        type: 'circle',
        style: {
          strokeColor: '#4A4A4A',
          fillColor: '#4A4A4A',
        },
      },
      unit: 'mg/dL',
      x: -0.9285714285714286,
      y: 0.17375,
    },
  ],
  targetRange: {
    min: 0.245,
    max: 0.32,
    data: {
      min: 98,
      max: 128,
    },
  },
  threshold: {
    value: 0.22,
    data: {
      value: 88,
    },
  },
};

export const mockedStateGenerateLinesDisconnected = {
  dashboard: {
    glucoseMeasurements: [
      {
        date: new Date('Thu Mar 03 2018 06:57:00 GMT-0500 (EST)'),
        beforeMeal: true,
        afterMeal: false,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 101,
      },
      {
        date: new Date('Thu Mar 03 2018 22:13:00 GMT-0500 (EST)'),
        beforeMeal: false,
        afterMeal: true,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 110,
      },
    ],
  },
};

export const mockedStateGenerateLinesConnected = {
  dashboard: {
    glucoseMeasurements: [
      {
        date: new Date('Thu Mar 03 2018 22:13:00 GMT-0500 (EST)'),
        beforeMeal: false,
        afterMeal: true,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 110,
      },
      {
        date: new Date('Fri Mar 04 2018 06:02:00 GMT-0500 (EST)'),
        beforeMeal: false,
        afterMeal: true,
        aboveTargetRange: true,
        belowTargetRange: false,
        hypoSymptoms: false,
        value: 72,
      },
    ],
  },
};

export const mockNormalized = [
  [
    {
      data: {
        aboveTargetRange: true,
        afterMeal: false,
        beforeMeal: true,
        belowTargetRange: false,
        date: new Date('2017-11-08T18:39:25.000Z'),
        hypoSymptoms: false,
        value: 230,
      },
      x: 0.39671428571428574,
      y: 0.575,
    },
    {
      data: {
        aboveTargetRange: true,
        afterMeal: true,
        beforeMeal: false,
        belowTargetRange: false,
        date: new Date('2017-11-09T18:39:25.000Z'),
        hypoSymptoms: false,
        value: 479,
      },
      x: 0.5395714285714286,
      y: 1.1975,
    },
  ],
];

export const mockNormalizedLinesDisconnected = [
  [
    {
      data: { date: new Date('2018-03-03T11:57:00.000Z'), x: 5.498, y: 101 },
      x: 0.7854285714285715,
      y: 0.2525,
    },
    {
      data: { date: new Date('2018-03-04T03:13:00.000Z'), x: 6.134, y: 110 },
      x: 0.8762857142857143,
      y: 0.275,
    },
  ],
];

export const mockNormalizedLinesDisconnectedResult = [
  [
    [
      {
        data: { date: new Date('2018-03-03T11:57:00.000Z'), x: 5.498, y: 101 },
        x: 0.7854285714285715,
        y: 0.2525,
      },
    ],
    [
      {
        data: { date: new Date('2018-03-04T03:13:00.000Z'), x: 6.134, y: 110 },
        x: 0.8762857142857143,
        y: 0.275,
      },
    ],
  ],
];

export const mockNormalizedLinesConnected = [
  [
    {
      data: { date: new Date('2018-03-04T03:13:00.000Z'), x: 6.134, y: 110 },
      x: 0.8762857142857143,
      y: 0.275,
    },
    {
      data: { date: new Date('2018-03-04T11:02:00.000Z'), x: 6.46, y: 72 },
      x: 0.9228571428571428,
      y: 0.18,
    },
  ],
];

export const mockNormalizedLinesConnectedResult = [
  [
    [
      {
        data: {
          date: new Date('2018-03-04T03:13:00.000Z').toISOString(),
          x: 6.134,
          y: 110,
        },
        x: 0.8762857142857143,
        y: 0.275,
      },
      {
        data: {
          date: new Date('2018-03-04T11:02:00.000Z').toISOString(),
          x: 6.46,
          y: 72,
        },
        x: 0.9228571428571428,
        y: 0.18,
      },
    ],
  ],
];

export const mockNormalizedPoints = [
  {
    data: {
      aboveTargetRange: true,
      afterMeal: false,
      beforeMeal: true,
      belowTargetRange: false,
      date: new Date('2017-11-08T18:39:25.000Z').toISOString(),
      hypoSymptoms: false,
      value: 230,
    },
    fillColor: '#FFF',
    shape: 'square',
    strokeColor: '#65B7E6',
    x: 0.39671428571428574,
    y: 0.575,
  },
  {
    data: {
      aboveTargetRange: true,
      afterMeal: true,
      beforeMeal: false,
      belowTargetRange: false,
      date: new Date('2017-11-09T18:39:25.000Z').toISOString(),
      hypoSymptoms: false,
      value: 479,
    },
    fillColor: '#65B7E6',
    shape: 'triangle',
    strokeColor: '#65B7E6',
    x: 0.5395714285714286,
    y: 1,
  },
];
