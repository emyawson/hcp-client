import { Observable } from 'rxjs'; // eslint-disable-line no-unused-vars

import { createLegacyMockStore } from 'src/test';

import { SIGN_OUT } from './authentication.constants';

import { PATIENT_ACTIONS } from '../patient/patient.constant';
import { STATE_ACTIONS } from '../state/state.constants';
import { validateSession } from '../index';

describe('Authentication epic tests', () => {
  let store = null;

  const mockState = {
    user: {
      gigyaAccount: {
        UID: 1,
        errorCode: 0,
        data: {
          HCPIsActive: true,
          HCPIsAccessible: true,
          FHIR_UserType: 'Practitioner',
        },
      },
      token: 1,
      user: { token: '123456' },
    },
  };

  const authRoutes = {
    authentication: {
      login: '/auth/login',
      forgotPassword: '/auth/reset-password',
    },
  };

  const mockInitialState = {
    session: mockState,
    router: {
      location: '/auth/login',
    },
    domains: {
      routes: authRoutes,
    },
  };

  beforeEach(() => {
    store = createLegacyMockStore({ state: mockInitialState });
  });

  describe('Redirect To Login epic', () => {
    describe('Sign Out and Redirect After Signout epic', () => {
      it('dispatches the correct action when it is successful', async () => {
        store.dispatch({
          type: SIGN_OUT.START,
          payload: {},
        });
        await store.waitForEpics();
        const actionTypes = store.getActionTypes();
        expect(actionTypes).toContain(SIGN_OUT.START);
        expect(actionTypes).toContain(PATIENT_ACTIONS.CLEAR_PATIENT_STATE);
        expect(actionTypes).toContain(STATE_ACTIONS.CLEAR_ORGANIZATION_STATE);
      });
    });

    // Maintains old epic format to avoid issues with the validateSession 1s debounce
    describe('Validate Session epic', () => {
      it('dispatches the correct action when it is successful', async () => {
        store.dispatch(validateSession.start());
        await store.waitForEpics(1000);
        expect(store.getActionTypes()).toEqual([
          'VALIDATE_SESSION_START',
          'VALIDATE_SESSION_SUCCESS',
          'GET_CURRENT_USER_ERROR',
          'PERMISSIONS_START',
        ]);
      });
    });
  });
});
