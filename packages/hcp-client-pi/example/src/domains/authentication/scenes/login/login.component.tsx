import queryString from 'qs';
import * as React from 'react';

import { screenSets } from 'src/core/gigya/gigya.constants';
import { gigyaEventHandlers } from 'src/core/gigya/gigya.events';
import {
  isHCPAccessible,
  isHCPActive,
  isSessionValid,
} from 'src/core/gigya/gigya.utils';

import { GigyaScreenSet } from 'src/components/gigya-screenset';

// TODO: validate verification for user PP
// TODO: add protected route
// TODO: combine routes for navigation and bootstrap domains
export class LoginComponent extends React.Component<any, any> {
  public static displayName = 'LoginComponent';
  public componentDidMount() {
    const { isAuthenticated, goTo, routes } = this.props;
    // If you're already authenticated exit flow
    if (isAuthenticated) {
      return goTo(routes.dashboard.dashboard);
    }
    // Register login handler
    gigyaEventHandlers.accounts.onLogin().subscribe(account => {
      this.setState({
        account,
        isError: false,
      });
    });
  }

  public componentWillUpdate(nextProps, nextState) {
    const { isError } = nextState;
    if (!isError) {
      this.validateSession(nextProps, nextState);
    }
  }

  public render() {
    return (
      <GigyaScreenSet
        screenSetID={screenSets.login.id}
        startScreen={screenSets.login.startScreen}
      />
    );
  }

  public onSuccess = ({ location, goTo, onLoginSuccess, routes }) => {
    const qs = queryString.parse(location.search, { ignoreQueryPrefix: true });
    // if error state was previously true reset it
    this.setState({ isError: false });

    // trigger internal session/user validation based on gigya authentication
    onLoginSuccess();

    // route user correctly
    if (qs.next) {
      return goTo(qs.next);
    }
    return goTo(routes.dashboard.dashboard);
  };

  public onError = ({ account }) => {
    this.setState({
      isError: true,
      isHCPAccessible: isHCPAccessible(account),
      isHCPActive: isHCPActive(account),
    });
  };

  public validateSession = (nextProps, nextState) => {
    const { account } = nextState;

    // Verify that your session is valid
    const isValid = isSessionValid(account);

    if (isValid) {
      return this.onSuccess(nextProps);
    }

    // If your session is invalid track state to show errors
    return this.onError({ account });
  };
}
