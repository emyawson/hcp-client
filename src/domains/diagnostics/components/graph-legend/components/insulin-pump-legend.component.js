import React from 'react';

import {
  BolusExtendedIcon,
  BolusMultiwaveIcon,
  BolusQuickIcon,
  BolusStandardIcon,
  LightBulbIcon,
  ModifiedBolusIcon,
  BasalPlusBolusIcon,
} from 'src/domains/diagnostics/assets/icons';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { LegendItem } from './legend-item.component';

import { LegendList, LegendListsContainer } from '../graph-legend.style';

export const InsulinPumpLegend = () => (
  <LegendListsContainer>
    <LegendList>
      <LegendItem
        icon={<BolusStandardIcon />}
        label={translate('graphDetails.legend.standardBolus')}
      />
      <LegendItem
        icon={<BolusQuickIcon />}
        label={translate('graphDetails.legend.quickBolus')}
      />
      <LegendItem
        icon={<BolusExtendedIcon />}
        label={translate('graphDetails.legend.extendedBolus')}
      />
      <LegendItem
        icon={<BolusMultiwaveIcon />}
        label={translate('graphDetails.legend.multiwaveBolus')}
      />
    </LegendList>
    <LegendList noBorder>
      <LegendItem
        icon={<LightBulbIcon />}
        label={translate('graphDetails.legend.bolusAdvice')}
      />
      <LegendItem
        icon={<ModifiedBolusIcon />}
        label={translate('graphDetails.legend.modifiedBolus')}
      />
      <LegendItem
        icon={<BasalPlusBolusIcon />}
        label={translate('graphDetails.legend.basalRateBolus')}
      />
    </LegendList>
  </LegendListsContainer>
);
