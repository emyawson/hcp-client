import React from 'react';
import { shallow } from 'enzyme';

import { ControlSelect } from './control-select.component';

describe('Dropdown Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});
