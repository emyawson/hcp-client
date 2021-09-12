import { shallow } from 'enzyme';
import React from 'react';

import { LogbookUnitsHeader } from '.';

describe('Logbook Units Header test suite', () => {
  test('LogbookUnitsHeader renders correctly', () => {
    const wrapper = shallow(<LogbookUnitsHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
