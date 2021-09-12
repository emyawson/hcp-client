import React from 'react';
import { shallow } from 'enzyme';

import { ControlCheckbox } from './control-checkbox.component';

describe('Checkbox Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlCheckbox />);
    expect(wrapper).toMatchSnapshot();
  });
});
