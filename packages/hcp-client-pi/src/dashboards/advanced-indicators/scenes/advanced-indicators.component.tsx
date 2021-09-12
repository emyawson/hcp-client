import * as React from 'react';
import { withTheme } from 'styled-components';

import {
  TabLinkItem,
  TabsContent,
  TabsHeader,
  TabsRouted,
} from '@roche/patterns-indicators/components';
import {
  COMPARE_TAB,
  WARNINGS_TAB,
} from '@roche/patterns-indicators/dashboards/advanced-indicators/scenes';
import { Warnings } from '@roche/patterns-indicators/domains';
import { Compare } from '@roche/patterns-indicators/domains/compare';
import { ConfigurationsContainer } from '@roche/patterns-indicators/domains/configurations';
import { RenderIf } from '@roche/patterns-indicators/utils/markup';

import { tabs } from './advanced-indicators.constants';
import {
  FlexibleHeightCard,
  NavContainer,
  NavContainerMain,
  SettingsMenuLinkContainer,
} from './advanced-indicators.style';
import {
  AdvancedIndicatorsProps,
  AdvancedIndicatorsState,
} from './advanced-indicators.types';
import { SettingsMenuLink } from './components';

const renderChildren = children => <div>{children}</div>;

export class AdvancedIndicatorsComponent extends React.Component<
  AdvancedIndicatorsProps,
  AdvancedIndicatorsState
> {
  constructor(props: AdvancedIndicatorsProps) {
    super(props);
    this.state = {
      showSettingsMenu: false,
    };
  }
  public render() {
    const { selectTabAction: selectTab, selectedTabId, theme } = this.props;
    const firstTimeUser = false; // TODO: get this data from store which is fetched from the backend

    return (
      <FlexibleHeightCard>
        <RenderIf validate={!firstTimeUser && !this.state.showSettingsMenu}>
          <TabsRouted render={renderChildren}>
            <NavContainerMain>
              <NavContainer>
                <TabsHeader px={4} pt={4} mr="auto" ml="0">
                  {tabs.map((t, index) => (
                    <TabLinkItem
                      {...t}
                      currentTab={t}
                      key={`${t}-${index}`}
                      selectTab={selectTab}
                      selectedTabId={selectedTabId}
                    />
                  ))}
                </TabsHeader>
              </NavContainer>
            </NavContainerMain>
          </TabsRouted>
          <TabsContent>{this.renderTabsContentChild()}</TabsContent>
          <SettingsMenuLinkContainer>
            <SettingsMenuLink
              color={theme.colors.blue}
              onClick={this.toggleShowSettingsMenu}
            />
          </SettingsMenuLinkContainer>
        </RenderIf>
        <RenderIf validate={this.state.showSettingsMenu}>
          <ConfigurationsContainer
            toggleDisplay={this.toggleShowSettingsMenu}
          />
        </RenderIf>
      </FlexibleHeightCard>
    );
  }
  private renderTabsContentChild = () => {
    const {
      selectedTabId,
      selectWarningSegmentAction: selectWarningSegment,
      selectedWarningSegment,
    } = this.props;
    switch (selectedTabId) {
      case WARNINGS_TAB:
        return (
          <Warnings
            selectSegment={selectWarningSegment}
            selectedSegment={selectedWarningSegment}
          />
        );
      case COMPARE_TAB:
        return <Compare />;
      default:
        return null;
    }
  };
  private toggleShowSettingsMenu = () => {
    this.setState({ showSettingsMenu: !this.state.showSettingsMenu });
  };
}

export const AdvancedIndicators = withTheme(AdvancedIndicatorsComponent);
