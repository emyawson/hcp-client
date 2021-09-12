import { Action, PayloadAction } from 'src/app/store/app.types';
import { Diff } from 'src/utils';

export type Country = {
  id: string;
  name: string;
  isoCode: string;
  labelProperty: string;
  labelText: string;
  language: {
    id: string;
    languageId: string;
    labelProperty: string;
    labelText: string;
    isoCode: string;
    key: string;
    value: string;
  };
};

export enum CountriesActionType {
  FETCH_COUNTRIES_START = 'FETCH_COUNTRIES_START',
  FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS',
  FETCH_COUNTRIES_ERROR = 'FETCH_COUNTRIES_ERROR',
}

export type CountriesPayload = Country[];

export type FetchCountriesStart = Action<
  CountriesActionType.FETCH_COUNTRIES_START
>;
export type FetchCountriesSuccess = PayloadAction<
  CountriesActionType.FETCH_COUNTRIES_SUCCESS,
  CountriesPayload
>;
export type FetchCountriesError = PayloadAction<
  CountriesActionType.FETCH_COUNTRIES_ERROR,
  any
>;

export type CountriesState = {
  isLoading?: boolean;
  data: Country[];
  error?: any;
};

export type CountriesEpicActions = FetchCountriesStart;

export type CountriesActions =
  | FetchCountriesStart
  | FetchCountriesSuccess
  | FetchCountriesError;

export type CountriesReducerActions = Diff<
  CountriesActions,
  CountriesEpicActions
>;
