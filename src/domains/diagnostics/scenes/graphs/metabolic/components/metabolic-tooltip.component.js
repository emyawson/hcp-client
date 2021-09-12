import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';
import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  ContainerDiv,
  TopBarDiv,
  DateWrapper,
  MeasurementsWrapper,
  Measurement,
  MeasurementLabel,
  MeasurementValue,
  MeasurementUnit,
} from './metabolic-tooltip.style';

export const MetabolicTooltip = ({ date, mean, stdDev }) => (
  <ContainerDiv>
    <TopBarDiv />
    <RenderIf validate={date}>
      <DateWrapper>{date}</DateWrapper>
    </RenderIf>
    <MeasurementsWrapper>
      <Measurement>
        <MeasurementLabel>
          <LocalizedText textKey="graphs.metabolicGraph.tooltip.meanbg" />
        </MeasurementLabel>
        <MeasurementValue>
          {mean}
          <MeasurementUnit>
            <LocalizedText textKey="graphs.axisLabels.mgPerDL" />
          </MeasurementUnit>
        </MeasurementValue>
      </Measurement>
      <Measurement>
        <MeasurementLabel>
          <RenderIf validate={date}>
            <LocalizedText textKey="graphs.metabolicGraph.tooltip.standardDeviation" />
          </RenderIf>
          <RenderIf validate={!date}>
            <LocalizedText textKey="graphs.metabolicGraph.tooltip.meanStandardDeviation" />
          </RenderIf>
        </MeasurementLabel>
        <MeasurementValue>
          {stdDev}
          <MeasurementUnit>
            <LocalizedText textKey="graphs.axisLabels.mgPerDL" />
          </MeasurementUnit>
        </MeasurementValue>
      </Measurement>
    </MeasurementsWrapper>
  </ContainerDiv>
);
