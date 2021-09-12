import React from 'react';
import { shallow } from 'enzyme';

import {
  Tabs,
  TabsHeader,
  TabItem,
  TabLinkItem,
  TabsContent,
  sanitizePath,
  TabsHeaderSmall,
  isActiveTitle,
} from './tabs.component';

describe('Tab components', () => {
  describe('Route Tabs', () => {
    const tabs = [
      {
        name: 'Strip Delivery',
        path: 'strip-information',
        Component: () => <div>info</div>,
      },
      {
        name: 'Prescription',
        path: 'prescription',
        Component: () => <div>prescription</div>,
      },
    ];

    it('renders routing tabs correctly', () => {
      const wrapper = shallow(
        <Tabs>
          {tabs.map(t => (
            <TabLinkItem {...t} currentTitle={t.name} key={t.name} />
          ))}
        </Tabs>,
      );
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(TabLinkItem)).toHaveLength(2);
    });
  });

  describe('Non route Tabs', () => {
    const tabs = [
      {
        name: 'trend',
        activeTitle: 'trend',
        onClick: () => {},
      },
    ];

    it('renders non route tabs correctly', () => {
      const wrapper = shallow(
        <Tabs>
          {tabs.map(t => <TabItem {...t} currentTitle={t.name} key={t.name} />)}
        </Tabs>,
      );
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(TabItem)).toHaveLength(1);
    });
  });

  describe('Tab scaffolding', () => {
    it('renders atomic tab components correctly: Header Small', () => {
      const wrapper = shallow(<TabsHeaderSmall />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders atomic tab components correctly: Header', () => {
      const wrapper = shallow(<TabsHeader />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders atomic tab components correctly: Content', () => {
      const wrapper = shallow(<TabsContent />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders atomic tab components correctly: Item', () => {
      const wrapper = shallow(<TabItem />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('Tab Utils', () => {
  const match = {
    url: 'http://localhost:3000',
  };
  it('should return the current URL if no path is set', () => {
    expect(sanitizePath(match, '')).toBe(match.url);
  });
  it('should append path to the given url', () => {
    expect(sanitizePath(match, 'test-page')).toBe(`${match.url}/test-page`);
  });
  it('should set active state if titles match and have value', () => {
    const activeTitle = 'profile';
    const currentTitle = 'profile';
    expect(isActiveTitle(currentTitle, activeTitle)).toBeTruthy();
    expect(isActiveTitle(currentTitle, null)).toBeFalsy();
  });
});
