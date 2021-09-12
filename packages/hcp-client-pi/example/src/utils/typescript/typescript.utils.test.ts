import { ensureNever } from 'src/utils';

describe('typescript.utils tests', () => {
  type StringOrNumber = string | number;

  it('should only accept "never" type', () => {
    const noKnownTypeErrorMsg = 'No known type';
    const callNever = (arg: StringOrNumber): StringOrNumber => {
      if (typeof arg === 'string') {
        return '';
      } else if (typeof arg === 'number') {
        return 0;
      } else {
        ensureNever(arg);
        throw TypeError(noKnownTypeErrorMsg);
      }
    };
    expect(() => callNever({} as string)).toThrowError(noKnownTypeErrorMsg);
  });
});
