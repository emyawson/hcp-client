import React from 'react';

import { RectangleMarkIcon } from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { LegendItem } from './legend-item.component';

import {
  LegendList,
  LegendListsContainer,
  LegendListSectionHeader,
} from '../graph-legend.style';

export const LogbookGraphLegend = () => (
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
      <LegendItem
        icon={
          <RectangleMarkIcon
            fillColor={colors.white}
            strokeColor={colors.trafficRed2}
          />
        }
        label={translate('graphDetails.legend.hypoSymptoms')}
      />
    </LegendList>
  </LegendListsContainer>
);
