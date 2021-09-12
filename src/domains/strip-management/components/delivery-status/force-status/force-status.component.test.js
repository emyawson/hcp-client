import React from 'react';
import { shallow } from 'enzyme';

import { TRAFFIC_LIGHT_STATES } from 'src/core';
import { Form } from 'src/components';

import { ForceStatus } from './force-status.component';

describe('Force status component', () => {
  const mockBaseProps = {
    forceTrafficStatus: TRAFFIC_LIGHT_STATES.DELIVER,
    modelPath: 'testModel',
    setDeliveryStatusRequest: () => {},
    patientId: '123',
  };
  it('Renders correctly', () => {
    const mockProps = {
      ...mockBaseProps,
      currentStatus: TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
      disabled: true,
    };
    const wrapper = shallow(<ForceStatus {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with default props', () => {
    const wrapper = shallow(<ForceStatus {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Calls request action when form is submitted', () => {
    const mockRequestAction = jest.fn().mockName('set delivery status request');
    const mockProps = {
      ...mockBaseProps,
      setDeliveryStatusRequest: mockRequestAction,
    };
    const wrapper = shallow(<ForceStatus {...mockProps} />);
    wrapper
      .find(Form)
      .simulate('submit', { status: TRAFFIC_LIGHT_STATES.DELIVER });

    expect(mockRequestAction).toBeCalledWith({
      patientId: '123',
      status: TRAFFIC_LIGHT_STATES.DELIVER,
    });
  });
});
