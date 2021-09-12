import React from 'react';
import styled from 'styled-components'; // eslint-disable-line
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ButtonReset, ListReset } from './index';

describe('Styled Component Element Resets', () => {
  test('it renders a button without browser default styling', () => {
    const tree = renderer.create(<ButtonReset />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border', '0');
  });
  test('it renders disabled button styling', () => {
    const tree = renderer.create(<ButtonReset disabled />).toJSON();
    expect(tree).toHaveStyleRule('pointer-events', 'none');
  });
  test('it renders an unordered list without bulleted styling', () => {
    const tree = renderer
      .create(
        <ListReset>
          <li>Test 1</li>
          <li>Test 2</li>
          <li>Test 3</li>
        </ListReset>,
      )
      .toJSON();
    expect(tree).toHaveStyleRule('list-style', 'none');
  });
});
