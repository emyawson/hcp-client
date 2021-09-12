export type AdvancedIndicatorsProps = {
  readonly selectedTabId: string;
  readonly selectedWarningSegment: string;
  readonly selectTabAction: () => string;
  readonly selectWarningSegmentAction: () => string;
  readonly theme: any;
};

export type AdvancedIndicatorsState = {
  showSettingsMenu: boolean;
};
