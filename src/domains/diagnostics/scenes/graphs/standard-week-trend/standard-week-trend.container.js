import { compose } from 'recompose';
import { connect } from 'react-redux';

import { StandardWeekTrend } from './standard-week-trend.component';
import { standardWeekTrendConnector } from './standard-week-trend.selector';

export const StandardWeekTrendContainer = compose(
  connect(
    standardWeekTrendConnector,
    null,
  ),
)(StandardWeekTrend);
