import { isEmpty } from 'ramda';
import * as React from 'react';

import { fetchPermissionsStart } from 'src/core/permissions/permissions.actions';
import { isNotNil, pass } from 'src/utils';

import {
  WithPermissionComponentProps,
  WithPermissionComponentState,
} from './with-permissions.types';

export class WithPermissionsComponent extends React.Component<
  WithPermissionComponentProps,
  WithPermissionComponentState
> {
  public static displayName = 'WithPermissionsComponent';
  public static defaultProps = {
    onVerification: () => null,
    onAccessDenied: () => null,
    onRender: props => props.children,
    currentPermissions: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      isVerifying: true,
    };

    const { dispatch, currentPermissions, patientId } = props;
    if (isEmpty(currentPermissions)) {
      // TODO: if a 3rd scenario is added optimize
      if (patientId) {
        dispatch(fetchPermissionsStart(patientId));
      }
    }
  }

  public componentDidMount() {
    if (isNotNil(this.props.hasAccess)) {
      this.setState({
        isVerifying: false,
      });
    }
  }

  public componentWillReceiveProps(nextProps) {
    const { currentPermissions, hasAccess } = nextProps;
    if (!isEmpty(currentPermissions) && isNotNil(hasAccess)) {
      this.setState({
        isVerifying: false,
      });
    }
  }
  public render() {
    const { hasAccess, onRender, onAccessDenied, onVerification } = this.props;
    const { isVerifying } = this.state;
    if (isVerifying) {
      return onVerification(this.props);
    }
    return pass(hasAccess) ? onRender(this.props) : onAccessDenied(this.props);
  }
}
