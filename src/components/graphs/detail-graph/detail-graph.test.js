import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import { DetailGraph } from './detail-graph.component';

const mockProps = {
  axes: [],
  axisLabels: [],
  graphData: {
    area: {
      color: 'green',
      data: [[]],
    },
    bars: {
      color: 'orange',
      data: [[]],
    },
    lines: {
      color: 'gray',
      data: [[]],
    },
    marks: { data: [[]] },
    meanLine: {
      color: 'black',
      data: [[]],
      strokeWidth: 4,
    },
    meanMarks: {
      data: [[]],
    },
    threshold: { color: 'red', data: [[]] },
  },
  mealTimeVisualCuePointValues: [
    {
      color: '#FFF',
      data: [[{ x: 0, y: 100, y0: 0 }, { x: 5, y: 100, y0: 0 }]],
    },
  ],
  numericalGraphStartTime: 0,
  timeBlocks: {
    mealTimes: [
      {
        description: 'BEDTIME',
        startTime: 0,
        endTime: 1,
        width: 4.166666666666666,
      },
      {
        description: 'NIGHT',
        startTime: 1,
        endTime: 6,
        width: 20.833333333333336,
      },
      {
        description: 'BEFORE_BREAKFAST',
        startTime: 6,
        endTime: 8.5,
        width: 10.416666666666668,
      },
      {
        description: 'AFTER_BREAKFAST',
        startTime: 8.5,
        endTime: 11.5,
        width: 12.5,
      },
      {
        description: 'BEFORE_LUNCH',
        startTime: 11.5,
        endTime: 12.5,
        width: 4.166666666666666,
      },
      {
        description: 'AFTER_LUNCH',
        startTime: 12.5,
        endTime: 14.5,
        width: 8.333333333333332,
      },
      {
        description: 'BEFORE_DINNER',
        startTime: 14.5,
        endTime: 18,
        width: 14.583333333333334,
      },
      {
        description: 'AFTER_DINNER',
        startTime: 18,
        endTime: 21,
        width: 12.5,
      },
      {
        description: 'BEDTIME',
        startTime: 21,
        endTime: 24,
        width: 12.5,
      },
    ],
    mealBlocks: [
      {
        description: 'Bed Time',
        startTime: 0,
        endTime: 1,
        width: 4.166666666666666,
      },
      {
        description: 'Night',
        startTime: 1,
        endTime: 6,
        width: 20.833333333333336,
      },
      {
        description: 'Breakfast',
        startTime: 6,
        endTime: 11.5,
        width: 22.916666666666664,
      },
      {
        description: 'Lunch',
        startTime: 11.5,
        endTime: 14.5,
        width: 12.5,
      },
      {
        description: 'Dinner',
        startTime: 14.5,
        endTime: 21,
        width: 27.083333333333332,
      },
      {
        description: 'Bed Time',
        startTime: 21,
        endTime: 24,
        width: 12.5,
      },
    ],
  },
  xTickFormat: () => 10,
  xTitle: 'Title',
  xTotalTicks: 3,
  unit: 'unit',
  yTopValue: 400,
  yTickValues: [],
};

it('renders correctly', () => {
  const wrapper = shallow(<DetailGraph {...mockProps} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <DetailGraph {...mockProps} />
    </Router>,
    div,
  );
});
