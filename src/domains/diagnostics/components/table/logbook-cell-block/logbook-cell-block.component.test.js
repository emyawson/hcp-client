import { shallow } from 'enzyme';
import React from 'react';

import { LogbookCellBlock } from './logbook-cell-block.component';

describe('LogbookCellBlock test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookCellBlock />);
    expect(wrapper).toMatchSnapshot();
  });
});
