import * as enzyme from 'enzyme';
import * as React from 'react';

import { Block } from './block.component';

describe('block test suite', () => {
  test('it renders correctly', () => {
    const tree = enzyme.shallow(
      <div>
        <Block>cell</Block>
        <Block>cell2</Block>
        <Block>cell2</Block>
      </div>,
    );
    expect(tree.find(Block)).toHaveLength(3);
  });
});
