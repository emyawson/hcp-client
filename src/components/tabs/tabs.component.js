import { allPass, equals, isEmpty } from 'ramda';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { hasValue } from 'src/utils';

import {
  TabBarWrapper,
  TabBarWrapperSmall,
  TabContent,
  TabsContainer,
  TabsList,
  TabsListItem,
  TabsListItemSmall,
  TabLink,
  RouterTabLink,
  RouterTabLinkSmall,
} from './tabs.style';

/**
 * Please do not add props to catch everything
 */

const LINK_ACTIVE_CLASS = 'active';

export const isActiveTitle = (currentTitle, activeTitle) =>
  allPass([hasValue, equals(activeTitle)])(currentTitle);

export const createActiveClassByTitle = (currentTitle, activeTitle) =>
  isActiveTitle(currentTitle, activeTitle) ? LINK_ACTIVE_CLASS : '';

export const sanitizePath = (match, path) =>
  isEmpty(path) ? match.url : `${match.url}/${path}`;

export const TabItem = ({ onClick, activeTitle, currentTitle, name }) => (
  <TabsListItem key={name}>
    <TabLink
      className={createActiveClassByTitle(currentTitle, activeTitle)}
      onClick={onClick}
    >
      {name}
    </TabLink>
  </TabsListItem>
);

export const TabLinkItem = withRouter(
  ({
    activeTitle,
    currentTitle,
    match,
    path,
    name,
    exact = false,
    onClick,
  }) => (
    <TabsListItem key={name} onClickCapture={onClick}>
      <RouterTabLink
        tabIndex="0"
        exact={exact}
        to={sanitizePath(match, path)}
        className={createActiveClassByTitle(currentTitle, activeTitle)}
      >
        {name}
      </RouterTabLink>
    </TabsListItem>
  ),
);

export const TabLinkItemSmall = withRouter(
  ({ match, path, name, exact = false, onClick }) => (
    <TabsListItemSmall key={name} onClickCapture={onClick}>
      <RouterTabLinkSmall
        tabIndex="0"
        exact={exact}
        to={sanitizePath(match, path)}
      >
        {name}
      </RouterTabLinkSmall>
    </TabsListItemSmall>
  ),
);

export const TabsContent = ({
  children,
  render = tabChildren => <TabContent>{tabChildren}</TabContent>,
}) => render(children);
export const TabsHeader = ({ children, name, ...props }) => (
  <TabBarWrapper {...props}>
    <TabsList>{children}</TabsList>
  </TabBarWrapper>
);
export const TabsHeaderSmall = ({ children, name, ...props }) => (
  <TabBarWrapperSmall {...props}>
    <TabsList>{children}</TabsList>
  </TabBarWrapperSmall>
);
export const Tabs = ({
  activeTab,
  children,
  ml,
  render = tabChildren => <TabsContainer ml={ml}>{tabChildren}</TabsContainer>,
}) => render(children);
