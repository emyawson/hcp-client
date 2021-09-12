import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { DistributionCard } from './distribution-card.component';
import { DistributionCardConnector } from './distribution-card.selector';

const dispatchers = mapDispatchers({});

export const DistributionCardContainer = compose(
  connect(
    DistributionCardConnector,
    dispatchers,
  ),
)(DistributionCard);
