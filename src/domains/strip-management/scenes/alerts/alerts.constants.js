import { translate } from 'src/i18n';
import { ALERTS_IDS } from 'src/core/alerts';

export const alertThresholdRowDetails = {
  [ALERTS_IDS.HYPO]: {
    intervalModelPath: '.preIdealInterval',
    label: translate('alerts.thresholdHypo'),
    counterLabel: translate('alerts.activateUnitHypo'),
  },
  [ALERTS_IDS.UPPER]: {
    intervalModelPath: '.postIdealInterval',
    label: translate('alerts.thresholdUpper'),
    counterLabel: translate('alerts.activateUnitUpper'),
  },
  [ALERTS_IDS.LOWER]: {
    intervalModelPath: '.noctIdealInterval',
    label: translate('alerts.thresholdLower'),
    counterLabel: translate('alerts.activateUnitLower'),
  },
};

export const localFormModelPath = 'alerts';
