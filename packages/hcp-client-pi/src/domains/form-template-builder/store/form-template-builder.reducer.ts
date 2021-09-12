import { lensPath, lensProp, set } from 'ramda';
import { Reducer } from 'redux';

import { ensureNever } from '@roche/patterns-indicators/utils';
import { makeValidators } from '@roche/patterns-indicators/utils/templates/validation.utils';

import {
  FormTemplateBuilderActionType,
  FormTemplateBuilderReducerActions,
  FormTemplateBuilderState,
} from './form-template-builder.types';

export const formTemplateBuilderDefaultState: FormTemplateBuilderState = {
  config: {
    initialState: {},
    details: {},
    validation: {},
  },
  currentState: {},
  validators: {},
};

export const formTemplateBuilderReducer: Reducer<FormTemplateBuilderState> = (
  state = formTemplateBuilderDefaultState,
  action: FormTemplateBuilderReducerActions,
) => {
  switch (action.type) {
    case FormTemplateBuilderActionType.CHANGE_FORM:
      return {
        ...set(
          lensPath([
            'currentState',
            action.payload.path,
            action.payload.fieldName,
          ]),
          action.payload.value,
          state,
        ),
      };
    case FormTemplateBuilderActionType.INIT_FORM_CONFIG:
      const validators = makeValidators(action.payload.validation);
      // TODO: refactor these set calls to be more readable
      return {
        ...set(
          lensProp('validators'),
          validators,
          set(
            lensProp('currentState'),
            action.payload.state,
            set(
              lensProp('config'),
              {
                initialState: action.payload.state,
                details: action.payload.details,
                validation: action.payload.validation,
              },
              state,
            ),
          ),
        ),
      };
    case FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_SUCCESS:
      return {
        ...set(
          lensPath(['config', 'initialState']),
          action.payload,
          set(lensProp('currentState'), action.payload, state),
        ),
      };
    case FormTemplateBuilderActionType.FETCH_INDICATORS_TEMPLATE_CONFIGURATIONS_ERROR:
      return state;
    default:
      ensureNever(action);
      return state;
  }
};
