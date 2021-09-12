import React from 'react';
import { shallow } from 'enzyme';

import { CardMinimizer } from './card-minimizer.component';

describe('CardMinimizer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CardMinimizer link="/" />);
    expect(wrapper).toMatchSnapshot();
  });
});
