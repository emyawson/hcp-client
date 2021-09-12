type TypeCheck<T> = (x: any) => x is T;

type KeyedValidators<T> = { [K in keyof T]: TypeCheck<T[K]> };

type KeyedValues<T> = { [K in keyof T]: any };

export const TypeValidator = <T>(
  validators: KeyedValidators<T>,
): TypeCheck<T> => (values: KeyedValues<T>): values is T => {
  for (const key in validators) {
    if (validators.hasOwnProperty(key)) {
      const value = values[key];
      const validate = validators[key];
      if (value == null || !validate(value)) {
        return false;
      }
    }
  }
  return true;
};

export const composeValidators = <T>(
  ...validators: Array<((x: any) => any)>
): TypeCheck<T> => (x: any): x is T => {
  for (const validate of validators) {
    if (!validate(x)) {
      return false;
    }
  }
  return true;
};
