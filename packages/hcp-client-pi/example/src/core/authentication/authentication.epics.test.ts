import { validateSessionStart } from 'src/core/authentication/authentication.actions';
import { cleanupMockEndpoints, createMockStore } from 'src/test';

import { authenticationEpic } from './authentication.epics';
import { sessionReducer } from './authentication.reducers';

describe('authentication epic test', () => {
  let store;
  beforeAll(() => {
    const mockState = {
      session: {
        token: '',
        isValid: false,
        hasLoggedOut: false,
        isAuthenticated: true,
      },
    };
    store = createMockStore({
      state: mockState,
      reducers: { session: sessionReducer },
      epics: authenticationEpic,
    });
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should execute authentication task when the epic is fired', async () => {
    store.dispatch(validateSessionStart());
    await store.update(['session']);
    expect(store.getState()).toEqual({
      session: {
        hasLoggedOut: false,
        isAuthenticated: true,
        isValid: true,
        token: 1,
      },
    });
  });
});
