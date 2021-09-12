import { ProfileTypes } from 'src/core/department/department.types';

const initialCreatePatientState = {
  profileType: ProfileTypes.basic,
};

export const createPatientReducer = (state = initialCreatePatientState) => {
  return state;
};
