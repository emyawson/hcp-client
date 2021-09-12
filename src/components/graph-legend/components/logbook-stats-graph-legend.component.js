import React from 'react';

import { RectangleMarkIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { LegendItem } from './legend-item.component';

import {
  LegendList,
  LegendListsContainer,
  LegendListSectionHeader,
} from '../graph-legend.style';

export const LogbookStatsGraphLegend = () => (
  <LegendListsContainer>
    <LegendList noBorder>
      <LegendListSectionHeader>
        {translate('graphDetails.legend.targetRangeSectionHeader')}
      </LegendListSectionHeader>
      <LegendItem
        icon={
          <RectangleMarkIcon
            fillColor={colors.quartzBlue}
            strokeColor={colors.quartzBlue}
          />
        }
        label={translate('graphDetails.legend.aboveTargetRange')}
      />
      <LegendItem
        icon={
          <RectangleMarkIcon
            fillColor={colors.trafficRed2}
            strokeColor={colors.trafficRed2}
          />
        }
        label={translate('graphDetails.legend.belowTargetRange')}
      />
    </LegendList>
  </LegendListsContainer>
);
