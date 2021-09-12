import { onChangeLocale, onChangeLocaleError } from './user.actions';

describe('User actions', () => {
  it('should return a successful locale change', () => {
    expect(onChangeLocale('en')).toEqual({
      payload: 'en',
      type: 'CHANGE_LOCALE',
    });
  });

  it('should return a unsuccessful locale change', () => {
    expect(onChangeLocaleError()).toEqual({
      payload: false,
      type: 'CHANGE_LOCALE_ERROR',
    });
  });
});
