import {
  INITIAL_SESSION_FORM_STATE,
  sessionReducer,
  userReducer,
} from './authentication.reducers';
import { signOut, validateSession } from './authentication.actions';

const mockUser = {
  gigyaAccount: { UID: 1 },
  token: '123',
  user: { name: 'test' },
};

describe('Authentication User reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(undefined);
  });
});

describe('Authentication Session reducer', () => {
  it('should return the initial state', () => {
    expect(sessionReducer(undefined, { type: 'OTHER_ACTION' })).toEqual(
      INITIAL_SESSION_FORM_STATE,
    );
  });
  it('should update user on session validation success', () => {
    expect(
      sessionReducer(
        INITIAL_SESSION_FORM_STATE,
        validateSession.success(mockUser),
      ),
    ).toEqual({
      gigyaAccount: { UID: 1 },
      isValid: true,
      token: '123',
      user: { name: 'test' },
      hasLoggedOut: false,
    });
  });

  it('should wipe session on logout success', () => {
    expect(
      sessionReducer(INITIAL_SESSION_FORM_STATE, signOut.success(mockUser)),
    ).toEqual({
      ...INITIAL_SESSION_FORM_STATE,
      token: '',
      hasLoggedOut: true,
      isValid: false,
    });
  });
  it('should wipe session on logout error', () => {
    expect(
      sessionReducer(INITIAL_SESSION_FORM_STATE, signOut.error(mockUser)),
    ).toEqual({
      ...INITIAL_SESSION_FORM_STATE,
      token: '',
      hasLoggedOut: true,
      isValid: false,
    });
  });
  it('should wipe session on validate session error', () => {
    expect(
      sessionReducer(
        INITIAL_SESSION_FORM_STATE,
        validateSession.error(mockUser),
      ),
    ).toEqual({
      token: '',
      isValid: false,
    });
  });
});
