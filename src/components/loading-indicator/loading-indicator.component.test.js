import React from 'react';
import { shallow } from 'enzyme';

import { LoadingIndicator } from './loading-indicator.component';

describe('Loading indicator component', () => {
  const mockProps = {
    animation: 'fade',
    size: '2rem',
  };
  it('renders correctly', () => {
    const wrapper = shallow(<LoadingIndicator {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with default props', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper).toMatchSnapshot();
  });
});
