import { Config } from 'src/core/env/config';
import { getJSON } from 'src/utils/service/service.utils';

import {
  ActiveSystemLanguages,
  EC6ActiveLanguage,
  EC6ActiveLanguagesResponse,
} from './active-system-languages.types';

const { REACT_APP_EC6_API_ROOT } = Config;

export const GetActiveSystemLanguagesLoaderImpl = (token: string) => {
  return getJSON(`${REACT_APP_EC6_API_ROOT}/language/active`, {
    headers: { Authorization: token },
  });
};

export const GetActiveSystemLanguagesTransformImpl = ({
  model,
}: EC6ActiveLanguagesResponse): ActiveSystemLanguages => {
  return model.map((language: EC6ActiveLanguage) => {
    return {
      name: language.labelText,
      isoCode: language.isoCode,
    };
  });
};

export const GetActiveSystemLanguagesServiceImpl = (load, transform) => token =>
  load(token).then(transform);
