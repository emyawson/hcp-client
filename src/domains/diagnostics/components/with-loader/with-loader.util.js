import { pipe, propSatisfies, mapObjIndexed, allPass, has } from 'ramda';

import {
  allObj,
  hasValue,
  isNotFalse,
  pass,
} from 'src/domains/diagnostics/utils/validation-helpers';

// -- Validation Helpers --
// Leverage the key value pairs of our validators object
// -- Find the key, ex "graphData" in our component props
// -- Run the value function, which should result in a boolean
// -- Returns a keyed object with results { graphData: true, patientData: false }
const validateObj = form => validators =>
  mapObjIndexed((val, key) => propSatisfies(val, key, form), validators);
// Evaluate the keyed object of results, determine if all are valid
const allValidateObj = allObj(pass);
// Run our validation function on each key and ensure they are all valid
const applyValidators = props =>
  pipe(
    validateObj(props),
    allValidateObj,
  );

// Run this validation on the "isLoading" prop when no validators are set
const defaultValidator = allPass([hasValue, isNotFalse]);

// -- Validation logic --
// If custom validators are set, run these functions against the listed prop keys
// If not, run the defaultValidator against the "isLoading" prop key
export const validateComponentProps = (
  validators,
  props,
  singlePropToValidate = '',
) =>
  hasValue(validators)
    ? applyValidators(props)(validators)
    : hasValue(singlePropToValidate) && has(singlePropToValidate)(props)
      ? defaultValidator(props[singlePropToValidate])
      : true;
