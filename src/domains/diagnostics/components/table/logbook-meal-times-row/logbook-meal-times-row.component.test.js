import { shallow } from 'enzyme';
import React from 'react';

import { LogbookMealTimesRow } from '.';

const mockProps = {
  mealTimes: {
    BREAKFAST: {
      hasBeforeAndAfterIntervals: true,
      measurements: [],
      numberOfRowsWithContent: 2,
    },
  },
  numberOfRows: 3,
};

describe('LogbookMealTimesRow test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookMealTimesRow {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
