import React from 'react';
import { shallow } from 'enzyme';

import { Keyline } from './keyline.component';

describe('Keyline component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Keyline color="#A1A1A1" />);
    expect(wrapper).toMatchSnapshot();
  });
});
