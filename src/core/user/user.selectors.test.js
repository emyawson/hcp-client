import {
  selectEmail,
  selectEC6UserState,
  selectSessionState,
} from './user.selectors';

describe('Patient selector test suite', () => {
  const state = {
    session: {
      user: { id: 1 },
      gigyaUser: {
        profile: {
          email: 'test@test.com',
        },
      },
    },
  };
  it('should select the session state', () => {
    expect(selectSessionState(state)).toEqual(state.session);
  });
  it('should select the user state', () => {
    expect(selectEC6UserState(state)).toEqual({ id: 1 });
  });
  it('should select the user email', () => {
    expect(selectEmail(state)).toEqual('test@test.com');
  });
});
