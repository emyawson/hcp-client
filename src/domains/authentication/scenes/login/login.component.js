import React from 'react';
import queryString from 'qs';
import {
  screenSets,
  gigyaEventHandlers,
  isHCPAccessible,
  isHCPActive,
  isPractitioner,
} from 'src/core/gigya';

import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils';
import { GigyaScreenSet } from 'src/components/gigya-screenset';
import { NotificationBanner } from 'src/components/notification-banner';
import { colors } from 'src/core/styles/colors';

import {
  AuthenticationPage,
  DescriptionColumn,
  DescriptionContainer,
  DescriptionDiv,
  DescriptionDivider,
  SubdescriptionDiv,
  ErrorBlock,
  LoginColumn,
} from '../../components';
import { isSessionValid } from '../../../../core/gigya';

export class LoginComponent extends React.Component {
  state = {
    account: null,
    isError: false,
    isHCPAccessible: false,
    isHCPActive: false,
  };

  componentDidMount() {
    // Reset the state when redirected
    this.setState({
      isError: false,
      isAccessible: false,
      isActive: false,
      isProfessional: false,
    });
    const { isAuthenticated, goTo, routes } = this.props;
    // If you're already authenticated exit flow
    if (isAuthenticated) {
      return goTo(routes.general.home);
    }
    // Register login handler
    gigyaEventHandlers.accounts.onLogin().subscribe(account => {
      this.setState({
        account,
        isError: false,
      });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { isError } = nextState;
    if (!isError) {
      this.validateSession(nextProps, nextState);
    }
  }

  render() {
    const {
      isError,
      isHCPAccessible,
      isHCPActive,
      isProfessional,
    } = this.state;
    return (
      <AuthenticationPage>
        <LoginColumn>
          <ErrorBlock>
            <RenderIf
              validate={
                isError && (!isHCPAccessible || !isHCPActive || !isProfessional)
              }
            >
              <NotificationBanner
                color={colors.red}
                text={translate('login.errors.hcpNotActive')}
                showIcon
              />
            </RenderIf>
          </ErrorBlock>
          <GigyaScreenSet
            screenSetID={screenSets.login.id}
            startScreen={screenSets.login.startScreen}
          />
        </LoginColumn>
        <DescriptionColumn>
          <DescriptionContainer>
            <DescriptionDiv>{translate('login.description')}</DescriptionDiv>
            <DescriptionDivider />
            <SubdescriptionDiv>
              {translate('login.subdescription')}{' '}
            </SubdescriptionDiv>
          </DescriptionContainer>
        </DescriptionColumn>
      </AuthenticationPage>
    );
  }

  onSuccess = ({ location, onLoginSuccess, goTo, routes }) => {
    const qs = queryString.parse(location.search, { ignoreQueryPrefix: true });

    // trigger internal session/user validation based on gigya authentication
    onLoginSuccess();

    // route user correctly
    if (qs.next) {
      return goTo(qs.next);
    }
    return goTo(routes.dashboard.dashboard);
  };

  onError = ({ account }) => {
    this.setState({
      isError: true,
      isHCPAccessible: isHCPAccessible(account),
      isHCPActive: isHCPActive(account),
      isProfessional: isPractitioner(account),
    });
  };

  validateSession = (nextProps, nextState) => {
    const { account } = nextState;
    // do not verify if no account was returned
    if (!account) {
      return null;
    }

    // Verify that your session is valid
    const isValid = isSessionValid(account);

    if (isValid) {
      return this.onSuccess(nextProps);
    }

    // If your session is invalid track state to show errors
    return this.onError({ account });
  };
}
