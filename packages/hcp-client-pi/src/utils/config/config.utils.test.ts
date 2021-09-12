import {
  getDynamicConfig,
  getStaticConfig,
  isDevEnv,
} from '@roche/patterns-indicators/utils';

jest.mock('../environment', () => ({
  getProcessEnv: () => ({ NODE_ENV: 'development' }),
}));

describe('config.utils tests', () => {
  describe('determining current environment', () => {
    it('should be dev env if NODE_ENV === "development"', () => {
      expect(isDevEnv()).toBeTruthy();
    });
  });
});

describe('config.utils functions', () => {
  it('should have functions defined', () => {
    expect(getDynamicConfig).toBeDefined();
    expect(getStaticConfig).toBeDefined();
  });
});
