import { Store } from 'react-redux';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { State } from '@roche/patterns-indicators/core';
import {
  indicatorsConfigurationTemplateService,
  IndicatorsConfigurationTemplateService,
} from '@roche/patterns-indicators/services/indicators-configuration-template';

import {
  fetchIndicatorsConfigurationTemplatesError,
  fetchIndicatorsConfigurationTemplatesSuccess,
} from './form-template-builder.actions';
import { FetchIndicatorsConfigurationTemplateActions } from './form-template-builder.types';
import {
  FetchIndicatorsConfigurationTemplateStart,
  FormTemplateBuilderActionType,
} from './form-template-builder.types';

type FetchIndicatorsConfigurationTemplateEpic = (
  service: IndicatorsConfigurationTemplateService,
) => Epic<FetchIndicatorsConfigurationTemplateActions, State>;

export const getFetchIndicatorsConfigurationTemplateEpic: FetchIndicatorsConfigurationTemplateEpic = (
  service: IndicatorsConfigurationTemplateService,
) => (
  action$: ActionsObservable<FetchIndicatorsConfigurationTemplateStart>,
  store$: Store<State>,
) =>
  action$
    .ofType(
      FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_START,
    )
    .debounceTime(1000)
    .switchMap(action => {
      const {
        endpoints: { indicatorsConfigurationTemplate },
      } = store$.getState()[PATTERNS_AND_INDICATORS_NAMESPACE].config;

      return Observable.fromPromise(
        service(indicatorsConfigurationTemplate)({
          profileType: action.payload.profileType,
        }),
      )
        .map(data => fetchIndicatorsConfigurationTemplatesSuccess(data))
        .pipe(
          catchError(err =>
            Observable.of(fetchIndicatorsConfigurationTemplatesError(err)),
          ),
        );
    });

export const formTemplateBuilderEpic: Epic<
  FetchIndicatorsConfigurationTemplateActions,
  State
> = combineEpics(
  getFetchIndicatorsConfigurationTemplateEpic(
    indicatorsConfigurationTemplateService,
  ),
);
