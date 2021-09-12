import React from 'react';

import { RenderIf, hasValue } from 'src/domains/diagnostics/utils';
import { Column } from 'src/domains/diagnostics/components';

import {
  DetailBlockContainerDiv,
  PrimaryTitleHeader,
  CircleDiv,
  ValueDisplay,
  ValueContainerDiv,
  SecondaryTitleHeader,
} from './detail-block.style';

export const DetailBlock = ({
  flex,
  primaryTitle,
  secondaryTitle = '',
  value,
  circleFill = '',
}) => (
  <DetailBlockContainerDiv flex={flex}>
    <Column>
      <PrimaryTitleHeader>{primaryTitle}</PrimaryTitleHeader>

      <ValueContainerDiv>
        <RenderIf validate={hasValue(circleFill)}>
          <CircleDiv color={circleFill} />
        </RenderIf>
        <ValueDisplay>{value}</ValueDisplay>
      </ValueContainerDiv>

      <RenderIf validate={hasValue(secondaryTitle)}>
        <SecondaryTitleHeader>{secondaryTitle}</SecondaryTitleHeader>
      </RenderIf>
    </Column>
  </DetailBlockContainerDiv>
);
