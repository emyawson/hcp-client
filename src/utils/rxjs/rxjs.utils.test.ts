import { actionTypeFilter } from './rxjs.utils';

describe('rxjs.utils tests', () => {
  describe('actionTypeFilter', () => {
    const testActionType = 'TEST_ACTION';
    const testAction = { type: testActionType };
    const emptyAction = { type: '' };

    it('should return true if filtering by the right action type', () => {
      const testFilter = actionTypeFilter(testActionType);
      expect(testFilter(testAction)).toBeTruthy();
    });

    it('should return false if filtering by the right action type', () => {
      const testFilter = actionTypeFilter(testActionType);
      expect(testFilter(emptyAction)).toBeFalsy();
    });
  });
});
