import { shallow } from 'enzyme';
import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import { DistributionCard } from './distribution-card.component';

const props = {
  distribution: {
    above: 0.25,
    within: 0.25,
    below: 0.25,
    hypoglycaemia: 0.25,
  },
  distributionSegments: {
    above: {
      value: 0.25,
      fill: colors.blueLight,
    },
    within: {
      value: 0.25,
      fill: colors.trafficGreen,
    },
    below: {
      value: 0.25,
      fill: colors.trafficOrange,
    },
    hypoglycaemia: {
      value: 0.25,
      fill: colors.red,
    },
  },
  threshold: {
    glucoseIdealIntervalMax: 120,
    glucoseIdealIntervalMin: 80,
  },
};

describe('DistributionCard', () => {
  test('DistributionCard renders correctly', () => {
    const wrapper = shallow(<DistributionCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
