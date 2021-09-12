import {
  PermissionActionType,
  PermissionReducerActions,
  PermissionState,
} from './permissions.types';

export const INITIAL_PERMISSIONS_STATE = [];
export const permissionsReducer = (
  state = INITIAL_PERMISSIONS_STATE,
  action: PermissionReducerActions,
): PermissionState => {
  switch (action.type) {
    case PermissionActionType.FETCH_PERMISSIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
