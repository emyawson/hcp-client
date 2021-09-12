import { Diff, ValueOf } from 'src/utils';
import { PayloadAction } from 'src/utils/store/store.types';

// Permission types
export type Permissions = {
  readonly PATIENT: 'ROLE_PATIENT';
  readonly DATA_DOWNLOAD: 'ROLE_DATA_DOWNLOAD';
  readonly GLUCOSE_STATISTICS: 'ROLE_EXPORT_GLUCOSE_STATISTICS';
  readonly STRIP_MNG_PATIENT: 'ROLE_STRIP_MNG_PATIENT';
  readonly HOME_DELIVERY_PATIENT: 'ROLE_DELIVERY_MGMT_PATIENT';
};

export type Permission = ValueOf<Permissions>;

export type TransformedPermissions = {
  readonly hasPatient: 'ROLE_PATIENT';
  readonly hasDataDownload: 'ROLE_DATA_DOWNLOAD';
  readonly hasGlucoseStatistics: 'ROLE_EXPORT_GLUCOSE_STATISTICS';
  readonly hasStripMngPatient: 'ROLE_STRIP_MNG_PATIENT';
  readonly hasDeliveryMgmtPatient: 'ROLE_DELIVERY_MGMT_PATIENT';
};

// Permission call types
export enum PermissionActionType {
  FETCH_PERMISSIONS_START = 'FETCH_PERMISSIONS_START',
  FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS',
  FETCH_PERMISSIONS_ERROR = 'FETCH_PERMISSIONS_ERROR',
}

// Utils types
export type GetPermissions = {
  readonly current: Partial<Permission[]>;
  readonly permissions: Permission[];
};

export type HasPermissions = {
  readonly toValidate: Permission[];
  readonly current: Partial<Permission[]>;
};

// Permissions call
export type PermissionsStartPayload = string;

export type PermissionsPayload = Partial<Permission[]>;

export type FetchPermissionsStart = PayloadAction<
  PermissionActionType.FETCH_PERMISSIONS_START,
  PermissionsStartPayload
>;
export type FetchPermissionsSuccess = PayloadAction<
  PermissionActionType.FETCH_PERMISSIONS_SUCCESS,
  PermissionsPayload
>;
// TODO: Error state payload
export type FetchPermissionsError = PayloadAction<
  PermissionActionType.FETCH_PERMISSIONS_ERROR,
  any
>;

// State and action combinations
export type PermissionState = PermissionsPayload;

export type PermissionEpicActions = FetchPermissionsStart;

export type PermissionActions =
  | FetchPermissionsStart
  | FetchPermissionsSuccess
  | FetchPermissionsError;

export type PermissionReducerActions = Diff<
  PermissionActions,
  PermissionEpicActions
>;
