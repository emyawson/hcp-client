import React from 'react';
import { isEmpty } from 'ramda';
import { Route, Redirect } from 'react-router-dom';

import { WithPermissions } from 'src/domains/diagnostics/utils/with-permissions';

// Only verify session when the component mounts
class SessionComponent extends React.Component {
  componentDidMount() {
    this.props.validateSession();
  }
  componentWillReceiveProps() {
    this.props.validateSession();
  }
  render() {
    const { Component } = this.props;
    return <Component {...this.props} />;
  }
}

export const ProtectedRoute = ({
  path,
  exact,
  isAuthenticated,
  component: Component,
  routes,
  hasPermissions = [],
  location,
  hasLoggedOut,
  validateSession,
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      isAuthenticated ? (
        isEmpty(hasPermissions) ? (
          <SessionComponent
            {...props}
            Component={Component}
            validateSession={validateSession}
          />
        ) : (
          <WithPermissions
            hasPermissions={hasPermissions}
            onAccessDenied={() => <Redirect to={routes.general.home} />}
          >
            <SessionComponent
              {...props}
              Component={Component}
              validateSession={validateSession}
            />
          </WithPermissions>
        )
      ) : (
        <Redirect
          to={{
            pathname: routes.authentication.login,
            search: hasLoggedOut ? '' : `?next=${location.pathname}`,
          }}
        />
      )
    }
  />
);
