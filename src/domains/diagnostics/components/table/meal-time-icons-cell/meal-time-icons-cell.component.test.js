import { shallow } from 'enzyme';
import React from 'react';

import { MealTimeIconsCell } from '.';

describe('MealTimeIconsCell test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <MealTimeIconsCell keyText={'test'} mealTime={'NIGHT'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
