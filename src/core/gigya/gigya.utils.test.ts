import {
  isHCPAccessible,
  isHCPActive,
  isSessionValid,
} from 'src/core/gigya/gigya.utils';

describe('gigya utils test suite', () => {
  let account = {};
  beforeAll(() => {
    account = {
      UID: 1,
      errorCode: 0,
      data: {
        HCPIsActive: true,
        HCPIsAccessible: true,
        FHIR_UserType: 'Practitioner',
      },
    };
  });
  it('should check if an account has an active hcp', () => {
    expect(isHCPActive(account)).toEqual(true);
    expect(isHCPActive(null)).toEqual(false);
  });
  it('should check if an account has an accessible hcp', () => {
    expect(isHCPAccessible(account)).toEqual(true);
    expect(isHCPAccessible(null)).toEqual(false);
  });
  it('should check if an account has all valid criteria for a valid session', () => {
    expect(isSessionValid(account)).toEqual(true);
    expect(isSessionValid(null)).toEqual(false);
  });
});
