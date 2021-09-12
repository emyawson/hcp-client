import React from 'react';
import { shallow } from 'enzyme';

import { Banner } from './banner.component';

describe('Banner', () => {
  const mockProps = {
    text: 'Alert! You are running a test.',
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Banner {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
