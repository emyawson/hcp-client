import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import { State } from '@roche/patterns-indicators/core';
import { Omit } from '@roche/patterns-indicators/utils/typescript';

import { selectTabAction, selectWarningSegmentAction } from '../store';

import { AdvancedIndicators } from './advanced-indicators.component';
import { advancedIndicatorsConnector } from './advanced-indicators.selector';
import { AdvancedIndicatorsProps } from './advanced-indicators.types';

export const AdvancedIndicatorsContainer: React.ComponentClass = compose<
  Omit<AdvancedIndicatorsProps, 'theme'>,
  {}
>(
  connect(
    advancedIndicatorsConnector,
    (dispatch: Dispatch<State>) => ({
      selectTabAction: payload => dispatch(selectTabAction(payload)),
      selectWarningSegmentAction: payload =>
        dispatch(selectWarningSegmentAction(payload)),
    }),
  ),
)(AdvancedIndicators);
