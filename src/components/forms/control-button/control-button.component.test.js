import React from 'react';
import { shallow } from 'enzyme';

import { ControlButton } from './control-button.component';

describe('Button Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
