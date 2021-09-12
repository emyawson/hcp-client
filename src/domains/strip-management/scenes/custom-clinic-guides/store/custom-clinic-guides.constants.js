import { translate } from 'src/i18n';

export const CUSTOM_GUIDES_PERIODS = {
  DAY: {
    label: translate('prescription.period.days'),
    value: 'days',
  },
  WEEK: {
    label: translate('prescription.period.weeks'),
    value: 'weeks',
  },
};

export const CUSTOM_GUIDES_QUANTITY = {
  QUANTITY_MIN: 1,
  QUANTITY_MAX: 50,
};

export const CREATE_CUSTOM_GUIDE_FORM_ID = 'createCustomClinicGuide';
