import * as React from 'react';
import { shallow } from 'enzyme';

import { Badge } from 'src/components/badge';

import {
  calculateIconHeightFromBadgeSize,
  SuccessBadge,
} from './success-badge.component';

describe('Success Badge', () => {
  it('Should calculate the correct ratio of icon size to circle size', () => {
    expect(calculateIconHeightFromBadgeSize(100)).toBe(42);
  });
  it('Should render correctly', () => {
    const wrapper = shallow(<SuccessBadge size={50} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(Badge).length).toBe(1);
  });
});
