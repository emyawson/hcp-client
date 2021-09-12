import { shallow } from 'enzyme';
import React from 'react';

import { GlobalGraphOptions } from './global-graph-options.component';

const props = {
  firstMeasurementDate: new Date('2017-07-02T03:35:00.000Z'),
  lastMeasurementDate: new Date('2018-02-28T08:17:00.000Z'),
  startDate: new Date('2018-02-14T08:17:00.000Z'),
  endDate: new Date('2018-02-28T08:17:00.000Z'),
  onDatesChange: () => {},
};

describe('GlobalGraphOptions test suite', () => {
  test('GlobalGraphOptions renders correctly', () => {
    const wrapper = shallow(<GlobalGraphOptions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
