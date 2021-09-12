import { compose } from 'recompose';
import { connect } from 'react-redux';

import { StandardDayTrend } from './standard-day-trend.component';
import { standardDayTrendConnector } from './standard-day-trend.selector';

export const StandardDayTrendContainer = compose(
  connect(
    standardDayTrendConnector,
    null,
  ),
)(StandardDayTrend);
