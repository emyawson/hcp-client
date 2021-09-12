import * as enzyme from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';

import { Column } from './column.component';

describe('column test suite', () => {
  test('it renders correctly', () => {
    const tree = enzyme.shallow(
      <div>
        <Column>cell</Column>
        <Column>cell2</Column>
        <Column>cell2</Column>
      </div>,
    );
    expect(tree.find(Column)).toHaveLength(3);
  });
});
