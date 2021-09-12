// @ts-ignore
import 'rxjs';
import { sessionReducer } from 'src/core/authentication/authentication.reducers';
import { fetchPermissionsStart } from 'src/core/permissions/permissions.actions';
import { permissionsReducer } from 'src/core/permissions/permissions.reducers';
import { permissionsService } from 'src/services';
import {
  cleanupMockEndpoints,
  createMockStore,
  mockPermissionsEndpoint,
} from 'src/test';

import { permissionsEpic } from './permissions.epics';

describe('permissions epic test', () => {
  let store;
  beforeAll(() => {
    mockPermissionsEndpoint({ status: 200, body: ['a'] });
    const mockState = {
      permissions: [],
      session: {
        token: '1324',
        isValid: true,
        hasLoggedOut: false,
        isAuthenticated: true,
      },
    };
    store = createMockStore({
      state: mockState,
      reducers: { session: sessionReducer, permissions: permissionsReducer },
      epics: permissionsEpic(permissionsService),
    });
  });

  afterAll(() => {
    cleanupMockEndpoints();
  });

  it('should execute permissions task when the epic is fired', async () => {
    store.dispatch(fetchPermissionsStart('1'));
    await store.update(['permissions']);
    expect(store.getState()).toEqual({
      permissions: ['a'],
      session: {
        hasLoggedOut: false,
        isAuthenticated: true,
        isValid: true,
        token: '1324',
      },
    });
  });
});
