import { Observable } from 'rxjs/Rx';

import { i18n } from 'src/i18n';

import { selectEC6UserLanguage } from './user.selectors';
import {
  getCurrentUser,
  onChangeLocale,
  onChangeLocaleError,
} from './user.actions';
import { GET_CURRENT_USER } from './user.constants';

import { VALIDATE_SESSION } from '../authentication/authentication.constants';
import { getToken } from '../authentication';

export const changeLanguageEpic = () => {
  let currentLocale = null;
  return (action$, store$) =>
    action$.ofType(GET_CURRENT_USER.SUCCESS).flatMap(() => {
      const languageIsoCode = selectEC6UserLanguage(store$.getState());
      if (languageIsoCode && languageIsoCode !== currentLocale) {
        i18n.changeLanguage(languageIsoCode);
        return [onChangeLocale(languageIsoCode)];
      }
      return [onChangeLocaleError()];
    });
};

export const userEpic = currentUserService => (action$, state$) =>
  action$
    .ofType(GET_CURRENT_USER.START, VALIDATE_SESSION.SUCCESS)
    .flatMap(() => {
      const token = getToken(state$.getState());
      if (!token) {
        return [
          getCurrentUser.error({
            error: true,
            message: 'no token found',
          }),
        ];
      }
      return Observable.create(ob =>
        currentUserService(token)
          .then(user => ob.next(getCurrentUser.success({ user })))
          .catch(errResponse =>
            ob.next(
              getCurrentUser.error({
                error: true,
                message: JSON.stringify(errResponse),
              }),
            ),
          ),
      );
    });
