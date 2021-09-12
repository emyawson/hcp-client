import { EC6ActiveLanguagesResponse } from './active-system-languages.types';

export const mockActiveLanguages: EC6ActiveLanguagesResponse = {
  resultDescription: 'getActiveLanguagestOK',
  model: [
    {
      id: null,
      languageId: '1',
      labelProperty: 'enum.Spanish',
      labelText: 'Spanish',
      isoCode: 'es',
      key: '1',
      value: 'Spanish',
    },
    {
      id: null,
      languageId: '3',
      labelProperty: 'enum.English',
      labelText: 'English',
      isoCode: 'en',
      key: '3',
      value: 'English',
    },
    {
      id: null,
      languageId: '11',
      labelProperty: 'enum.Portuguese',
      labelText: 'Portuguese',
      isoCode: 'pt',
      key: '11',
      value: 'Portuguese',
    },
  ],
};
