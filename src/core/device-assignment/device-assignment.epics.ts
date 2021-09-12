import { push } from 'react-router-redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { clearPatientSearchResults } from 'src/core/state';
import { getCombinedRoutes } from 'src/navigation/navigation.selectors';
import {
  GetDeviceAssociationServiceType,
  UpdateDeviceAssociationResponse,
  UpdateDeviceAssociationServiceType,
} from 'src/services';

import { getToken } from '../authentication';

import {
  getAlreadyAssignedPatientError,
  getAlreadyAssignedPatientStart,
  getAlreadyAssignedPatientSuccess,
  getDeviceAssociationError,
  getDeviceAssociationSuccess,
  resetDeviceAssignment,
  updateDeviceAssociationError,
  updateDeviceAssociationStart,
  updateDeviceAssociationSuccess,
} from './device-assignment.actions';
import {
  selectDeviceAssignmentSelectedPatientId,
  selectDeviceAssignmentUpdateRequestParams,
} from './device-assignment.selectors';
import {
  AlreadyAssignedPatient,
  AssociationErrorType,
  DeviceAssignmentActions,
  DeviceAssignmentActionType,
  GetAlreadyAssignedPatientStartAction,
  GetDeviceAssociationStartAction,
  UpdateDeviceAssociationStartAction,
} from './device-assignment.types';
import { constructAssignedPatientDashboardUrl } from './device-assignment.utils';

export const getDeviceAssociationEpic: (
  getDeviceAssociationService: GetDeviceAssociationServiceType,
) => Epic<DeviceAssignmentActions, any> = getDeviceAssociationService => (
  action$,
  store,
) =>
  action$
    .ofType(DeviceAssignmentActionType.GET_DEVICE_ASSOCIATION_START)
    .switchMap<{}, DeviceAssignmentActions>(
      ({ payload }: GetDeviceAssociationStartAction) =>
        Observable.fromPromise(
          getDeviceAssociationService(payload, getToken(store.getState())),
        )
          .flatMap(
            response =>
              response.patientId
                ? Observable.of<DeviceAssignmentActions>(
                    getDeviceAssociationSuccess(response),
                    getDeviceAssociationError(
                      AssociationErrorType.DEVICE_ALREADY_ASSIGNED_ERROR_KEY,
                    ),
                    getAlreadyAssignedPatientStart({
                      patientId: response.patientId,
                    }),
                  )
                : Observable.of(getDeviceAssociationSuccess(response)),
          )
          .pipe(
            catchError(err =>
              Observable.of(
                getDeviceAssociationError(
                  AssociationErrorType.INVALID_ASSOCIATION_ID_ERROR_KEY,
                ),
              ),
            ),
          ),
    );

export const updateDeviceAssociationEpic: (
  updateDeviceAssociationService: UpdateDeviceAssociationServiceType,
) => Epic<DeviceAssignmentActions, any> = updateDeviceAssociationService => (
  action$,
  store,
) =>
  action$
    .ofType(DeviceAssignmentActionType.UPDATE_DEVICE_ASSOCIATION_START)
    .switchMap(({ payload }: UpdateDeviceAssociationStartAction) =>
      Observable.fromPromise(
        updateDeviceAssociationService(payload, getToken(store.getState())),
      )
        .map(
          (response: UpdateDeviceAssociationResponse) =>
            !response.success
              ? updateDeviceAssociationError(
                  AssociationErrorType.ASSOCIATION_FAILED,
                )
              : updateDeviceAssociationSuccess(response),
        )
        .pipe(
          catchError(err =>
            Observable.of(
              updateDeviceAssociationError(
                AssociationErrorType.ASSOCIATION_FAILED,
              ),
            ),
          ),
        ),
    );

export const redirectAfterDeviceAssignmentCancelEpic = redirectToLink => (
  action$,
  store$,
) =>
  action$
    .ofType(DeviceAssignmentActionType.CANCEL_ASSIGNMENT)
    .flatMap(() => [clearPatientSearchResults(), push(redirectToLink)]);

export const updateAssociationOnConfirmEpic = () => (action$, store$) =>
  action$
    .ofType(DeviceAssignmentActionType.CONFIRM_ASSIGNMENT)
    .map(() =>
      updateDeviceAssociationStart(
        selectDeviceAssignmentUpdateRequestParams(store$.getState()),
      ),
    );

export const resetFeatureStateAfterCancelEpic = () => action$ =>
  action$
    .ofType(DeviceAssignmentActionType.CANCEL_ASSIGNMENT)
    .mapTo(resetDeviceAssignment());

export const getAlreadyAssignedPatientEpic: (
  getPatientService,
) => Epic<DeviceAssignmentActions, any> = getPatientService => (
  action$,
  store,
) =>
  action$
    .ofType(DeviceAssignmentActionType.GET_ALREADY_ASSIGNED_PATIENT_START)
    .switchMap(({ payload }: GetAlreadyAssignedPatientStartAction) =>
      Observable.fromPromise(
        getPatientService(payload, getToken(store.getState())),
      )
        .map((response: AlreadyAssignedPatient) =>
          getAlreadyAssignedPatientSuccess(response),
        )
        .pipe(
          catchError(err => Observable.of(getAlreadyAssignedPatientError())),
        ),
    );

export const redirectAfterDeviceAssignmentDoneEpic = () => (action$, store$) =>
  action$.ofType(DeviceAssignmentActionType.DONE_ASSIGNMENT).switchMap(() => {
    const state = store$.getState();
    const patientId = selectDeviceAssignmentSelectedPatientId(state);
    const routes = getCombinedRoutes(state);
    const patientDashboardUrl = constructAssignedPatientDashboardUrl(
      patientId,
      routes,
    );
    return [push(patientDashboardUrl), resetDeviceAssignment()];
  });
