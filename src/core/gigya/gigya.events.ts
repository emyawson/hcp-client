import { Observable } from 'rxjs';

import {
  AccountInfo,
  AddEventHandlersOptions,
  GetAccountInfoOptions,
  GetJWTOptions,
  GetScreenSetOptions,
  GigyaInstance,
  JWTInfo,
  LogoutOptions,
  SetAccountInfoOptions,
  ShowScreenSetOptions,
} from './gigya.types';

const getGigya = (windowInstance: any): GigyaInstance => {
  return windowInstance.gigya;
};

const logout = (options: LogoutOptions): Observable<any> =>
  Observable.create(ob =>
    getGigya(window).accounts.logout({
      callback: res => ob.next(res),
      ...options,
    }),
  );

const addEventHandlers = (options: AddEventHandlersOptions): Observable<any> =>
  getGigya(window).accounts.addEventHandlers(options);

const onLogin = () =>
  Observable.create(ob =>
    addEventHandlers({
      onLogin: res => ob.next(res),
    }),
  );

const getJWT = (options: GetJWTOptions): Observable<JWTInfo> =>
  Observable.create(ob =>
    getGigya(window).accounts.getJWT({
      callback: res => ob.next(res),
      ...options,
    }),
  );

const getAccountInfo = (
  options: GetAccountInfoOptions,
): Observable<AccountInfo> =>
  Observable.create(ob =>
    getGigya(window).accounts.getAccountInfo({
      callback: (res: AccountInfo) => ob.next(res),
      extraProfileFields: 'languages,phones',
      ...options,
    }),
  );

const getScreenSets = (options: GetScreenSetOptions): Observable<any> =>
  Observable.create(ob =>
    getGigya(window).accounts.getScreenSets({
      callback: res => ob.next(res),
      onError: console.error,
      ...options,
    }),
  );

const showScreenSet = (options: ShowScreenSetOptions): Observable<any> =>
  Observable.create(ob => {
    getGigya(window).accounts.showScreenSet({
      onError: console.error,
      ...options,
    });
    return ob.next(true);
  })
    .publish()
    .connect();

const setAccountInfo = (
  options: SetAccountInfoOptions,
): Observable<AccountInfo> =>
  Observable.create(ob =>
    getGigya(window).accounts.setAccountInfo({
      callback: (res: AccountInfo) => ob.next(res),
      ...options,
    }),
  );

export const gigyaEventHandlers: GigyaInstance = {
  accounts: {
    addEventHandlers,
    getScreenSets,
    showScreenSet,
    getAccountInfo,
    getJWT,
    onLogin,
    logout,
    setAccountInfo,
  },
};
