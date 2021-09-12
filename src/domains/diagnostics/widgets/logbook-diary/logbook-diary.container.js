import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { LogbookDiary } from './logbook-diary.component';
import { logbookDiaryConnector } from './logbook-diary.selector';

const dispatchers = mapDispatchers({});

export const LogbookDiaryContainer = compose(
  withRouter,
  connect(
    logbookDiaryConnector,
    dispatchers,
  ),
)(LogbookDiary);
