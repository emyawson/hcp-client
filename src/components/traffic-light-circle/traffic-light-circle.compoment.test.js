import { shallow } from 'enzyme';
import React from 'react';

import { TrafficLightCircle } from './traffic-light-circle.component';

const mockProps = {
  emptyInnerCircle: false,
  status: 'DELIVER',
};

describe('Traffic Light Circle component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TrafficLightCircle {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
