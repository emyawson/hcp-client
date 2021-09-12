import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { LogbookStats } from './logbook-stats.component';
import { logbookStatsConnector } from './logbook-stats.selector';

const dispatchers = mapDispatchers({});

export const LogbookStatsContainer = compose(
  withRouter,
  connect(
    logbookStatsConnector,
    dispatchers,
  ),
)(LogbookStats);
