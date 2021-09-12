import React from 'react';
import { isEmpty } from 'ramda';

import {
  fetchPermissions,
  fetchPatientPermissions,
} from 'src/core/permissions';

import { isNotNil, pass } from '../validation-helpers';

export class WithPermissionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerifying: true,
    };

    const { dispatch, currentPermissions, patientId } = props;
    if (isEmpty(currentPermissions)) {
      // TODO: if a 3rd scenario is added optimize
      if (patientId) dispatch(fetchPatientPermissions.start({ patientId }));
      else dispatch(fetchPermissions.start());
    }
  }

  componentDidMount() {
    if (isNotNil(this.props.hasAccess)) {
      this.setState({
        isVerifying: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentPermissions, hasAccess } = nextProps;
    if (!isEmpty(currentPermissions) && isNotNil(hasAccess)) {
      this.setState({
        isVerifying: false,
      });
    }
  }
  render() {
    const { hasAccess, onRender, onAccessDenied, onVerification } = this.props;
    const { isVerifying } = this.state;
    if (isVerifying) return onVerification(this.props);
    return pass(hasAccess) ? onRender(this.props) : onAccessDenied(this.props);
  }
}
WithPermissionsComponent.displayName = 'WithPermissionsComponent';
WithPermissionsComponent.defaultProps = {
  onVerification: () => null,
  onAccessDenied: () => null,
  onRender: props => props.children,
  currentPermissions: [],
};
