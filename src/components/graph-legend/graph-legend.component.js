import React from 'react';

import { LocalizedText } from 'src/components';
import { RenderIf } from 'src/utils';

import { Container, Title } from './graph-legend.style';
import {
  DetailGraphLegend,
  LogbookGraphLegend,
  LogbookStatsGraphLegend,
  TrendGraphLegend,
  MetabolicGraphLegend,
  InsulinPumpLegend,
} from './components';

export const GraphLegend = ({ graphType }) => (
  <Container>
    <Title>
      <LocalizedText textKey="graphDetails.legend.legend" />
    </Title>
    <RenderIf validate={graphType === 'detail'}>
      <DetailGraphLegend />
    </RenderIf>
    <RenderIf validate={graphType === 'logbook'}>
      <LogbookGraphLegend />
    </RenderIf>
    <RenderIf validate={graphType === 'logbook-stats'}>
      <LogbookStatsGraphLegend />
    </RenderIf>
    <RenderIf validate={graphType === 'trend'}>
      <TrendGraphLegend />
    </RenderIf>
    <RenderIf validate={graphType === 'metabolic'}>
      <MetabolicGraphLegend />
    </RenderIf>
    <RenderIf validate={graphType === 'insulin-pump'}>
      <InsulinPumpLegend />
    </RenderIf>
  </Container>
);
