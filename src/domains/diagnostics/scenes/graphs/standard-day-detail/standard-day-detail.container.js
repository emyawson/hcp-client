import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';
import {
  changeGraph,
  changeGraphStartTime,
} from 'src/domains/diagnostics/store/actions';
import { changeLogbookType } from 'src/domains/diagnostics/store/actions';

import { StandardDayDetail } from './standard-day-detail.component';
import { standardDayDetailConnector } from './standard-day-detail.selector';

const dispatchers = mapDispatchers({
  changeGraph,
  changeLogbookType,
  changeGraphStartTime,
});

export const StandardDayDetailContainer = compose(
  withRouter,
  connect(
    standardDayDetailConnector,
    dispatchers,
  ),
)(StandardDayDetail);
