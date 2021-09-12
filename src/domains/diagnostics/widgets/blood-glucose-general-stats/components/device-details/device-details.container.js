import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DeviceDetailsComponent } from './device-details.component';
import { DeviceDetailsConnector } from './device-details.selector';

export const DeviceDetailsContainer = compose(
  withRouter,
  connect(
    DeviceDetailsConnector,
    null,
  ),
)(DeviceDetailsComponent);
