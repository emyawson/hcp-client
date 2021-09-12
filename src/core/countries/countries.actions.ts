import { createAction, createPayloadAction } from 'src/app/store/app.actions';

import {
  CountriesActionType,
  CountriesPayload,
  FetchCountriesError,
  FetchCountriesStart,
  FetchCountriesSuccess,
} from './countries.types';

export const fetchCountriesStart = (): FetchCountriesStart =>
  createAction(CountriesActionType.FETCH_COUNTRIES_START);

export const fetchCountriesSuccess = (
  payload: CountriesPayload,
): FetchCountriesSuccess =>
  createPayloadAction(CountriesActionType.FETCH_COUNTRIES_SUCCESS, payload);

export const fetchCountriesError = (error: any): FetchCountriesError =>
  createPayloadAction(CountriesActionType.FETCH_COUNTRIES_ERROR, error);
