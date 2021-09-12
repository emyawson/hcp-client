import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { BGStatsCard } from './bg-stats-card.component';
import { BGStatsCardConnector } from './bg-stats-card.selector';

const dispatchers = mapDispatchers({});

export const BGStatsCardContainer = compose(
  connect(
    BGStatsCardConnector,
    dispatchers,
  ),
)(BGStatsCard);
