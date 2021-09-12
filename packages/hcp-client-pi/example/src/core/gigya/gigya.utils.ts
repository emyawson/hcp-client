import { isNil } from 'ramda';

export const isHCPActive = (account): boolean =>
  !!(account && account.data.HCPIsActive);
export const isHCPAccessible = (account): boolean =>
  !!(account && account.data.HCPIsAccessible);

export const isSessionValid = (account): boolean =>
  !isNil(account) &&
  account.UID &&
  account.errorCode !== 0 &&
  account.data &&
  isHCPAccessible(account) &&
  isHCPActive(account);
