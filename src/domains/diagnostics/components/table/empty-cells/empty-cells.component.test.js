import { shallow } from 'enzyme';
import React from 'react';

import { EmptyCells } from '.';

const mockProps = {
  numberOfCells: 5,
  showBorder: true,
};

describe('EmptyCells test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<EmptyCells {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
