import { propOr } from 'ramda';

// Hardcoded values representing those passed from EC6
// TODO: Revisit our translation strategy
const diabetesTypeMap = {
  DIABETES_TYPE1: '1',
  DIABETES_TYPE2: '2',
  DIABETES_GESTATIONAL: 'Gestational',
};

export const serverToClientDiabetesType = serverDiabetesType =>
  propOr(null, serverDiabetesType)(diabetesTypeMap);
