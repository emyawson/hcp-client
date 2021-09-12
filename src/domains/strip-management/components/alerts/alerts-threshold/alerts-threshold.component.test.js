import React from 'react';
import { shallow } from 'enzyme';

import { AlertsThreshold } from './alerts-threshold.component';

describe('alerts-threshold test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <AlertsThreshold
        valueModelPath=".thresholdHypo"
        textKey="alerts.thresholdHypo"
        value="1111 mmg/dL 1111 mmol/L)"
        intervalModelPath=".preIdealInterval"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Post ideal interval test suite', () => {
  it('Ensures input values cannot be eddited', () => {
    const wrapper = shallow(<AlertsThreshold model={''} value={''} disabled />);

    expect(wrapper.find('disabled')).toBeTruthy();
  });
});
