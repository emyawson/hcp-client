import { shallow } from 'enzyme';
import * as React from 'react';

import { TrendGraph } from './trend-graph.component';

import { TrendGraphHorizontalAxis } from './trend-graph-horizontal-axis.component';

import { TrendGraphVerticalAxis } from './trend-graph-vertical-axis.component';

import { TrendGraphFrame } from './trend-graph-frame.component';

import { TrendGraphAxes } from './trend-graph-axes.component';

const trendGraphMockProps = {
  verticalLabel: [{ value: 0.5, label: 'Blood Glucose (mg/dL)' }],
  verticalTicks: [
    {
      value: 0,
      label: '0',
    },
    {
      value: 0.25,
      label: '100',
    },
    {
      value: 0.5,
      label: '200',
    },
    {
      value: 0.75,
      label: '300',
    },
    {
      value: 1,
      label: '400',
    },
  ],
  horizontalDayTicks: [
    { value: 0, label: '18', isWeekend: false, drawLongTick: false },
    {
      value: 0.07142857142857142,
      label: '19',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.14285714285714285,
      label: '20',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.21428571428571427,
      label: '21',
      isWeekend: true,
      drawLongTick: false,
    },
    {
      value: 0.2857142857142857,
      label: '22',
      isWeekend: true,
      drawLongTick: false,
    },
    {
      value: 0.35714285714285715,
      label: '23',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.42857142857142855,
      label: '24',
      isWeekend: false,
      drawLongTick: false,
    },
    { value: 0.5, label: '25', isWeekend: false, drawLongTick: false },
    {
      value: 0.5714285714285714,
      label: '26',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.6428571428571429,
      label: '27',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.7142857142857143,
      label: '28',
      isWeekend: true,
      drawLongTick: false,
    },
    {
      value: 0.7857142857142857,
      label: '29',
      isWeekend: true,
      drawLongTick: false,
    },
    {
      value: 0.8571428571428571,
      label: '30',
      isWeekend: false,
      drawLongTick: false,
    },
    {
      value: 0.9285714285714286,
      label: '31',
      isWeekend: false,
      drawLongTick: false,
    },
  ],
  horizontalMonthTicks: [
    { value: 0, label: 'OCT / 2017', daysLeftInMonth: 14 },
  ],
  width: 1100,
  height: 350,
};

describe('Trend Graph test suite', () => {
  test('it renders trend graph correctly', () => {
    const wrapper = shallow(<TrendGraph {...trendGraphMockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders horizontal axis correctly', () => {
    const wrapper = shallow(
      <TrendGraphHorizontalAxis {...trendGraphMockProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders vertical axis correctly', () => {
    const wrapper = shallow(
      <TrendGraphVerticalAxis {...trendGraphMockProps} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders Frame correctly', () => {
    const wrapper = shallow(<TrendGraphFrame {...trendGraphMockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders Axes correctly', () => {
    const wrapper = shallow(<TrendGraphAxes {...trendGraphMockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
