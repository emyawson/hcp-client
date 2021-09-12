import { shallow } from 'enzyme';
import React from 'react';

import { LogbookTableRow } from '.';

describe('LogbookTableRow test suite', () => {
  test('LogbookTableRow renders correctly', () => {
    const wrapper = shallow(<LogbookTableRow borderTop borderBottom />);
    expect(wrapper).toMatchSnapshot();
  });
});
