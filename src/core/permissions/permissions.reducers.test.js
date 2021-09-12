import {
  permissionsReducer,
  INITIAL_PERMISSIONS_STATE,
} from './permissions.reducers';
import { FETCH_PERMISSIONS } from './permissions.constants';

describe('Permissions reducer tests', () => {
  it('returns the initial state', () => {
    expect(permissionsReducer(undefined, {})).toEqual(
      INITIAL_PERMISSIONS_STATE,
    );
  });
  it('puts the permissions into the store', () => {
    expect(
      permissionsReducer(INITIAL_PERMISSIONS_STATE, {
        type: FETCH_PERMISSIONS.SUCCESS,
        payload: {
          hasDataDownload: true,
          hasDataDownloadAssignment: true,
          hasDeactivatePatientDevices: true,
          hasPatientManagementCreate: true,
        },
      }),
    ).toEqual({
      hasDataDownload: true,
      hasDataDownloadAssignment: true,
      hasDeactivatePatientDevices: true,
      hasPatientManagementCreate: true,
    });
  });
});
