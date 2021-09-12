import {
  FIRST_TIME,
  LOGIN,
  REDIRECT_TO_LOGIN,
  RESET_PASSWORD,
  SIGN_OUT,
  VALIDATE_SESSION,
} from './authentication.constants';
import {
  firstTime,
  login,
  onAuthenticate,
  onFirstLogin,
  onRedirectToLogin,
  onResetPassword,
  onSignOut,
  signOut,
  validateSession,
} from './authentication.actions';

const REQUEST_START = 'REQUEST_START';

const mockCredentials = {
  email: 'doctor@test.com',
  password: 'Test123',
};

const createDefaultRequestAction = request => ({
  type: request.START,
  payload: {},
  meta: {
    activity: REQUEST_START,
    base: request.BASE,
  },
});

describe('authentication action test suite', () => {
  it('should trigger a Login action', () => {
    const actual = login.start();
    const expected = createDefaultRequestAction(LOGIN);
    expect(actual).toEqual(expected);
  });
  it('should trigger a First Time Login action', () => {
    const actual = firstTime.start();
    const expected = createDefaultRequestAction(FIRST_TIME);
    expect(actual).toEqual(expected);
  });
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

  it('On Authenticate, should trigger a Login action', () => {
    const actual = onAuthenticate(mockCredentials);
    const expected = {
      ...createDefaultRequestAction(LOGIN),
      payload: mockCredentials,
    };
    expect(actual).toEqual(expected);
  });
  it('On First Login, should trigger a First Time Login action', () => {
    const actual = onFirstLogin(mockCredentials);
    const expected = {
      ...createDefaultRequestAction(FIRST_TIME),
      payload: mockCredentials,
    };
    expect(actual).toEqual(expected);
  });
  it('On Sign Out should trigger a Sign Out action', () => {
    const actual = onSignOut();
    const expected = createDefaultRequestAction(SIGN_OUT);
    expect(actual).toEqual(expected);
  });
  it('On Reset Password should trigger a ResetPassword action', () => {
    const actual = onResetPassword();
    const expected = createDefaultRequestAction(RESET_PASSWORD);
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
