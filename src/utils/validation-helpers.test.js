import { hasMatchingListItem, isNotEqual } from './validation-helpers';

describe('Validation Helpers test suite', () => {
  it('should evaluate that two values do not equal one another', () => {
    const obj1 = {
      name: 'Test',
    };
    const obj2 = {
      name: 'Another Test',
    };
    const obj3 = {
      name: 'Test',
    };
    expect(isNotEqual(obj1)(obj2)).toEqual(true);
    expect(isNotEqual(obj1)(obj3)).toEqual(false);
  });
  it('should determine if a list contains a value matching the provided function', () => {
    const fn = obj => obj.id === 1;
    const list1 = [{ id: 1, name: 'Patient' }];
    const list2 = [{ id: 'abc-123', name: 'Patient' }];
    expect(hasMatchingListItem(fn)(list1)).toBeTruthy();
    expect(hasMatchingListItem(fn)(list2)).toBeFalsy();
  });
});
