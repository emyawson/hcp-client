import { transformStepItems } from './step-navigation.util';

describe('transformStepItems()', () => {
  it('returns steptimes with proper isCompleted');
  const MockStepItems = [
    {
      title: 'Step one: The device',
    },
    {
      title: 'Step two: Assign patient to device',
    },
    {
      title: 'Step three: Confirm',
    },
  ];
  const result = transformStepItems(1, MockStepItems);

  expect(result).toEqual([
    {
      isActive: false,
      isDisabled: false,
      isCompleted: true,
      title: 'Step one: The device',
    },
    {
      isActive: true,
      isDisabled: false,
      isCompleted: false,
      title: 'Step two: Assign patient to device',
    },
    {
      isActive: false,
      isDisabled: true,
      isCompleted: false,
      title: 'Step three: Confirm',
    },
  ]);
});
