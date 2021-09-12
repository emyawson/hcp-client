import React from 'react';

import {
  Container,
  ContentContainer,
  Nav,
  NavTabsList,
  NavTabsListItem,
  NavTabsListItemText,
  SelectedLine,
} from './vertical-tabs.style';

export class VerticalTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }

  render() {
    const {
      height,
      minHeight,
      navItemLabelSelectedStyle,
      tabs,
      m,
    } = this.props;
    return (
      <Container minHeight={minHeight} m={m}>
        <Nav>
          <NavTabsList>
            {tabs.map((tab, index) => (
              <NavTabsListItem
                key={tab.keyText}
                onClick={() => this.setState({ selectedTabIndex: index })}
                selected={index === this.state.selectedTabIndex}
                selectedStyle={navItemLabelSelectedStyle}
              >
                <SelectedLine show={index === this.state.selectedTabIndex} />
                <NavTabsListItemText
                  selected={index === this.state.selectedTabIndex}
                >
                  {tab.label}
                </NavTabsListItemText>
              </NavTabsListItem>
            ))}
          </NavTabsList>
        </Nav>
        <ContentContainer height={height}>
          {tabs[this.state.selectedTabIndex].content}
        </ContentContainer>
      </Container>
    );
  }
}
