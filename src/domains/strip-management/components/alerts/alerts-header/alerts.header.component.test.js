import React from 'react';
import { shallow } from 'enzyme';

import { AlertsHeader } from './alerts-header.component';

describe('Alerts header component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<AlertsHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
