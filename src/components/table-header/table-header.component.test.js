import { shallow } from 'enzyme';
import React from 'react';

import { TableHeader } from './table-header.component';

describe('table header test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <TableHeader>
        <tr>header</tr>
      </TableHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
