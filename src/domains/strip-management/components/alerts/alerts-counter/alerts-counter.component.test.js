import React from 'react';
import { shallow } from 'enzyme';

import { AlertsCounter } from './alerts-counter.component';

describe('AlertsCounter', () => {
  const defaultProps = {
    activateModelPath: '',
    id: 'AlertsCounterTest',
    labelTextKey: '',
    thresholdModelPath: '',
    onUpdateThresholdLimit: () => {},
  };

  it('renders correctly', () => {
    const wrapper = shallow(<AlertsCounter {...defaultProps} />);
    expect(wrapper.length).toBe(1);
  });
});
