import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import { getCombinedRoutes } from 'src/navigation/navigation.selectors';
import { login, getIsValidSession } from 'src/core/authentication';
import { mapDispatchers } from 'src/utils';
import { withNavigators } from 'src/utils/with-navigators';

import { LoginComponent } from './login.component';

const loginConnector = createStructuredSelector({
  isAuthenticated: getIsValidSession,
  routes: getCombinedRoutes,
});

const dispatchers = mapDispatchers({
  goTo: path => push(path),
  onLoginSuccess: () => login.success(),
});

export const LoginContainer = compose(
  connect(
    loginConnector,
    dispatchers,
  ),
  withRouter,
  withNavigators({
    hasLeftNav: false,
    hasTopNav: false,
  }),
)(LoginComponent);
