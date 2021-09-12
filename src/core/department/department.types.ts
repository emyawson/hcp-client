import { PayloadAction } from 'src/app/store/app.types';

import {
  ProfileType,
  ProfileTypesParams,
} from 'src/services/department/profile-types';

export enum ProfileTypes {
  basic = '41',
  pickup = '104',
  homeDelivery = '105',
}

export enum DepartmentActionType {
  GET_DEPARTMENT_PROFILE_TYPES_START = 'GET_DEPARTMENT_PROFILE_TYPES_START',
  GET_DEPARTMENT_PROFILE_TYPES_ERROR = 'GET_DEPARTMENT_PROFILE_TYPES_ERROR',
  GET_DEPARTMENT_PROFILE_TYPES_SUCCESS = 'GET_DEPARTMENT_PROFILE_TYPES_SUCCESS',
}

export type DepartmentState = {
  isLoading: boolean;
  types: ProfileType[];
  error: any;
};

export type DepartmenProfileTypesResponse = ProfileType[];

export type GetDepartmenProfileTypesStartAction = PayloadAction<
  DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_START,
  ProfileTypesParams
>;
export type GetDepartmenProfileTypesSuccessAction = PayloadAction<
  DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_SUCCESS,
  DepartmenProfileTypesResponse
>;
export type GetDepartmenProfileTypesErrorAction = PayloadAction<
  DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_ERROR,
  any
>;

export type DepartmentActions =
  | GetDepartmenProfileTypesStartAction
  | GetDepartmenProfileTypesSuccessAction
  | GetDepartmenProfileTypesErrorAction;

export type DepartmentReducerActions = DepartmentActions;
