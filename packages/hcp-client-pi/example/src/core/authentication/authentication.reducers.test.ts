import { signoutError } from './authentication.actions';
import { sessionReducer } from './authentication.reducers';

describe('Authentication Session reducer', () => {
  it('should return the initial state', () => {
    expect(
      sessionReducer(
        {
          token: '',
          isValid: false,
          hasLoggedOut: false,
          isAuthenticated: false,
        },
        signoutError(),
      ),
    ).toEqual({
      hasLoggedOut: true,
      isValid: false,
      token: '',
    });
  });
});
