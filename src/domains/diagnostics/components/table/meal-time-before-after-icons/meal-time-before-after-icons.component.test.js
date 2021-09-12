import { shallow } from 'enzyme';
import React from 'react';

import { MealTimeBeforeAfterIcons } from '.';

describe('MealTimeBeforeAfterIcons test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <MealTimeBeforeAfterIcons keyText={'test'} mealTime={'BREAKFAST'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
