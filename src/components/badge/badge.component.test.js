import React from 'react';
import { shallow } from 'enzyme';

import { Badge } from './badge.component';

describe('Badge component', () => {
  const mockProps = {
    disabled: true,
    size: 60,
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Badge {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with default props', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper).toMatchSnapshot();
  });
});
