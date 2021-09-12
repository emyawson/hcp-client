import { Store } from 'redux';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';

import { State } from '@roche/patterns-indicators/core';
import { fetchIndicatorsConfigurationTemplatesStart } from '@roche/patterns-indicators/domains/form-template-builder';

import {
  PiProfileSetupActionTypes,
  SetPiProfileTypeAction,
} from './pi-profile-setup.types';

// TODO: add proper typing for actions
type SetPiProfileEpic = Epic<any, State>;

export const setPiProfileEpic: SetPiProfileEpic = (
  action$: ActionsObservable<SetPiProfileTypeAction>,
  store$: Store<State>,
) =>
  action$
    .ofType(PiProfileSetupActionTypes.SET_PI_PROFILE_TYPE)
    .debounceTime(1000)
    .map(action =>
      fetchIndicatorsConfigurationTemplatesStart({
        profileType: action.payload,
      }),
    );

export const piProfileSetupEpic = combineEpics(setPiProfileEpic);
