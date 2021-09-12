import { shallow } from 'enzyme';
import React from 'react';

import { CaretButton } from 'src/domains/diagnostics/components';

describe('caret-button test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<CaretButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
