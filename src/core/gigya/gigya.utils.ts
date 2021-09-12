import { isNil } from 'ramda';

export const isPatient = (account): boolean =>
  account && account.data.FHIR_UserType === 'Patient';
export const isPractitioner = (account): boolean =>
  account && account.data.FHIR_UserType === 'Practitioner';
export const isHCPActive = (account): boolean =>
  !!(account && account.data.HCPIsActive);
export const isHCPAccessible = (account): boolean =>
  !!(account && account.data.HCPIsAccessible);
export const isErrorCodeValid = (account): boolean =>
  account && account.errorCode ? account.errorCode === 0 : true;

export const isTokenExpired = (timeout: number): boolean =>
  timeout < Date.now();

export const isSessionValid = (account): boolean =>
  !isNil(account) &&
  account.UID &&
  isErrorCodeValid(account) &&
  account.data &&
  isPractitioner(account) &&
  isHCPAccessible(account) &&
  isHCPActive(account);
