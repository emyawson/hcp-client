import { shallow } from 'enzyme';
import React from 'react';

import { SearchResults } from './search-results.component';

describe('patient-results test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<SearchResults>0</SearchResults>);
    expect(wrapper).toMatchSnapshot();
  });
});
