import React from 'react';

import { translate } from 'src/i18n';

import { Tooltip } from './insufficient-data-tooltip.style';

import { InfoTooltip } from '../info-tooltip';

const TOOLTIP_WIDTH = 200;
const TOOLTIP_X_OFFSET = 10;

export const InsufficientDataTooltip = () => (
  <Tooltip>
    <InfoTooltip
      info={translate('bloodGlucoseOverview.insufficientData')}
      toolTipXOffset={TOOLTIP_X_OFFSET}
      toolTipWidth={TOOLTIP_WIDTH}
    />
  </Tooltip>
);
