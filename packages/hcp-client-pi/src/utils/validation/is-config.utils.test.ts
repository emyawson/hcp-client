import { indicatorsConfigurationTemplateService } from './../../services/indicators-configuration-template/indicators-configuration-template';
import { isConfig } from './is-config.utils';

describe('isConfig test suite ', () => {
  it('Should return true if structure matches', () => {
    const goodMockConfig = {
      endpoints: {
        indicatorsConfigurationTemplate: 'test url',
      },
    };
    expect(isConfig(goodMockConfig)).toBeTruthy();
  });

  it('Should return false if structure does not match', () => {
    expect(isConfig(0)).toBeFalsy();
    expect(isConfig('12345')).toBeFalsy();
    expect(isConfig({})).toBeFalsy();
    expect(isConfig({ endpoints: {} })).toBeFalsy();
    expect(
      isConfig({
        endpoints: { someOtherEndpoint1: '1234566', someOtherEndpoint2: false },
      }),
    ).toBeFalsy();
  });
});
