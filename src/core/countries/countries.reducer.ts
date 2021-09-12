import { ensureNever } from 'src/utils';
import { setIn } from 'src/utils/ramda';

import {
  CountriesActionType,
  CountriesReducerActions,
  CountriesState,
} from './countries.types';

export const initialUserState: CountriesState = {
  isLoading: true,
  data: [],
  error: '',
};

export const countriesReducer = (
  state = initialUserState,
  action: CountriesReducerActions,
): CountriesState => {
  switch (action.type) {
    case CountriesActionType.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case CountriesActionType.FETCH_COUNTRIES_ERROR:
      return setIn(['error'], action.payload, state);
    default:
      ensureNever(action);
      return state;
  }
};
