import React from 'react';
import { shallow } from 'enzyme';

import { ArrowIcon } from 'src/domains/diagnostics/assets/icons';
import { Button, LoadingIndicator } from 'src/domains/diagnostics/components';

describe('Button', () => {
  const mockProps = {
    label: 'Test Now',
    onClick: () => {},
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Button {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a loading indicator while in loading state', () => {
    const loadingProps = {
      ...mockProps,
      loading: true,
    };
    const wrapper = shallow(<Button {...loadingProps} />);
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
  });
  it('should render an icon if set', () => {
    const iconProps = {
      ...mockProps,
      icon: <ArrowIcon />,
      loading: false,
    };
    const wrapper = shallow(<Button {...iconProps} />);
    expect(wrapper.find(ArrowIcon)).toHaveLength(1);
  });
});
