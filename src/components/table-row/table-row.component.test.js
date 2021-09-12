import { shallow } from 'enzyme';
import React from 'react';

import { TableRow, TableAltRow } from './table-row.component';

describe('table row test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <TableRow>
        <td>row</td>
      </TableRow>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders correctly', () => {
    const wrapper = shallow(
      <TableAltRow>
        <div>row</div>
      </TableAltRow>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
