import React from 'react';
import { shallow } from 'enzyme';

import { ToggleSwitch } from './toggle-switch.component';

const mockProps = {
  id: 'mockSwitch',
  label: 'Would you like a toggle?',
};

const mockPropsComponentLabel = {
  id: 'mockToggle',
  label: <p>This is a label</p>,
};

describe('Create toggle with str label', () => {
  it('renders routing tabs correctly', () => {
    const wrapper = shallow(<ToggleSwitch {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Create toggle with component label', () => {
  it('renders routing tabs correctly', () => {
    const wrapper = shallow(<ToggleSwitch {...mockPropsComponentLabel} />);
    expect(wrapper).toMatchSnapshot();
  });
});
