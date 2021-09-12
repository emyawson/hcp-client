import React from 'react';
import { Route } from 'react-router-dom';

import { LoginBundle } from './bundles';
import {
  ResetPasswordPatient,
  ResetPasswordProfessional,
} from './scenes/reset-password';

export const authenticationLinks = {
  login: '/auth/login',
  resetPasswordPatient: '/reset-password-patient',
  resetPasswordProfessional: '/reset-password-professional',
};

export const AuthenticationRoutes = () => [
  <Route key="login" exact path="/(|auth/login)" component={LoginBundle} />,
  <Route
    key="reset-password-professional"
    exact
    path="/reset-password-professional"
    component={ResetPasswordProfessional}
  />,
  <Route
    key="reset-password-patient"
    exact
    path="/reset-password-patient"
    component={ResetPasswordPatient}
  />,
];
