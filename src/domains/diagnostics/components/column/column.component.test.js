import React from 'react';
import styled from 'styled-components'; //eslint-disable-line
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Column } from './column.component';

describe('column test suite', () => {
  test('it renders correctly', () => {
    const tree = renderer
      .create(
        <Column>
          <div>cell</div>
          <div>cell2</div>
        </Column>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
