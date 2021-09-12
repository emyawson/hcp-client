// TODO: Move all table_name and table_data to compare.selector.ts
// when implementing col2 content, as it will need data from the store

import { translationText } from '@roche/patterns-indicators/constants/form-config.constants';

export const VARIABILITY_TABLE_NAME =
  translationText['indicator-category.variability'];

export const VARIABILITY_TABLE_DATA = [
  {
    col1: {
      title: translationText['indicator.variability.standard-deviation'],
      description:
        'Red when: SD = above X mg/dL; SD = above X % out of mean glycemia',
    },
    col2: '',
  },
  {
    col1: {
      title:
        translationText['indicator.measurements-for-analysis.variability.lbgi'],
      description: 'Red when: Hypoglycemia risk index = moderate / high',
    },
    col2: '',
  },
  {
    col1: {
      title:
        translationText['indicator.measurements-for-analysis.variability.hbgi'],
      description: 'Red when: Hyperglycemia risk index = moderate / high',
    },
    col2: '',
  },
];

export const HYPOGLYCEMIAS_TABLE_NAME =
  translationText['indicator-category.hypoglycemia'];

export const HYPOGLYCEMIAS_TABLE_DATA = [
  {
    col1: {
      title: translationText['indicator.hypoglycemia.trend'],
      description:
        'Red when: more than X hypoglycemias a day over X consecutive days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hypoglycemia.overcorrection'],
      description:
        'Red when: more than X % of hypos with a previous hyperglycemia within a window of X hours',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hypoglycemia.time-blocks'],
      description:
        'Red when: existence of hypoglycemias in a same time block on more than X days within an interval of X days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hypoglycemia.repetition-days'],
      description:
        'Red when: more than X glycemias below X mg/dL with a repeat pattern every X days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hypoglycemia.cartridge'],
      description:
        'Red when: in more than X % of cartridge changes there is a hypoglycemia in the subsequent X hours',
    },
    col2: '',
  },
];

export const HYPERGLYCEMIAS_TABLE_NAME =
  translationText['indicator-category.hyperglycemia'];

export const HYPERGLYCEMIAS_TABLE_DATA = [
  {
    col1: {
      title: translationText['indicator.hyperglycemia.trend'],
      description:
        'Red when: more than X hyperglycemias a day over X consecutive days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hyperglycemia.overcorrection'],
      description:
        'Red when: more than X % of hypers with a previous hypoglycemia within a window of X hours',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hyperglycemia.time-blocks'],
      description:
        'Red when: existence of hyperglycemias in a same time block on more than X days within an interval of X days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hyperglycemia.repetition-days'],
      description:
        'Red when: more than X glycemias above X mg/dL with a repeat pattern every X days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hyperglycemia.bolus'],
      description:
        'Red when: in an interval of X weeks there are more than X hyperglycemias related to a bolus omission',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.hyperglycemia.cartridge'],
      description:
        'Red when: in more than X % of cartridge changes there is a hyperglycemia in the subsequent X hours',
    },
    col2: '',
  },
];

export const USE_OF_SYSTEM_TABLE_NAME =
  translationText['indicator-category.use-of-system'];

export const USE_OF_SYSTEM_TABLE_DATA = [
  {
    col1: {
      title: translationText['indicator.use-of-system.prandial-marking'],
      description:
        'Red when: there are less than X glycemias a day with pre or postprandial marking on more than X % of the days',
    },
    col2: '',
  },
  {
    col1: {
      title:
        translationText[
          'indicator.use-of-system.insulin-carbohydrate-recording'
        ],
      description:
        'Red when: there are less than X daily records of insulin and carbohydrates in more than X % of the days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.use-of-system.download-frequency'],
      description: 'Red when: data download frequency above X days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.use-of-system.pump-stops'],
      description:
        'Red when: there are more than X stops per day in more than X % of the days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.use-of-system.cartridge-frequency'],
      description:
        'Red when: there is a cartridge change delay in more than X % of changes',
    },
    col2: '',
  },
];

export const TREATMENT_ADHERENCE_TABLE_NAME =
  translationText['indicator-category.treatment-adherence'];

export const TREATMENT_ADHERENCE_TABLE_DATA = [
  {
    col1: {
      title:
        translationText['indicator.treatment-adherence.measurement-frequency'],
      description:
        'Red when: there are less than X bG tests per day recorded on the X % of the days',
    },
    col2: '',
  },
  {
    col1: {
      title: translationText['indicator.treatment-adherence.glycemic-control'],
      description:
        'Red when: in more than X % of the boluses there is no glycemia test in a previous interval of X minutes',
    },
    col2: '',
  },
  {
    col1: {
      title:
        translationText['indicator.treatment-adherence.bolus-recommendation'],
      description:
        'Red when: in more than X % of the boluses the calculator is not used',
    },
    col2: '',
  },
];
