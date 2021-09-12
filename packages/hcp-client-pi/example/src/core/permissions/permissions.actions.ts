import { createPayloadAction } from 'src/utils/store/actions.utils';

import {
  FetchPermissionsError,
  FetchPermissionsStart,
  FetchPermissionsSuccess,
  PermissionActionType,
  PermissionsPayload,
} from './permissions.types';

export const fetchPermissionsStart = (
  patientId: string,
): FetchPermissionsStart =>
  createPayloadAction(PermissionActionType.FETCH_PERMISSIONS_START, patientId);

export const fetchPermissionsSuccess = (
  payload: PermissionsPayload,
): FetchPermissionsSuccess =>
  createPayloadAction(PermissionActionType.FETCH_PERMISSIONS_SUCCESS, payload);

export const fetchPermissionsError = (error: any): FetchPermissionsError =>
  createPayloadAction(PermissionActionType.FETCH_PERMISSIONS_ERROR, error);
