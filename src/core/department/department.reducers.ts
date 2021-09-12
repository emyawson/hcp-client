import { ensureNever } from 'src/utils';
import { setIn } from 'src/utils/ramda';

import {
  DepartmentActionType,
  DepartmentReducerActions,
  DepartmentState,
} from './department.types';

export const INITIAL_DEPARTMENT_STATE: DepartmentState = {
  isLoading: false,
  types: [],
  error: '',
};

export const departmentReducer = (
  state = INITIAL_DEPARTMENT_STATE,
  action: DepartmentReducerActions,
): DepartmentState => {
  switch (action.type) {
    case DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_START:
      return setIn(['isLoading'], true, state);
    case DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        types: action.payload,
      };
    case DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_ERROR:
      return setIn(['error'], action.payload, state);
    default:
      ensureNever(action);
      return state;
  }
};
