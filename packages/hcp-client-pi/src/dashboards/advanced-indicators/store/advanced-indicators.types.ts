import { PayloadAction } from '@roche/patterns-indicators/core';

export enum AdvancedIndicatorsActionType {
  SELECT_TAB_ACTION = 'SELECT_TAB_ACTION',
  SELECT_WARNING_SEGMENT_ACTION = 'SELECT_WARNING_SEGMENT_ACTION',
}

export type AdvancedIndicatorsState = {
  readonly selectedTabId: string;
  readonly selectedWarningSegment: string;
};

export type SelectTabAction = PayloadAction<
  AdvancedIndicatorsActionType.SELECT_TAB_ACTION,
  string
>;

export type SelectWarningSegmentAction = PayloadAction<
  AdvancedIndicatorsActionType.SELECT_WARNING_SEGMENT_ACTION,
  string
>;

export type AdvancedIndicatorsActions =
  | SelectTabAction
  | SelectWarningSegmentAction;

export type AdvancedIndicatorsReducerActions = AdvancedIndicatorsActions;
