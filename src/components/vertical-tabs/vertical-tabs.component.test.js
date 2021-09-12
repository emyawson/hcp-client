import { shallow } from 'enzyme';
import React from 'react';

import { VerticalTabs } from './vertical-tabs.component';
import { NavTabsListItem } from './vertical-tabs.style';

const mockProps = {
  tabs: [{ label: <span />, keyText: 'test123' }],
};

describe('Vertical Tabs component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<VerticalTabs {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should select a tab onclick', () => {
    const wrapper = shallow(<VerticalTabs {...mockProps} />);
    wrapper
      .find(NavTabsListItem)
      .first()
      .simulate('click');
    expect(wrapper.state().selectedTabIndex).toBe(0);
  });
});
