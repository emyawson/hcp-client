import { SectionHeader } from '@roche/patterns-indicators/components';
import {
  Container,
  ContentContainer,
  Nav,
  NavTabsList,
  NavTabsListItem,
  NavTabsListItemText,
  NavTabsListTitle,
  SelectedLine,
} from '@roche/patterns-indicators/domains/alert-settings/components/vertical-tabs/vertical-tabs.style';
import { RenderIf } from '@roche/patterns-indicators/utils/markup/render-if.utils';
import * as React from 'react';
import { withTheme } from 'styled-components';

import { Tab } from '../../alert-settings.types';

interface VerticalTab extends Tab {
  label: JSX.Element;
  toggled: boolean;
  selected: boolean;
}

export interface VerticalTabsProps {
  headerText?: string;
  minHeight?: number;
  navItemLabelSelectedStyle?: string;
  setSelectedTabIndex: (index: number) => void;
  tabs?: VerticalTab[];
  theme: any;
}

interface VerticalTabsState {
  selectedTabIndex: number;
}
class VerticalTabsComponent extends React.Component<
  VerticalTabsProps,
  VerticalTabsState
> {
  constructor(props: VerticalTabsProps) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }

  public render() {
    const {
      headerText,
      navItemLabelSelectedStyle = '',
      tabs = [],
      theme,
    } = this.props;
    return (
      <Container>
        <Nav onChange={this.tabsChangeHandler}>
          <RenderIf validate={headerText}>
            <NavTabsListTitle>
              <SectionHeader
                borderColor={theme.colors.silverLight}
                title={headerText}
              />
            </NavTabsListTitle>
          </RenderIf>
          <NavTabsList>
            {tabs.map((tab, index) => {
              return (
                <NavTabsListItem
                  key={`tab ${index}`}
                  onClick={
                    tab.enabled ? this.setSelectedTabIndex(index) : undefined
                  }
                  selected={index === this.state.selectedTabIndex}
                  selectedStyle={navItemLabelSelectedStyle}
                >
                  <SelectedLine show={index === this.state.selectedTabIndex} />
                  <NavTabsListItemText>{tab.label}</NavTabsListItemText>
                </NavTabsListItem>
              );
            })}
          </NavTabsList>
        </Nav>
        <ContentContainer>
          {tabs[this.state.selectedTabIndex].content}
        </ContentContainer>
      </Container>
    );
  }

  private setSelectedTabIndex = (index: number) => () => {
    this.props.setSelectedTabIndex(index);
    this.setState({ selectedTabIndex: index });
  };

  private tabsChangeHandler = (event: React.ChangeEvent<any>) => {
    const tabIndex = event.target.id;
    const isChecked = event.target.checked;
    const elementType = event.target.type;

    if (elementType === 'checkbox') {
      if (!isChecked) {
        this.setSelectedTabIndex(0)();
      } else {
        this.setSelectedTabIndex(Number(tabIndex))();
      }
    }
  };
}

export const VerticalTabs = withTheme(VerticalTabsComponent);
