import React from 'react';
import { shallow } from 'enzyme';

import { HomeDeliveryCardComponent } from './home-delivery-card.component';

describe('HomeDeliveryCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <HomeDeliveryCardComponent routes={{}} match={{ url: '' }} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
