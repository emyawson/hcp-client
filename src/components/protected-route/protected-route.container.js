import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { validateSession } from 'src/core';
import { mapDispatchers } from 'src/utils';

import { ProtectedRoute as ProtectedRouteComponent } from './protected-route.component';
import { protectedRouteConnector } from './protected-route.selectors';

export const ProtectedRoute = compose(
  withRouter,
  connect(
    protectedRouteConnector,
    mapDispatchers({ validateSession: validateSession.start }),
  ),
)(ProtectedRouteComponent);
