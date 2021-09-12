import {
  getDynamicConfig,
  getStaticConfig,
  isDevEnv,
  isTestEnv,
  omitStylesFromTestEnv,
} from './config.utils';
jest.unmock('src/utils/config/config.utils');

describe('config.utils tests', () => {
  it('should be dev env if NODE_ENV === "development"', () => {
    expect(isDevEnv()).toBeFalsy();
  });
  it('should be test env if TEST_ENV === "test"', () => {
    expect(isTestEnv()).toBeTruthy();
  });
  it('should have dynamic variables', () => {
    expect(getDynamicConfig()).toEqual({
      REACT_APP_API_ROOT: 'api',
      REACT_APP_API_VERSION: 'v1',
      REACT_APP_GIGYA_TOKEN: '1234tokengigya',
    });
  });
  it('should have static variables', () => {
    expect(getStaticConfig()).toEqual({
      NODE_ENV: 'test',
      NODE_PATH: './',
    });
  });
  it('should avoid printing a string when in the test env', () => {
    expect(omitStylesFromTestEnv('this is a test')).toEqual('');
  });
});
