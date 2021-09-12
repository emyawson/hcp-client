import React from 'react';
import { shallow, mount } from 'enzyme';

import { AddPrescription } from './add-prescription.component';
import { CircleButton } from './add-prescription.style';

describe('Add prescription component', () => {
  it('Renders correctly', () => {
    const mockProps = {
      disabled: false,
      expandHandler: () => {},
    };
    const wrapper = shallow(<AddPrescription {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Clicking on component calls click handler', () => {
    const mockHandler = jest.fn().mockName('click handler');
    const mockProps = { disabled: false, expandHandler: mockHandler };
    const wrapper = shallow(<AddPrescription {...mockProps} />);
    wrapper.props().onClick();
    expect(mockHandler).toBeCalled();
  });
  it('Clicking on button within component calls click handler', () => {
    const mockHandler = jest.fn().mockName('another click handler');
    const mockProps = { disabled: false, expandHandler: mockHandler };
    const wrapper = mount(<AddPrescription {...mockProps} />);
    wrapper
      .find(CircleButton)
      .props()
      .onClick({
        stopPropagation: () => {},
        nativeEvent: { stopImmediatePropagation: () => {} },
      });
    expect(mockHandler).toBeCalled();
  });
});
