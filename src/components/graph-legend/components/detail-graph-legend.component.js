import React from 'react';

import {
  CircleMarkIcon,
  ConnectingLinesIcon,
  CrossMarkIcon,
  HypoLimitIcon,
  MeanBloodGlucoseIcon,
  RectangleMarkIcon,
} from 'src/assets/icons';
import { LocalizedText } from 'src/components';
import { colors } from 'src/core/styles/colors';
import { translate } from 'src/i18n';

import { LegendItem } from './legend-item.component';

import {
  LegendList,
  LegendListsContainer,
  LegendListSectionHeader,
} from '../graph-legend.style';

export const DetailGraphLegend = () => (
  <LegendListsContainer>
    <LegendList>
      <LegendListSectionHeader>
        <LocalizedText textKey="graphDetails.statistics.bloodGlucose.bloodGlucose" />
      </LegendListSectionHeader>
      <LegendItem
        icon={<CrossMarkIcon />}
        label={translate('graphDetails.legend.bloodGlucose')}
      />
      <LegendItem
        icon={<RectangleMarkIcon fillColor={colors.white} />}
        label={translate('graphs.detailGraph.bgBeforeMeal')}
      />
      <LegendItem
        icon={<RectangleMarkIcon />}
        label={translate('graphs.detailGraph.bgAfterMeal')}
      />
      <LegendItem
        icon={<MeanBloodGlucoseIcon />}
        label={translate('graphDetails.legend.meanBloodGlucose')}
      />
    </LegendList>
    <LegendList>
      <LegendListSectionHeader>
        <LocalizedText textKey="graphDetails.legend.targetRangeSectionHeader" />
      </LegendListSectionHeader>
      <LegendItem
        icon={<CrossMarkIcon fillColor={colors.red} />}
        label={translate('graphDetails.legend.hypoglycaemia')}
      />
      <LegendItem
        icon={
          <CircleMarkIcon strokeColor={colors.red} fillColor={colors.white} />
        }
        label={translate('graphDetails.legend.hypoSymptoms')}
      />
      <LegendItem
        icon={<HypoLimitIcon />}
        label={translate('graphDetails.legend.hypoLimit')}
      />
      <LegendItem
        icon={
          <RectangleMarkIcon
            strokeColor={colors.green}
            fillColor={colors.white}
          />
        }
        label={translate('graphDetails.legend.targetRange')}
      />
    </LegendList>
    <LegendList noBorder>
      <LegendListSectionHeader>
        <LocalizedText textKey="graphDetails.legend.graphVisuals" />
      </LegendListSectionHeader>
      <LegendItem
        icon={<ConnectingLinesIcon />}
        label={translate('graphDetails.legend.connectingLines')}
      />
    </LegendList>
  </LegendListsContainer>
);
