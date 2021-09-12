import React from 'react';
import styled from 'styled-components'; //eslint-disable-line
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Row } from './row.component';

describe('row test suite', () => {
  test('it renders correctly', () => {
    const tree = renderer
      .create(
        <Row>
          <div>cell</div>
          <div>cell2</div>
        </Row>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
