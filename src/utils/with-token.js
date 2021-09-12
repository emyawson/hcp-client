import { connect } from 'react-redux';

import {
  getToken,
  getIsValidSession,
} from 'src/core/authentication/authentication.selectors';

export const withToken = Component =>
  connect(state => ({
    isValid: getIsValidSession(state),
    token: getToken(state),
  }))(Component);
