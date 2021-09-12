import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { validateSession } from 'src/core/authentication/authentication.actions';
import { isTokenExpired } from 'src/core/gigya/gigya.utils';
import { mapDispatchers } from 'src/utils/map-dispatchers';

// Validation triggered against epic
export class SessionGuardComponent extends React.Component<
  any,
  { isVerifying: boolean }
> {
  // tslint:disable-next-line
  static defaultProps: Partial<any> = {
    onSuccess: props => props.children,
    onError: props => props.children,
    onVerifying: () => <div />,
  };

  public state = {
    isVerifying: true,
  };

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const { tokenTimeout, validateSession, token } = this.props;
    validateSession();
    if (!token || isTokenExpired(tokenTimeout)) {
      this.setState({
        isVerifying: true,
      });
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token || nextProps.error) {
      this.setState({
        isVerifying: false,
      });
    }
  }

  public render() {
    const { isVerifying } = this.state;
    const { onSuccess, onError, onVerifying, token, error } = this.props;
    if (isVerifying) {
      return onVerifying(this.props);
    }
    if (!token || error) {
      return onError(this.props);
    }
    return onSuccess(this.props);
  }
}

export const SessionGuard = compose<any, Partial<any>>(
  connect(
    state => ({
      token: state.session.token,
    }),
    mapDispatchers({
      validateSession: () => validateSession.start(),
    }),
  ),
)(SessionGuardComponent);
