import React from 'react';

import { RectangleMarkIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { LocalizedText } from 'src/components';
import { translate } from 'src/i18n';

import {
  IconContainer,
  ListSection,
  ListsContainer,
  List,
  ListElement,
  ListElementSectionHeader,
} from '../../graph-statistics.style';

type GraphDetailTargetRangesProps = {
  abovePercentage: number,
  belowPercentage: number,
  hypoglycaemiaNumber: number,
  hypoglycaemiaPercentage: number,
  targetBloodGlucoseMinimum: number,
  targetBloodGlucoseMaximum: number,
  withinPercentage: number,
};

export const GraphDetailTargetRanges = ({
  abovePercentage,
  belowPercentage,
  hypoglycaemiaNumber,
  hypoglycaemiaPercentage,
  targetBloodGlucoseMinimum,
  targetBloodGlucoseMaximum,
  withinPercentage,
}: GraphDetailTargetRangesProps) => (
  <ListSection>
    <ListElementSectionHeader>
      <IconContainer>
        <RectangleMarkIcon
          strokeColor={colors.transparentGreen}
          fillColor={colors.transparentGreen}
        />{' '}
      </IconContainer>
      <LocalizedText
        textKey={'graphDetails.statistics.targetRanges.targetRange'}
      />
      {` (${targetBloodGlucoseMinimum}-${targetBloodGlucoseMaximum} ${translate(
        'graphDetails.mgPerDL',
      )})`}
    </ListElementSectionHeader>
    <ListsContainer>
      <List>
        <ListElement bold>
          <LocalizedText
            textKey={'graphDetails.statistics.targetRanges.above'}
          />
        </ListElement>
        <ListElement bold>
          <LocalizedText
            textKey={'graphDetails.statistics.targetRanges.within'}
          />
        </ListElement>
        <ListElement bold>
          <LocalizedText
            textKey={'graphDetails.statistics.targetRanges.below'}
          />
        </ListElement>
      </List>
      <List>
        <ListElement>{`${abovePercentage}%`}</ListElement>
        <ListElement>{`${withinPercentage}%`}</ListElement>
        <ListElement>{`${belowPercentage}%`}</ListElement>
      </List>
      <List noBorder>
        <ListElement bold>
          <LocalizedText
            textKey={'graphDetails.statistics.targetRanges.hypos'}
          />
        </ListElement>
      </List>
      <List>
        <ListElement>
          {`${hypoglycaemiaPercentage}% (${hypoglycaemiaNumber})`}
        </ListElement>
      </List>
      <List flex={16} />
    </ListsContainer>
  </ListSection>
);
