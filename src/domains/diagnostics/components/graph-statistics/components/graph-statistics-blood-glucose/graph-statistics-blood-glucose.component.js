import React from 'react';

import { CrossMarkIcon } from 'src/domains/diagnostics/assets/icons';
import { LocalizedText } from 'src/domains/diagnostics/components';

import {
  IconContainer,
  ListSection,
  ListsContainer,
  List,
  ListElement,
  ListElementSectionHeader,
} from '../../graph-statistics.style';

export const GraphDetailBloodGlucose = ({
  bloodGlucoseMean,
  bloodGlucoseStandardDeviation,
  testsPerDay,
}) => (
  <ListSection borderRight>
    <ListElementSectionHeader>
      <IconContainer>
        <CrossMarkIcon />{' '}
      </IconContainer>
      <LocalizedText textKey="graphDetails.statistics.bloodGlucose.meanBloodGlucoseTitle" />
    </ListElementSectionHeader>
    <ListsContainer>
      <List flex={'none'}>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.glucoseLevel" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.standardDeviation" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.bloodGlucose.testsPerDay" />
        </ListElement>
      </List>
      <List>
        <ListElement>
          {`${bloodGlucoseMean || '-'} `}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>
          {`${bloodGlucoseStandardDeviation} `}
          <LocalizedText textKey="graphDetails.mgPerDL" />
        </ListElement>
        <ListElement>{testsPerDay}</ListElement>
      </List>
      <List flex={8} />
    </ListsContainer>
  </ListSection>
);
