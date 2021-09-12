import { shallow } from 'enzyme';
import React from 'react';

import { LogbookCellBlocksContainer } from './logbook-cell-blocks-container.component';

describe('LogbookCellBlocksContainer test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookCellBlocksContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
