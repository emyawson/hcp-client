import React from 'react';
import { shallow } from 'enzyme';

import { ControlText } from './control-text.component';

describe('Text Input Form Control', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ControlText />);
    expect(wrapper).toMatchSnapshot();
  });
});
