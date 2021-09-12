import { composeValidators, TypeValidator } from './types.utils';

const isString = (x: string): x is string => typeof x === 'string';
const isNumber = (x: number): x is number => typeof x === 'number';

type TestString = 'test1' | 'test2';

const isTestString = (x: string): x is TestString =>
  x === 'test1' || x === 'test2';

const isStringAndTestString = composeValidators(isString, isTestString);

describe('composeValidators test suite ', () => {
  it('Should return true if all functions return true, or false if any return false', () => {
    expect(composeValidators(isString)('test')).toBeTruthy();
    expect(composeValidators(isNumber)(3)).toBeTruthy();
    expect(composeValidators(isString, isNumber)(3)).toBeFalsy();

    expect(isStringAndTestString('test1')).toBeTruthy();
    expect(isStringAndTestString('test2')).toBeTruthy();
    expect(isStringAndTestString('test3')).toBeFalsy();
  });
});

describe('TypeValidator test suite ', () => {
  const mockValidators = {
    numberField: isNumber,
    stringField: isString,
    testStringField: isStringAndTestString,
  };

  const goodFlatObject = {
    numberField: 3,
    stringField: 'test string',
    testStringField: 'test2',
  };

  const badFlatObject1 = {};
  const badFlatObject2 = { numberField: 3 };
  const badFlatObject3 = {
    numberField: 3,
    stringField: 'test string',
    testStringField: null,
  };

  it('Should correctly validate types of object keys based validators object', () => {
    const validateObject = TypeValidator(mockValidators);

    expect(validateObject(goodFlatObject)).toBeTruthy();
    expect(validateObject(badFlatObject1)).toBeFalsy();
    expect(validateObject(badFlatObject2)).toBeFalsy();
    expect(validateObject(badFlatObject3)).toBeFalsy();
  });

  it('Should correctly validate in a nested object', () => {
    const nestedMockValidators = {
      ...mockValidators,
      objectKey: TypeValidator({
        x: isNumber,
        y: isStringAndTestString,
      }),
    };

    const goodNestedObject = {
      ...goodFlatObject,
      objectKey: {
        x: 5,
        y: 'test1',
      },
    };

    const badNestedObject = {
      ...goodNestedObject,
      objectKey: {
        x: 78,
        y: {
          field1: 'test',
        },
      },
    };

    const validateObject = TypeValidator(nestedMockValidators);

    expect(validateObject(goodNestedObject)).toBeTruthy();
    expect(validateObject(badFlatObject1)).toBeFalsy();
    expect(validateObject(badFlatObject2)).toBeFalsy();
    expect(validateObject(badFlatObject3)).toBeFalsy();
    expect(validateObject(badNestedObject)).toBeFalsy();
  });
});
