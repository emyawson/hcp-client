import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';

import { Logbook } from './logbook.component';
import { logbookConnector } from './logbook.selector';

const dispatchers = mapDispatchers({});

export const LogbookContainer = compose(
  withRouter,
  withToolTip,
  connect(
    logbookConnector,
    dispatchers,
  ),
)(Logbook);
