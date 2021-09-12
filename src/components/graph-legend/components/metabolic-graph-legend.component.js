import React from 'react';

import {
  HypoLimitIcon,
  RectangleMarkIcon,
  CrossMarkIcon,
  DoubleEllipseIcon,
} from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { LegendItem } from './legend-item.component';

import {
  LegendList,
  LegendListsContainer,
  LegendListSectionHeader,
  RotatedIconContainer,
} from '../graph-legend.style';

export const MetabolicGraphLegend = () => (
  <LegendListsContainer>
    <LegendList>
      <LegendListSectionHeader>
        {translate('graphDetails.statistics.bloodGlucose.bloodGlucose')}
      </LegendListSectionHeader>
      <LegendItem
        icon={
          <RotatedIconContainer rotationAngle={45}>
            <RectangleMarkIcon fillColor={colors.white} />
          </RotatedIconContainer>
        }
        label={translate('graphDetails.legend.meanBloodGlucoseSD')}
      />
      <LegendItem
        icon={<CrossMarkIcon fillColor={colors.brandBlue} />}
        label={translate('graphDetails.legend.meanBloodGlucoseMeanSD')}
      />
      <LegendItem
        icon={<DoubleEllipseIcon strokeColor={colors.blue} />}
        label={translate('graphDetails.legend.oneSdTwoSd')}
      />
    </LegendList>
    <LegendList noBorder>
      <LegendListSectionHeader>
        {translate('graphDetails.legend.targetRangeSectionHeader')}
      </LegendListSectionHeader>
      <LegendItem
        icon={
          <RectangleMarkIcon
            strokeColor={colors.green}
            fillColor={colors.white}
          />
        }
        label={translate('graphDetails.legend.targetRange')}
      />
      <LegendItem
        icon={<HypoLimitIcon />}
        label={translate('graphDetails.legend.hypoLimit')}
      />
    </LegendList>
  </LegendListsContainer>
);
