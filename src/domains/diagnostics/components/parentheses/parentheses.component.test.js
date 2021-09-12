import React from 'react';
import { shallow } from 'enzyme';

import { ParenthesesWrapper } from './parentheses.component';

describe('Parentheses component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ParenthesesWrapper text="in parentheses" />);
    expect(wrapper).toMatchSnapshot();
  });
});
