import React from 'react';
import { Route } from 'react-router-dom';

import { ProfileBundle } from './bundles';

export const profileLinks = {
  changePassword: '/profile/change-password',
  changeSecurityQuestion: '/profile/change-security-question',
};

export const ProfileRoutes = ({ path, ...props }) => [
  <Route
    path={path}
    key={path}
    render={props => <ProfileBundle path={path} {...props} />}
  />,
];
