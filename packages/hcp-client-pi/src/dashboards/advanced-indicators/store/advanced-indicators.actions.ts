import { createPayloadAction } from '@roche/patterns-indicators/core';

import {
  AdvancedIndicatorsActionType,
  SelectTabAction,
  SelectWarningSegmentAction,
} from './advanced-indicators.types';

export const selectTabAction = (payload: string): SelectTabAction =>
  createPayloadAction(AdvancedIndicatorsActionType.SELECT_TAB_ACTION, payload);

export const selectWarningSegmentAction = (
  payload: string,
): SelectWarningSegmentAction =>
  createPayloadAction(
    AdvancedIndicatorsActionType.SELECT_WARNING_SEGMENT_ACTION,
    payload,
  );
