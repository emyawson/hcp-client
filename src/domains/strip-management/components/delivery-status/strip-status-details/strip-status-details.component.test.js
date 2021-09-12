import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';
import { ProgressBar, Caption } from 'src/components';

import {
  StripStatusDetails,
  createStripsConsumedDisplay,
  createProgressBarDisplay,
} from './strip-status-details.component';

describe('Strip status details component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      conditions: {},
      trafficLightStatus: TRAFFIC_LIGHT_STATES.DELIVER,
      hasLastDeliveryWithAlert: true,
    };
    const wrapper = shallow(<StripStatusDetails {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  describe('Strip status details component displays', () => {
    it('Returns the percentage display if consumption value is available', () => {
      expect(createStripsConsumedDisplay(75)).toEqual('75%');
    });
    it('Returns no-data display if consumption value is unavailable', () => {
      expect(createStripsConsumedDisplay(null)).toEqual('-');
    });
    it('Returns progress bar if consumption value is available', () => {
      const wrapper = shallow(<div>{createProgressBarDisplay(75)}</div>);
      expect(wrapper.find(ProgressBar)).toHaveLength(1);
      expect(wrapper.find(Caption)).toHaveLength(0);
    });
    it('Returns caption if consumption value is unavailable', () => {
      const wrapper = shallow(<div>{createProgressBarDisplay(null)}</div>);
      expect(wrapper.find(ProgressBar)).toHaveLength(0);
      expect(wrapper.find(Caption)).toHaveLength(1);
    });
  });
});
