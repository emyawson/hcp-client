import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { ForceStatusButton, ForceIcon } from './force-status-button.component';

describe('Force status button component', () => {
  const mockBaseProps = {
    status: TRAFFIC_LIGHT_STATES.DELIVER,
  };
  it('Renders correctly', () => {
    const mockProps = {
      ...mockBaseProps,
      disabled: true,
      modelPath: '.model',
      size: 24,
    };
    const wrapper = shallow(<ForceStatusButton {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with default props', () => {
    const wrapper = shallow(<ForceStatusButton {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  describe('Icon for force status button component', () => {
    it('Renders correctly', () => {
      const wrapper = shallow(<ForceIcon size={24} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
