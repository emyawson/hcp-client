import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileTypesServiceImplType } from 'src/services/department/profile-types/profile-types.types';

import { getToken } from '../authentication';

import {
  getDepartmentProfileTypesError,
  getDepartmentProfileTypesSuccess,
} from './department.actions';
import {
  DepartmentActions,
  DepartmentActionType,
  GetDepartmenProfileTypesStartAction,
} from './department.types';

export const departmentProfileTypesEpic: (
  getDepartmentProfileTypes: ProfileTypesServiceImplType,
) => Epic<DepartmentActions, any> = getDeviceAssociationService => (
  action$,
  store,
) =>
  action$
    .ofType(DepartmentActionType.GET_DEPARTMENT_PROFILE_TYPES_START)
    .switchMap(({ payload }: GetDepartmenProfileTypesStartAction) =>
      Observable.fromPromise(
        getDeviceAssociationService(payload, getToken(store.getState())),
      )
        .map(response => getDepartmentProfileTypesSuccess(response))
        .pipe(
          catchError(err => Observable.of(getDepartmentProfileTypesError(err))),
        ),
    );
