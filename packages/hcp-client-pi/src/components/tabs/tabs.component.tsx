import * as React from 'react';

export type Tab = {
  label: string;
  content: React.ReactNode;
};

export interface TabsProps {
  readonly tabs: Tab[];
}

export interface TabsState {
  selectedTab: number;
}

export class TabsComponent extends React.Component<TabsProps, TabsState> {
  public state = {
    selectedTab: 0, // start on the first tab
  };

  public selectTab = (index: number) => {
    this.setState({
      selectedTab: index,
    });
  };

  public render() {
    const { tabs } = this.props;

    return (
      <ul>
        {tabs.map(({ label, content }: Tab, i) => {
          const currentTabLabel = (
            <li key={`tab-${i}`} onClick={this.selectTab.bind(this, i)}>
              {label}
            </li>
          );

          return i === this.state.selectedTab ? (
            <div>
              <b>{currentTabLabel}</b>
              {content}
            </div>
          ) : (
            currentTabLabel
          );
        })}
      </ul>
    );
  }
}
