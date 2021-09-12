import React from 'react';

import { LocalizedText } from 'src/components';

import {
  ListSection,
  ListsContainer,
  List,
  ListElement,
  ListElementSectionHeader,
} from '../graph-statistics.style';

export const MetabolicStatistcsBloodGlucose = ({
  mean,
  meanBeforeMeal,
  meanAfterMeal,
  stdDev,
  stdDevMeanRatio,
}) => (
  <ListSection borderRight>
    <ListElementSectionHeader>
      <LocalizedText textKey="graphDetails.statistics.bloodGlucose.bloodGlucose" />
    </ListElementSectionHeader>
    <ListsContainer>
      <List flex={'none'}>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.meanBloodGlucose" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.meanBloodGlucoseBeforeMeal" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.meanBloodGlucoseAfterMeal" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.standardDeviationSD" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.stdDevMeanRatio" />
        </ListElement>
      </List>
      <List>
        <ListElement>
          {isNaN(mean) || mean === 0 ? ' - ' : mean + ' '}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>
          {isNaN(meanBeforeMeal) || meanBeforeMeal === 0
            ? ' - '
            : meanBeforeMeal + ' '}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>
          {isNaN(meanAfterMeal) || meanAfterMeal === 0
            ? ' - '
            : meanAfterMeal + ' '}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>
          {`${stdDev} `}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>
          {isNaN(stdDevMeanRatio) ? ' - ' : stdDevMeanRatio + ' '}%
        </ListElement>
      </List>
      <List flex={8} />
    </ListsContainer>
  </ListSection>
);
