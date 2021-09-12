import { createPayloadAction } from 'src/app/store/app.actions';

import {
  DepartmenProfileTypesResponse,
  DepartmentActionType,
  GetDepartmenProfileTypesErrorAction,
  GetDepartmenProfileTypesStartAction,
  GetDepartmenProfileTypesSuccessAction,
} from './department.types';

export const getDepartmentProfileTypesStart = ({
  departmentId,
}): GetDepartmenProfileTypesStartAction =>
  createPayloadAction(DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_START, {
    departmentId,
  });

export const getDepartmentProfileTypesSuccess = (
  data: DepartmenProfileTypesResponse,
): GetDepartmenProfileTypesSuccessAction =>
  createPayloadAction(
    DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_SUCCESS,
    data,
  );

export const getDepartmentProfileTypesError = (
  error: any,
): GetDepartmenProfileTypesErrorAction =>
  createPayloadAction(
    DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_ERROR,
    error,
  );
