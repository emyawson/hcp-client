import React from 'react';
import { shallow } from 'enzyme';

import { AccordionToggle } from './accordion-toggle.component';

const mockToggleHandler = jest.fn();

describe('Accordion Toggle', () => {
  const mockProps = {
    active: true,
    disabled: false,
    id: 'abc-123',
    toggleHandler: mockToggleHandler,
  };
  it('renders correctly', () => {
    const wrapper = shallow(<AccordionToggle {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('dispatches a toggle event only when enabled', () => {
    const disabledProps = {
      ...mockProps,
      disabled: true,
    };
    const wrapperDisabled = shallow(<AccordionToggle {...disabledProps} />);
    wrapperDisabled.props().onClick();
    expect(mockToggleHandler).toHaveBeenCalledTimes(0);

    const wrapperEnabled = shallow(<AccordionToggle {...mockProps} />);
    wrapperEnabled.props().onClick();
    expect(mockToggleHandler).toHaveBeenCalled();
  });
});
