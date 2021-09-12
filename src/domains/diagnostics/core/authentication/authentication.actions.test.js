import {
  REDIRECT_TO_LOGIN,
  SIGN_OUT,
  VALIDATE_SESSION,
} from './authentication.constants';
import {
  onRedirectToLogin,
  signOut,
  validateSession,
} from './authentication.actions';

const REQUEST_START = 'REQUEST_START';

const createDefaultRequestAction = request => ({
  type: request.START,
  payload: {},
  meta: {
    activity: REQUEST_START,
    base: request.BASE,
  },
});

describe('authentication action test suite', () => {
  it('should trigger a Validate Session action', () => {
    const actual = validateSession.start();
    const expected = createDefaultRequestAction(VALIDATE_SESSION);
    expect(actual).toEqual(expected);
  });
  it('should trigger a Sign Out action', () => {
    const actual = signOut.start();
    const expected = createDefaultRequestAction(SIGN_OUT);
    expect(actual).toEqual(expected);
  });
  it('should trigger a Redirect To Login action', () => {
    const actual = onRedirectToLogin();
    const expected = {
      type: REDIRECT_TO_LOGIN,
    };
    expect(actual).toEqual(expected);
  });
});
