import React from 'react';

import { TrafficLight } from 'src/domains/diagnostics/scenes/blood-glucose-overview/components/traffic-light';
import { InsufficientDataTooltip } from 'src/domains/diagnostics/scenes/blood-glucose-overview/components/insufficient-data-tooltip';
import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  StatusCardRowWrapper,
  StatusCardDetail,
  StatusCardDetailWrapper,
  StatusCardDetailLabel,
  StatusCardDetailCaption,
  TrafficLightContainer,
} from './status-card-row.style';

export const StatusCardRow = ({
  caption,
  color,
  hasReliableInfo,
  statusLabel,
  showLabels,
  value,
}) => (
  <StatusCardRowWrapper>
    <TrafficLightContainer>
      <TrafficLight
        color={color}
        emptyInnerCircle={!hasReliableInfo}
        label=""
        showTooltip={false}
        size={20}
      />
    </TrafficLightContainer>
    <StatusCardDetailWrapper>
      <StatusCardDetail>
        <StatusCardDetailLabel>
          {showLabels ? statusLabel : '-'}
          <RenderIf validate={!hasReliableInfo}>
            <InsufficientDataTooltip />
          </RenderIf>
        </StatusCardDetailLabel>
        <div>{showLabels ? value : '-'}</div>
      </StatusCardDetail>
      <RenderIf validate={caption}>
        <StatusCardDetailCaption>{caption}</StatusCardDetailCaption>
      </RenderIf>
    </StatusCardDetailWrapper>
  </StatusCardRowWrapper>
);
