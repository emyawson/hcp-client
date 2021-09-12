import React from 'react';

import { Bundle } from 'src/navigation/bundle';

export const LoginBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        LoginContainer,
      } = await import(/* webpackChunkName: "login" */ './scenes/login');
      return LoginContainer;
    }}
    bundleDidLoad={LoginContainer => <LoginContainer {...props} />}
  />
);

export const ResetPasswordBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        ResetPassword,
      } = await import(/* webpackChunkName: "reset-password" */ './scenes/reset-password');
      return ResetPassword;
    }}
    bundleDidLoad={ResetPassword => <ResetPassword {...props} />}
  />
);
