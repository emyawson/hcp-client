import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Insulin } from './insulin.component';
import { insulinConnector } from './insulin.selector';

export const InsulinContainer = compose(
  connect(
    insulinConnector,
    null,
  ),
)(Insulin);
