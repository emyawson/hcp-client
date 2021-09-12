import { shallow } from 'enzyme';
import React from 'react';

import { MealTimesTableHeader } from '.';

describe('MealTimesTableHeader test suite', () => {
  test('MealTimesTableHeader renders correctly', () => {
    const wrapper = shallow(
      <MealTimesTableHeader>
        <div>test children</div>
      </MealTimesTableHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
