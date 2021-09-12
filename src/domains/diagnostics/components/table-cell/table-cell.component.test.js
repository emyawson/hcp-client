import { shallow } from 'enzyme';
import React from 'react';

import { TableCell } from './table-cell.component';

describe('table cell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <TableCell>
        <div>cell</div>
      </TableCell>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
