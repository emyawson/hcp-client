import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';
import {
  CheckmarkIcon,
  BellIcon,
  XIcon,
  WhiteLineIcon,
} from 'src/assets/icons';

import { TrafficLight, stateToIcon } from './traffic-light.component';

describe('Traffic light component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <TrafficLight status={TRAFFIC_LIGHT_STATES.DELIVER} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Sets status to disabled if none provided', () => {
    const wrapper = shallow(<TrafficLight />);
    expect(wrapper.find(WhiteLineIcon)).toHaveLength(1);
  });
  describe('Traffic light component icon', () => {
    it('Should return checkmark icon if status is deliver', () => {
      const wrapper = shallow(
        <div>{stateToIcon(TRAFFIC_LIGHT_STATES.DELIVER, 24, false)}</div>,
      );
      expect(wrapper.find(CheckmarkIcon)).toHaveLength(1);
    });
    it('Should return bell icon if status is deliver with alert', () => {
      const wrapper = shallow(
        <div>
          {stateToIcon(TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT, 24, false)}
        </div>,
      );
      expect(wrapper.find(BellIcon)).toHaveLength(1);
    });
    it('Should return x icon if status is do not deliver', () => {
      const wrapper = shallow(
        <div>
          {stateToIcon(TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER, 24, false)}
        </div>,
      );
      expect(wrapper.find(XIcon)).toHaveLength(1);
    });
    it('Should return white line icon if status is disabled', () => {
      const wrapper = shallow(
        <div>{stateToIcon(TRAFFIC_LIGHT_STATES.DISABLED, 24)}</div>,
      );
      expect(wrapper.find(WhiteLineIcon)).toHaveLength(1);
    });
    it('Should return white line icon if status is disabled and hide icon set to true', () => {
      const wrapper = shallow(
        <div>{stateToIcon(TRAFFIC_LIGHT_STATES.DISABLED, 24, true)}</div>,
      );
      expect(wrapper.find(WhiteLineIcon)).toHaveLength(0);
    });
  });
});
