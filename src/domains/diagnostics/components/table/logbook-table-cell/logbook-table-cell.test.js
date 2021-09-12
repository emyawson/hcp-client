import { shallow } from 'enzyme';
import React from 'react';

import { LogbookTableCell } from '.';

describe('LogbookTableCell test suite', () => {
  test('LogbookTableCell renders correctly', () => {
    const wrapper = shallow(<LogbookTableCell borderLeft borderRight />);
    expect(wrapper).toMatchSnapshot();
  });
});
