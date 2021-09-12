import { WARNINGS_TAB } from '@roche/patterns-indicators/dashboards/advanced-indicators/scenes';
import { set } from '@roche/patterns-indicators/utils';

import {
  AdvancedIndicatorsActionType,
  AdvancedIndicatorsReducerActions,
  AdvancedIndicatorsState,
} from './advanced-indicators.types';

export const initialAdvancedIndicatorsState: AdvancedIndicatorsState = {
  selectedTabId: WARNINGS_TAB,
  selectedWarningSegment: 'Trend Graph',
};

export const AdvancedIndicatorsReducer = (
  state: AdvancedIndicatorsState = initialAdvancedIndicatorsState,
  action: AdvancedIndicatorsReducerActions,
): AdvancedIndicatorsState => {
  switch (action.type) {
    case AdvancedIndicatorsActionType.SELECT_TAB_ACTION:
      return set('selectedTabId', action.payload, state);
    case AdvancedIndicatorsActionType.SELECT_WARNING_SEGMENT_ACTION:
      return set('selectedWarningSegment', action.payload, state);
    default:
      return state;
  }
};
