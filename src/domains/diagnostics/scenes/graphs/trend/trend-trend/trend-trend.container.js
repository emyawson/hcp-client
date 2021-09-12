import { compose } from 'recompose';
import { connect } from 'react-redux';

import { TrendTrend } from './trend-trend.component';
import { trendTrendConnector } from './trend-trend.selector';

export const TrendTrendContainer = compose(
  connect(
    trendTrendConnector,
    null,
  ),
)(TrendTrend);
