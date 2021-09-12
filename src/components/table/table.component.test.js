import { shallow } from 'enzyme';
import React from 'react';

import { Table } from './table.component';

describe('table test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <Table>
        <tr>table</tr>
      </Table>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
