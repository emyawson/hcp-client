import { shallow } from 'enzyme';
import React from 'react';

import { MealTimeLabelCell } from '.';

describe('MealTimeLabelCell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <MealTimeLabelCell keyText={'test'} mealTime={'NIGHT'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
