import { shallow } from 'enzyme';
import React from 'react';

import { EmptyRows } from '.';

const mockProps = {
  numberOfRows: 3,
  numberOfCells: 3,
  showBorder: true,
};

describe('EmptyRows test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<EmptyRows {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
