import React from 'react';
import { isEmpty } from 'ramda';
import { Route, Redirect } from 'react-router-dom';

import { WithPermissions } from 'src/utils/with-permissions';

import { SessionGuard } from './session-guard.component';

export const ProtectedRoute = ({
  path,
  exact,
  isAuthenticated,
  component: Component,
  routes,
  hasPermissions = [],
  location,
  validateSession,
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      isAuthenticated ? (
        isEmpty(hasPermissions) ? (
          <SessionGuard validateSession={validateSession}>
            <Component {...props} />
          </SessionGuard>
        ) : (
          <WithPermissions
            hasPermissions={hasPermissions}
            onAccessDenied={() => <Redirect to={routes.general.home} />}
          >
            <SessionGuard validateSession={validateSession}>
              <Component {...props} />
            </SessionGuard>
          </WithPermissions>
        )
      ) : (
        <Redirect
          to={{
            pathname: routes.authentication.login,
            search: `?next=${location.pathname}`,
          }}
        />
      )
    }
  />
);
