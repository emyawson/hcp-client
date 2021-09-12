import { shallow } from 'enzyme';
import * as React from 'react';

import { VerticalTabs } from './vertical-tabs.component';

describe('VerticalTabsComponent test suite', () => {
  it('should render correctly', () => {
    const mockSetSelectedTabIndex = () => ({});
    const wrapper = shallow(
      <VerticalTabs setSelectedTabIndex={mockSetSelectedTabIndex} theme={{}} />,
    );
    expect(wrapper).toBeDefined();
  });
});
