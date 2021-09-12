import { Observable } from 'rxjs/Observable';

export type LogoutOptions = {
  readonly callback: (res: any) => any;
};

export type AddEventHandlersOptions = {
  readonly onLogin?: (res: any) => any;
  readonly onLogout?: (res: any) => any;
};

export type GetJWTOptions = {
  readonly callback: (res: any) => any;
  readonly expiration?: number;
};

export type GetAccountInfoOptions = {
  readonly include?: string;
  readonly extraProfileFields?: string;
  readonly onError?: (error: any) => any;
  readonly callback: (res: any) => any;
};

export type GetScreenSetOptions = {
  readonly screenSetIDs?: string[];
  readonly include?: string;
  readonly lang?: string;
  readonly onError?: (error: any) => any;
  readonly callback: (res: any) => any;
};

export type ShowScreenSetOptions = {
  readonly screenSet: string;
  readonly startScreen?: string;
  readonly containerID: string;
  readonly lang?: string;
  readonly redirectURL?: string;
  readonly onError?: (error: any) => any;
  readonly onBeforeSubmit?: (opts: any) => any;
  readonly onSubmit?: (opts: any) => any;
  readonly customOnAfterScreenLoadHandler?: (opts: any) => any;
};

export type AccountInfo = {
  UID: string;
  errorCode: string | number;
  data: AccountInfoData;
  profile: AccountInfoProfile;
};

export type AccountInfoData = {
  HCPIsActive: boolean;
  HCPIsAccessible: boolean;
  billAddressCity: string;
  billAddressCountry: string;
  billAddressCountryCode: string;
  billAddressProvince: string;
  homeCountryCode: string;
  Cypher_Cloud_Gateway: string;
  billAddressStreet: string;
  nationalHealthSystem: string;
  SFDCaccountID: string;
  HCP_ID: string;
  billAddressPostalCode: string;
  homeCountry: string;
  nationalHealthNumber: string;
  FHIR_UserType: 'Patient' | 'Professional' | '';
};

export type PhoneNumber = {
  number: string;
  type?: string;
};

export type AccountInfoProfile = {
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  email: string;
  gender: string;
  languages: string;
  photoURL: string;
  phones: PhoneNumber[];
};

export type JWTInfo = {
  id_token: string;
};

export type GigyaAccounts = {
  showScreenSet: (options?: ShowScreenSetOptions) => void;
  getScreenSets: (options?: GetScreenSetOptions) => void;
  getAccountInfo: (options?: GetAccountInfoOptions) => Observable<AccountInfo>;
  getJWT: (options?: GetJWTOptions) => Observable<JWTInfo>;
  addEventHandlers: (options: AddEventHandlersOptions) => Observable<any>;
  logout: (options?: LogoutOptions) => Observable<any>;
  onLogin: () => any;
  setAccountInfo: (options?: SetAccountInfoOptions) => Observable<any>;
};

export type GigyaInstance = {
  accounts: GigyaAccounts;
};

export type SetAccountInfoOptions = {
  readonly data: AccountInfoData;
  readonly profile: AccountInfoProfile;
  readonly callback?: (res: any) => any;
};
