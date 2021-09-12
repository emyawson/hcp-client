import React from 'react';

import { HypoLimitIcon, RectangleMarkIcon, TIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { LegendItem } from './legend-item.component';

import {
  LegendList,
  LegendListsContainer,
  LegendListSectionHeader,
  RotatedIconContainer,
} from '../graph-legend.style';

export const TrendGraphLegend = () => (
  <LegendListsContainer>
    <LegendList>
      <LegendListSectionHeader>
        {translate('graphDetails.statistics.bloodGlucose.bloodGlucose')}
      </LegendListSectionHeader>
      <LegendItem
        icon={
          <RotatedIconContainer rotationAngle={45}>
            <RectangleMarkIcon />
          </RotatedIconContainer>
        }
        label={translate('graphDetails.legend.meanBloodGlucose')}
      />
      <LegendItem
        icon={<RectangleMarkIcon fillColor={colors.cyan} />}
        label={translate(
          'graphDetails.statistics.bloodGlucose.standardDeviation',
        )}
      />
    </LegendList>
    <LegendList>
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
    <LegendList noBorder>
      <LegendListSectionHeader>
        {translate('graphDetails.legend.results')}
      </LegendListSectionHeader>
      <LegendItem
        icon={<TIcon />}
        label={translate('graphDetails.legend.highestResult')}
      />
      <LegendItem
        icon={
          <RotatedIconContainer rotationAngle={180}>
            <TIcon />
          </RotatedIconContainer>
        }
        label={translate('graphDetails.legend.lowestResult')}
      />
    </LegendList>
  </LegendListsContainer>
);
