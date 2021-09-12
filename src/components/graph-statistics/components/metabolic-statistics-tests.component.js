import React from 'react';

import { LocalizedText } from 'src/components';

import {
  ListSection,
  ListsContainer,
  List,
  ListElement,
  ListElementSectionHeader,
} from '../graph-statistics.style';

export const MetabolicStatistcsTests = ({
  numberOfTests,
  testsPerDay,
  testsPerMeasuredDay,
}) => (
  <ListSection borderRight>
    <ListElementSectionHeader>
      <LocalizedText textKey="graphDetails.statistics.tests.tests" />
    </ListElementSectionHeader>
    <ListsContainer>
      <List flex={'none'}>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.tests.numberOfTests" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.tests.testsPerDay" />
        </ListElement>
      </List>
      <List>
        <ListElement>{`${numberOfTests || '0'} `}</ListElement>
        <ListElement>
          {testsPerDay === '0.0' ? ' - ' : testsPerDay}
          ({isNaN(testsPerMeasuredDay) ? ' - ' : testsPerMeasuredDay})
        </ListElement>
      </List>
      <List flex={8} />
    </ListsContainer>
  </ListSection>
);
