import { shallow } from 'enzyme';
import React from 'react';

import { TableBody } from './table-body.component';

describe('table body test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <TableBody>
        <tr>body</tr>
      </TableBody>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
