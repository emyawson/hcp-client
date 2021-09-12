import { AccountInfo } from 'src/core/gigya/gigya.types';

import {
  selectAccountInfo,
  selectBirthDay,
  selectBirthMonth,
  selectBirthYear,
  selectEmail,
  selectFirstName,
  selectFullName,
  selectHCPIsAccessible,
  selectHCPIsActive,
  selectLastName,
} from './user.selectors';
import { UserState } from './user.types';

describe('Patient selector test suite', () => {
  const accountInfo: AccountInfo = {
    data: {
      HCPIsActive: true,
      HCPIsAccessible: true,
    },
    profile: {
      firstName: 'EL',
      lastName: 'Binni',
      email: 'test@test.com',
      birthDay: '11',
      birthMonth: '11',
      birthYear: '1992',
    },
  };

  const user: UserState = {
    accountInfo,
    error: '',
  };

  const state: any = {
    user,
  };

  it('should select the session state', () => {
    expect(selectAccountInfo(state)).toEqual(state.user.accountInfo);
  });

  it('should select the user email', () => {
    expect(selectEmail(state)).toEqual(accountInfo.profile.email);
  });

  describe('when selecting the user name', () => {
    const { firstName, lastName } = accountInfo.profile;

    it('should select the users first name', () => {
      expect(selectFirstName(state)).toEqual(firstName);
    });

    it('should select the users last name', () => {
      expect(selectLastName(state)).toEqual(lastName);
    });

    it('should concat the users full name', () => {
      expect(selectFullName(state)).toEqual(`${firstName} ${lastName}`);
    });
  });

  it('should the birth day', () => {
    expect(selectBirthDay(state)).toEqual(accountInfo.profile.birthDay);
  });

  it('should the birth month', () => {
    expect(selectBirthMonth(state)).toEqual(accountInfo.profile.birthMonth);
  });

  it('should the birth year', () => {
    expect(selectBirthYear(state)).toEqual(accountInfo.profile.birthYear);
  });

  it('should check if hcp is accessible', () => {
    expect(selectHCPIsAccessible(state)).toEqual(
      accountInfo.data.HCPIsAccessible,
    );
  });

  it('should check if hcp is active', () => {
    expect(selectHCPIsActive(state)).toEqual(accountInfo.data.HCPIsActive);
  });
});
