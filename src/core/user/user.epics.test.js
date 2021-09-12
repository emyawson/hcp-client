import { Observable } from 'rxjs'; // eslint-disable-line no-unused-vars

import { createLegacyMockStore } from 'src/test';
import { validateSession } from 'src/core';
import { mockCurrentUser, cleanupMockEndpoints } from 'src/test/mock-endpoints';

describe('User epic tests', () => {
  let store = null;
  beforeAll(() => {
    mockCurrentUser({ status: 200, body: {} });
    const mockState = {
      session: {
        user: {
          languageIsoCode: 'en',
        },
        token: 1,
      },
    };
    store = createLegacyMockStore({ state: mockState });
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should output a locale change', async () => {
    store.dispatch(validateSession.success({}));
    await store.waitForEpics();
    expect(store.getActionTypes()).toEqual([
      'VALIDATE_SESSION_SUCCESS',
      'GET_CURRENT_USER_SUCCESS',
      'CHANGE_LOCALE',
    ]);
  });
});
