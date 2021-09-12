import React from 'react';
import { shallow, mount } from 'enzyme';

import { LoadingMessage } from './loading-message.component';
import { LoadingMessageHeadline } from './loading-message.style';

describe('Loading message component', () => {
  const baseProps = {
    delay: 2000,
    duration: 1000,
    size: 2,
  };
  const allProps = {
    ...baseProps,
    flexibleHeight: true,
    infinite: false,
    minHeight: 0,
    text: 'Loading',
  };
  it('renders correctly', () => {
    const wrapper = shallow(<LoadingMessage {...allProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with default props', () => {
    const wrapper = shallow(<LoadingMessage {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('does not display headline if there is no text', () => {
    const wrapper = mount(<LoadingMessage {...baseProps} />);
    expect(wrapper.find(LoadingMessageHeadline)).toHaveLength(0);
  });
});
