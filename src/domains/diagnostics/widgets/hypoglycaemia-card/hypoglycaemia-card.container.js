import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { HypoglycaemiaCard } from './hypoglycaemia-card.component';
import { HypoglycaemiaCardConnector } from './hypoglycaemia-card.selectors';

const dispatchers = mapDispatchers({});

export const HypoglycaemiaCardContainer = compose(
  connect(
    HypoglycaemiaCardConnector,
    dispatchers,
  ),
)(HypoglycaemiaCard);
