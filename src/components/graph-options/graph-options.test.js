import { shallow } from 'enzyme';
import React from 'react';

import { GraphOptions } from '.';

describe('GraphOptions test suite', () => {
  test('it renders correctly', () => {
    const mockMatch = {
      params: {
        id: 1,
      },
    };
    const wrapper = shallow(
      <GraphOptions
        match={mockMatch}
        bloodGlucoseToggle
        bgBeforeMealToggle
        bgAfterMealToggle
        meanBloodGlucoseToggle
        connectingLinesToggle
        gridLinesToggle
        showDetailGraphOptions
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
