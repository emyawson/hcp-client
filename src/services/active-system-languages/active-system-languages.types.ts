export type EC6ActiveLanguage = {
  id: any;
  languageId: string;
  labelProperty: string;
  labelText: string;
  isoCode: string;
  key: string;
  value: string;
};

export type EC6ActiveLanguagesResponse = {
  resultDescription: string;
  model: EC6ActiveLanguage[];
};

export type ActiveSystemLanguage = {
  name: string;
  isoCode: string;
};

export type ActiveSystemLanguages = ActiveSystemLanguage[];
