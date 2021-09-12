import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { mapDispatchers } from 'src/utils';
import { onSignOut } from 'src/core/authentication/authentication.actions';
import { selectFullName } from 'src/core/user/user.selectors';

import { TopNavigation } from './top-navigation.component';

export const topNavigationConnector = createStructuredSelector({
  fullName: selectFullName,
});

const dispatchers = mapDispatchers({
  onSignOut,
});

export const TopNavigationContainer = compose(
  connect(
    topNavigationConnector,
    dispatchers,
  ),
)(TopNavigation);
