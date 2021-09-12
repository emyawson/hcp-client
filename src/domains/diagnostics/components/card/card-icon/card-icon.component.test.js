import React from 'react';
import { shallow, mount } from 'enzyme';

import { CardIcon } from './card-icon.component';

const mockClick = jest.fn();

const onClickProps = {
  link: '',
  onClick: mockClick,
};

describe('CardIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CardIcon link="/" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with onclick prop behavior if no link is set', () => {
    const wrapper = mount(<CardIcon {...onClickProps} />);
    expect(wrapper.find('div').props().onClick).toBe(mockClick);
  });
  it('renders with default onclick if no link is set', () => {
    const wrapper = mount(<CardIcon link="" />);
    expect(
      wrapper
        .find('div')
        .props()
        .onClick(),
    ).toBe(null);
  });
});
