import React from 'react';

import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';

export const MetabolicPlotFrame = ({ width, height, yDirection }) => (
  <RenderIf validate={!isNaN(width)}>
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={0}
      y1={0}
      x2={width}
      y2={0}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={0}
      y1={yDirection * height}
      x2={width}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
    <line
      x1={width}
      y1={0}
      x2={width}
      y2={yDirection * height}
      strokeWidth={strokeWidth.one}
      stroke={colors.grayLight}
    />
  </RenderIf>
);
