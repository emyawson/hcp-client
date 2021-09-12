import { Observable } from 'rxjs/Observable';

export type LogoutOptions = {
  readonly callback: (res: any) => any;
};

export type AddEventHandlersOptions = {
  readonly onLogin?: (res: any) => any;
  readonly onLogout?: (res: any) => any;
};

export type GetJWTOptions = {
  readonly expiration?: number;
  readonly callback: (res: any) => any;
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
};

export type AccountInfo = {
  data: AccountInfoData;
  profile: AccountInfoProfile;
};

export type AccountInfoData = {
  HCPIsActive: boolean;
  HCPIsAccessible: boolean;
};

export type AccountInfoProfile = {
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  email: string;
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
  logout: (options?: LogoutOptions) => void;
  onLogin: () => any;
};

export type GigyaInstance = {
  accounts: GigyaAccounts;
};
