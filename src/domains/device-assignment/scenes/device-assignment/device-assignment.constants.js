import { translate } from 'src/i18n/index';

export const DEVICE_ASSIGNMENT_STEP_CONFIG = [
  {
    title: translate('deviceAssignment.steps.one'),
  },
  {
    title: translate('deviceAssignment.steps.two'),
  },
  {
    title: translate('deviceAssignment.steps.three'),
  },
];

export const DEVICE_ASSIGNMENT_SUPPORT_CONFIG = {
  GB: {
    phone: '1-800-930-0000',
    email: 'roche-support@roche.com',
  },
  ES: {
    phone: '+34 900 210 341',
    email: 'info@accu-che.es',
  },
  PT: {
    phone: '+351 800 200 265, +351 800 911 912',
    email: 'accu-chek.pt@roche.com',
  },
};
export const DEVICE_ASSIGNMENT_SUPPORT_DEFAULT =
  DEVICE_ASSIGNMENT_SUPPORT_CONFIG.ES;
