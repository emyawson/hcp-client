import { Store as ReduxStore } from 'redux';
import { Persistor as RPPersistor } from 'redux-persist/lib/types';

import { CountriesState } from 'src/core/countries/countries.types';
import { DepartmentState } from 'src/core/department/department.types';
import { CreatePatientState } from 'src/widgets/patient/create-patient/store/create-patient.types';

export type Persistor = {
  persist: () => void;
} & RPPersistor;

export type Store<S> = ReduxStore<S> & {
  persistor: Persistor;
};

export type Action<Type, Meta = void> = {
  readonly type: Type;
  readonly meta?: Meta;
};

export type PayloadAction<Type, Payload, Meta = void> = Action<Type, Meta> & {
  readonly payload: Payload;
};

export type State = {
  readonly createPatient: CreatePatientState;
  readonly department: DepartmentState;
  readonly countries: CountriesState;
};

declare global {
  type FixMe = any;
}
