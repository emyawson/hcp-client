import {
  Category,
  Pattern,
  TranslationText,
} from '@roche/patterns-indicators/types/config.types';

import { getProcessEnv, getWindowEnv } from '../environment';

import { DynamicConfig, StaticConfig } from './config.types';

export const isDevEnv = (): boolean =>
  getProcessEnv().NODE_ENV === 'development';

export const getStaticConfig = (): StaticConfig => getProcessEnv();
export const getDynamicConfig = (): DynamicConfig => getWindowEnv(window);

export const augmentConfigDetailsWithTemplates = (
  categories: Category[],
  translationText: TranslationText,
) => {
  return categories.reduce(
    (detailsAcc, category: Category) => ({
      ...detailsAcc,
      ...category.patterns.reduce(
        (patternDetailsAcc, pattern: Pattern) => ({
          ...patternDetailsAcc,
          [pattern.id]: {
            ...pattern,
            template: translationText[pattern.displayText],
          },
        }),
        {},
      ),
    }),
    {},
  );
};
