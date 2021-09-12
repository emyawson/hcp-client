import { Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { getToken } from 'src/core/authentication/authentication.selectors';
import { PermissionsService } from 'src/services/permissions/permissions.types';
import { State } from 'src/store/example.types';

import {
  fetchPermissionsError,
  fetchPermissionsSuccess,
} from './permissions.actions';
import { PermissionActions, PermissionActionType } from './permissions.types';

export const permissionsEpic = (
  permissionsService: PermissionsService,
): Epic<PermissionActions, Partial<State>> => (action$, store$) =>
  action$
    .ofType(PermissionActionType.FETCH_PERMISSIONS_START)
    .debounceTime(2000)
    .flatMap(action =>
      Observable.fromPromise(
        permissionsService({
          patientId: action.payload,
          token: getToken(store$.getState()),
        })
          .then(data => fetchPermissionsSuccess(data))
          .catch(error => fetchPermissionsError(error)),
      ),
    );
