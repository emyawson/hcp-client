import { translate } from '@roche/patterns-indicators/i18n/translate';

export const WARNINGS_TAB = 'warnings';
export const COMPARE_TAB = 'compare';

export const tabs = [
  {
    id: WARNINGS_TAB,
    name: translate('advancedIndicators.tabs.warnings', null),
  },
  { id: COMPARE_TAB, name: translate('advancedIndicators.tabs.compare', null) },
];
