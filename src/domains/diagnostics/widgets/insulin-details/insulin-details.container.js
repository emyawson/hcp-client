import { compose } from 'recompose';
import { connect } from 'react-redux';

import { InsulinDetails } from './insulin-details.component';
import { insulinDetailsConnector } from './insulin-details.selector';

export const InsulinDetailsContainer = compose(
  connect(
    insulinDetailsConnector,
    null,
  ),
)(InsulinDetails);
