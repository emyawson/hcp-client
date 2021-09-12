import { shallow } from 'enzyme';
import React from 'react';

import { MealTimeIcon } from '.';

describe('MealTimeIcon test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <MealTimeIcon keyText={'test'} mealTime={'NIGHT'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
