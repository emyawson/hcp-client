import React from 'react';
import { shallow, mount } from 'enzyme';

import { LocalForm } from 'src/components';

import { LostStrips } from './lost-strips.component';

describe('Lost strips component', () => {
  const mockBaseProps = {
    disabled: true,
    submitLostStripsRequest: () => {},
    patientId: '123',
    stripModelId: '1',
    patientStock: 100,
  };
  it('Renders correctly', () => {
    const wrapper = shallow(<LostStrips {...mockBaseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Fires request action on form submit', () => {
    const mockRequestAction = jest.fn().mockName('on submit lost strips');
    const mockProps = {
      ...mockBaseProps,
      submitLostStripsRequest: mockRequestAction,
    };
    const wrapper = mount(<LostStrips {...mockProps} />);
    wrapper
      .find(LocalForm)
      .props()
      .onSubmit();
    expect(mockRequestAction).toBeCalledWith(
      expect.objectContaining({ patientId: '123', stripModelId: '1' }),
    );
  });
});
