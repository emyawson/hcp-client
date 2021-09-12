import React from 'react';
import { shallow } from 'enzyme';

import { StripStatusCard } from './strip-status-card.component';

describe('StripStatusCard', () => {
  const mockProps = {
    match: {
      url: '/',
      isExact: false,
      path: '/',
      params: {},
    },
    numberOfStripsToDeliver: '50 strips',
    lastCollectedDate: 'yesterday',
    nextDeliveryDate: 'tomorrow',
    trafficLightStatus: 'DISABLED',
    deliverStripsToPatient: () => {},
    onUpdateStripStatus: () => {},
  };
  it('renders correctly', () => {
    const wrapper = shallow(<StripStatusCard {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
