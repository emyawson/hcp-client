import React from 'react';
import { isNil } from 'ramda';

import { RenderIf } from 'src/domains/diagnostics/utils';

import {
  IntervalLabelContainer,
  IntervalTopLabel,
  IntervalBottomLabel,
  IntervalInfoContainer,
} from './interval-label.style';

import { InfoTooltip } from '../info-tooltip';

const TOOLTIP_Y_OFFSET = 16;
const TOOLTIP_WIDTH = 200;

export const IntervalLabel = ({ label: { top, bottom }, info }) => (
  <IntervalLabelContainer smallButtonMargin={isNil(bottom)}>
    <IntervalTopLabel underline={top} smallLeftMargin={info}>
      <span>{top}</span>
      <RenderIf validate={info}>
        <IntervalInfoContainer>
          <InfoTooltip
            info={info}
            toolTipYOffset={TOOLTIP_Y_OFFSET}
            toolTipWidth={TOOLTIP_WIDTH}
          />
        </IntervalInfoContainer>
      </RenderIf>
    </IntervalTopLabel>
    <IntervalBottomLabel>
      <span>{bottom}</span>
    </IntervalBottomLabel>
  </IntervalLabelContainer>
);
