import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { DeliveryStatusIcon } from './delivery-status-icon.component';

describe('Delivery status icon component', () => {
  const mockProps = {
    status: TRAFFIC_LIGHT_STATES.DELIVER,
    noIcon: true,
  };
  it('Renders correctly', () => {
    const wrapper = shallow(<DeliveryStatusIcon {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with default props', () => {
    const wrapper = shallow(<DeliveryStatusIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
