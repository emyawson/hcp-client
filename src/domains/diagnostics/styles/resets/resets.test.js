import React from 'react';
import styled from 'styled-components'; // eslint-disable-line
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { ButtonReset } from './index';

test('it renders a button without browser default styling', () => {
  const tree = renderer.create(<ButtonReset />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('border', '0');
});
test('it renders disabled button styling', () => {
  const tree = renderer.create(<ButtonReset disabled />).toJSON();
  expect(tree).toHaveStyleRule('pointer-events', 'none');
});
