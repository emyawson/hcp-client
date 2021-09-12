import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onPatientDateRangeChange } from 'src/domains/diagnostics/core';
import { mapDispatchers } from 'src/domains/diagnostics/utils';
import { getClinicalData } from 'src/domains/diagnostics/store/actions';

import { globalGraphOptionsConnector } from './global-graph-options.selector';
import { GlobalGraphOptions } from './global-graph-options.component';

const dispatchers = mapDispatchers({
  onDatesChange: onPatientDateRangeChange,
  getClinicalData: getClinicalData.start,
});

export const GlobalGraphOptionsContainer = compose(
  connect(
    globalGraphOptionsConnector,
    dispatchers,
  ),
  withRouter,
)(GlobalGraphOptions);
