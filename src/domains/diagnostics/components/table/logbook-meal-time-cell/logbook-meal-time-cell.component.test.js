import { shallow } from 'enzyme';
import React from 'react';

import { LogbookMealTimeCell } from '.';

const mockProps = {
  hasBeforeAndAfterIntervals: true,
  mealTimeMatrix: [
    {
      after: {},
      before: {
        afterMeal: false,
        beforeMeal: false,
        date: 'Wed Dec 27 2017 17:48:00 GMT-0500 (EST)',
        glucose: 146,
        bolus: null,
        carbohydrates: null,
      },
    },
  ],
  numberOfRowsWithContent: 2,
  numberOfTotalRows: 4,
};

describe('LogbookMealTimeCell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(<LogbookMealTimeCell {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
