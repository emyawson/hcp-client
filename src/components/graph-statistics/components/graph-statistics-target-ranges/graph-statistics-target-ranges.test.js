import React from 'react';
import { shallow } from 'enzyme';

import { GraphDetailTargetRanges } from './graph-statistics-target-ranges.component';

describe('graph-statistics-target-ranges test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <GraphDetailTargetRanges
        abovePercentage={40}
        belowPercentage={30}
        hypoglycaemiaNumber={1}
        hypoglycaemiaPercentage={10}
        targetBloodGlucoseMinimum={170}
        targetBloodGlucoseMaximum={250}
        withinPercentage={30}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
