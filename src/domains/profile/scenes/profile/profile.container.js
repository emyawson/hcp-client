import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import { withNavigators } from 'src/utils/with-navigators';
import { getToken } from 'src/core';

import { ChangePassword } from '../change-password';
import { EditProfile } from '../edit-profile';

const connector = createStructuredSelector({
  token: getToken,
});

const EditProfileContainer = connect(connector)(EditProfile);

export const Profile = props => (
  <Switch>
    <Route
      path={`${props.match.path}/change-password`}
      render={() => <ChangePassword />}
    />
    <Route
      path={`${props.match.path}/edit`}
      render={() => <EditProfileContainer />}
    />
  </Switch>
);

export const ProfileContainer = compose(
  withNavigators({
    hasLeftNav: true,
    hasTopNav: true,
  }),
)(Profile);
