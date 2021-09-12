import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { loginSuccess } from 'src/core/authentication/authentication.actions';
import { getIsAuthenticated } from 'src/core/authentication/authentication.selectors';
import { mapDispatchers } from 'src/utils/map-dispatchers';

import { LoginComponent } from './login.component';

const loginConnector = createStructuredSelector({
  isAuthenticated: getIsAuthenticated,
});

const dispatchers = mapDispatchers({
  goTo: path => push(path),
  onLoginSuccess: loginSuccess,
});

export const LoginContainer = compose(
  connect(
    loginConnector,
    dispatchers,
  ),
  withRouter,
)(LoginComponent);
