import { shallow } from 'enzyme';
import React from 'react';

import { LogbookDetailsCell } from '.';

const mockProps = {
  numberOfRows: 4,
};

describe('LogbookDetailsCell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookDetailsCell {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
