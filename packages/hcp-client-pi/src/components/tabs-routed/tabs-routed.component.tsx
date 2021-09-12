import * as React from 'react';

import { StyledSystemProps } from '@roche/patterns-indicators/utils/styles/styled-system.types';

import {
  TabBarWrapper,
  TabContent,
  TabsContainer,
  TabsList,
  TabsListItem,
} from './tabs-routed.style';

interface TabsLinkItemProps {
  currentTab: { id: string; name: string };
  key: string;
  selectTab: (string) => void;
  selectedTabId: string;
}

export class TabLinkItem extends React.Component<TabsLinkItemProps> {
  public render() {
    const { currentTab, selectTab, selectedTabId } = this.props;
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
      selectTab(currentTab.id);

    return (
      <TabsListItem
        className={selectedTabId === currentTab.id ? 'active' : ''}
        onClick={handleClick}
      >
        {currentTab.name}
      </TabsListItem>
    );
  }
}

interface TabsContentProps extends StyledSystemProps {
  children?: any;
}

export const TabsContent: React.StatelessComponent<TabsContentProps> = ({
  children,
}: TabsContentProps) => <TabContent>{children}</TabContent>;

interface TabsHeaderProps extends StyledSystemProps {
  children?: any;
  name?: string;
}

export const TabsHeader: React.StatelessComponent<TabsHeaderProps> = ({
  children,
  name,
  ...props
}: TabsHeaderProps) => (
  <TabBarWrapper {...props}>
    <TabsList>{children}</TabsList>
  </TabBarWrapper>
);

interface TabsProps {
  activeTab?: boolean;
  children: any;
  ml?: string | number;
  render: any;
}

export const TabsRouted: React.StatelessComponent<TabsProps> = ({
  activeTab,
  children,
  ml,
  render = tabs => <TabsContainer ml={ml}>{tabs}</TabsContainer>,
}: TabsProps) => render(children);
