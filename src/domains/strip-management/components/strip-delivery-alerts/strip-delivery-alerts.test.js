import React from 'react';
import { shallow } from 'enzyme';

import { StripDeliveryAlert } from './strip-delivery-alerts.component';

describe('Strip Delivery Alert ', () => {
  it('It renders correctly', () => {
    const defaultConditions = {
      hypers: { pass: false, threshold: null, amount: null },
      hypos: { pass: false, threshold: null, amount: null },
      warnings: { pass: false, threshold: null, amount: null },
      consumption: { pass: false, threshold: null, amount: null },
    };
    const wrapper = shallow(
      <StripDeliveryAlert conditions={defaultConditions} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
