import React from 'react';

import { LocalizedText } from 'src/components';

import {
  ListSection,
  ListsContainer,
  List,
  ListElement,
  ListElementSectionHeader,
} from '../graph-statistics.style';

export const MetabolicStatistcsIndexes = ({ lbgi, hbgi }) => (
  <ListSection>
    <ListElementSectionHeader>
      <LocalizedText textKey="graphDetails.statistics.indexes.indexes" />
    </ListElementSectionHeader>
    <ListsContainer>
      <List flex={'none'}>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.indexes.hbgi" />
        </ListElement>
        <ListElement bold>
          <LocalizedText textKey="graphDetails.statistics.indexes.lbgi" />
        </ListElement>
      </List>
      <List>
        <ListElement>{hbgi}</ListElement>
        <ListElement>{lbgi}</ListElement>
      </List>
      <List flex={8} />
    </ListsContainer>
  </ListSection>
);
