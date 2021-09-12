import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';
import {
  changeGraph,
  changeLogbookType,
} from 'src/domains/diagnostics/store/actions';

import { StandardWeekDetailComponent } from './standard-week-detail.component';
import { standardWeekDetailConnector } from './standard-week-detail.selector';

const dispatchers = mapDispatchers({
  changeGraph,
  changeLogbookType,
});

export const StandardWeekDetailContainer = compose(
  withRouter,
  connect(
    standardWeekDetailConnector,
    dispatchers,
  ),
)(StandardWeekDetailComponent);
