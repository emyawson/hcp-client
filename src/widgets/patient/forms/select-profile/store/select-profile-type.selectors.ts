import { createSelector } from 'reselect';

import { State } from 'src/app/store/app.types';
import { CreatePatientState } from 'src/widgets/patient/create-patient/store/create-patient.types';

export const selectCreatePatientForm = (state: State) => state.createPatient;
export const selectProfileType = createSelector(
  [selectCreatePatientForm],
  (createPatient: CreatePatientState) => createPatient.profileType,
);
