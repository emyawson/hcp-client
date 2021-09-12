import React from 'react';
import { shallow } from 'enzyme';

import { GraphDetail } from 'src/components';

const mockProps = {
  graphDetails: {
    bloodGlucoseValues: {
      bloodGlucoseMean: 158.4,
      bloodGlucoseStandardDeviation: 137.6,
      testsPerDay: 10,
    },
    targetRangesValues: {
      abovePercentage: 40,
      belowPercentage: 20,
      hypoglycaemiaNumber: 3,
      hypoglycaemiaPercentage: 30,
      targetBloodGlucoseMinimum: 80,
      targetBloodGlucoseMaximum: 125,
      withinPercentage: 20,
    },
  },
  graphStartTime: '0:00',
};

describe('graph-statistics test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <GraphDetail {...mockProps}>
        <div>test</div>
      </GraphDetail>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
