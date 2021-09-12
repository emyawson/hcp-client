import React from 'react';
import { shallow } from 'enzyme';

import { MealTimes } from './meal-times.component';
import { MealTitleWithTooltip } from './meal-title.component';

const mockProps = {
  graphLeftOffset: 10,
  graphRightOffset: 10,
  mealTimes: [
    {
      description: 'Night',
      startTime: 1,
      endTime: 6,
      width: 20.833333333333336,
    },
    {
      description: 'Breakfast',
      startTime: 6,
      endTime: 11.5,
      width: 22.916666666666664,
    },
  ],
  mealBlocks: [
    {
      description: 'BEDTIME',
      startTime: 0,
      endTime: 1,
      width: 4.166666666666666,
    },
    {
      description: 'NIGHT',
      startTime: 1,
      endTime: 6,
      width: 20.833333333333336,
    },
  ],
};

describe('Meal Time Axis', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MealTimes {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Meal Time Title', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MealTitleWithTooltip />);
    expect(wrapper).toMatchSnapshot();
  });
});
