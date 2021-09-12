import { getProcessEnv, getWindowEnv } from 'src/utils';

it('should have dynamic variables', () => {
  expect(getWindowEnv(global)).toEqual({
    REACT_APP_API_ROOT: 'api',
    REACT_APP_API_VERSION: 'v1',
    REACT_APP_GIGYA_TOKEN: '1234tokengigya',
  });
});
it('should have static variables', () => {
  expect(getProcessEnv()).toEqual({ NODE_ENV: 'test', NODE_PATH: './' });
});
