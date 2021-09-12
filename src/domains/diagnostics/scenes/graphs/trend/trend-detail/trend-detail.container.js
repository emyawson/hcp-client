import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils';
import {
  changeGraph,
  changeLogbookType,
} from 'src/domains/diagnostics/store/actions';

import { TrendDetailComponent } from './trend-detail.component';
import { trendDetailConnector } from './trend-detail.selector';

const dispatchers = mapDispatchers({
  changeGraph,
  changeLogbookType,
});

export const TrendDetailContainer = compose(
  withRouter,
  connect(
    trendDetailConnector,
    dispatchers,
  ),
)(TrendDetailComponent);
