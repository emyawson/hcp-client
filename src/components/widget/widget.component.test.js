import { shallow } from 'enzyme';
import React from 'react';

import { Widget } from './widget.component';

describe('Vertical Tabs component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Widget />);
    expect(wrapper).toMatchSnapshot();
  });
});
