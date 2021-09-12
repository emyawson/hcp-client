import React from 'react';
import { shallow } from 'enzyme';

import { ControlRadio } from './control-radio.component';

describe('Radio Button Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlRadio />);
    expect(wrapper).toMatchSnapshot();
  });
});
