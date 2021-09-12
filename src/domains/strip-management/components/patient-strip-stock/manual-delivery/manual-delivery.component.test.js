import React from 'react';
import { shallow } from 'enzyme';

import { ManualDelivery } from './manual-delivery.component';

describe('Manual delivery component', () => {
  const mockBaseProps = {
    submitManualDeliveryRequest: () => {},
    stripModelId: '1',
    patientId: '123',
    disabled: false,
  };
  it('Renders correctly', () => {
    const wrapper = shallow(<ManualDelivery {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
