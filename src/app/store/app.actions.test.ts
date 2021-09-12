import { createAction, createPayloadAction } from './app.actions';

describe('app.actions tests', () => {
  it('should create an action', () => {
    expect(createAction('TEST_ACTION', { someMetaProp: true })).toEqual({
      type: 'TEST_ACTION',
      meta: { someMetaProp: true },
    });
  });

  it('should create an action with payload', () => {
    expect(
      createPayloadAction('TEST_ACTION_PAYLOAD', 123, { someMetaProp: true }),
    ).toEqual({
      type: 'TEST_ACTION_PAYLOAD',
      payload: 123,
      meta: { someMetaProp: true },
    });
  });
});
