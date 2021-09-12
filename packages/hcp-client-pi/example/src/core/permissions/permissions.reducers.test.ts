import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

import {
  INITIAL_PERMISSIONS_STATE,
  permissionsReducer,
} from './permissions.reducers';
import { PermissionActionType } from './permissions.types';

describe('Permissions reducer tests', () => {
  it('puts the permissions into the store', () => {
    expect(
      permissionsReducer(INITIAL_PERMISSIONS_STATE, {
        type: PermissionActionType.FETCH_PERMISSIONS_SUCCESS,
        payload: [PERMISSIONS.GLUCOSE_STATISTICS],
      }),
    ).toEqual(['ROLE_EXPORT_GLUCOSE_STATISTICS']);
  });
});
