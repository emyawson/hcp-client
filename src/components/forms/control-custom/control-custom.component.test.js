import React from 'react';
import { shallow } from 'enzyme';

import { ControlCustom } from './control-custom.component';

describe('Custom Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlCustom />);
    expect(wrapper).toMatchSnapshot();
  });
});
