import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getToken } from 'src/core/authentication';
import { CreatePatientServiceImplType } from 'src/services';

import {
  createPatientError,
  createPatientSuccess,
} from './create-patient.actions';
import {
  CreatePatientActions,
  CreatePatientActionType,
  CreatePatientStartAction,
} from './create-patient.types';

export const createPatientEpic: (
  createPatientService: CreatePatientServiceImplType,
) => Epic<CreatePatientActions, any> = createPatientService => (
  action$,
  store,
) =>
  action$
    .ofType(CreatePatientActionType.CREATE_PATIENT_START)
    .switchMap(({ payload }: CreatePatientStartAction) =>
      Observable.fromPromise(
        createPatientService(payload, getToken(store.getState())),
      )
        .map(data => createPatientSuccess(data))
        .pipe(catchError(err => Observable.of(createPatientError(err)))),
    );
