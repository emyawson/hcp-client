import { shallow } from 'enzyme';
import React from 'react';

import { PlaceholderIcon } from 'src/components';

describe('placeholder-icon test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<PlaceholderIcon color="#000000" size={50} />);
    expect(wrapper).toMatchSnapshot();
  });
});
