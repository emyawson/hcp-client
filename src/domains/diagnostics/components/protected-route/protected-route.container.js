import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { validateSession } from 'src/domains/diagnostics/core';
import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { ProtectedRoute as ProtectedRouteComponent } from './protected-route.component';
import { protectedRouteConnector } from './protected-route.selectors';

export const ProtectedRoute = compose(
  withRouter,
  connect(
    protectedRouteConnector,
    mapDispatchers({ validateSession: validateSession.start }),
  ),
)(ProtectedRouteComponent);
