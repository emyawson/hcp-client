import { compose } from 'recompose';
import { connect } from 'react-redux';

import { StatusCard } from './status-card.component';
import { StatusCardConnector } from './status-card.selector';

export const StatusCardContainer = compose(connect(StatusCardConnector))(
  StatusCard,
);
