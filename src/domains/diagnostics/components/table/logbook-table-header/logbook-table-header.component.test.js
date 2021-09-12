import { shallow } from 'enzyme';
import React from 'react';

import { LogbookTableHeader } from '.';

describe('LogbookTableHeader test suite', () => {
  test('LogbookTableHeader renders correctly', () => {
    const wrapper = shallow(<LogbookTableHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
