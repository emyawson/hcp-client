import { shallow } from 'enzyme';
import React from 'react';

import { LogbookDayCell } from './logbook-day-cell.component';

const mockProps = {
  dayLines: ['Wednesday,', 'Jan 17, 2017'],
  numberOfRows: 4,
};

describe('LogbookDayCell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookDayCell {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
