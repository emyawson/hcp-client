import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';

import { TriangleShape } from './point-shapes.component';

import { toolTipWidth } from '../tool-tip';

export const Candlestick = (
  bucketWidth,
  height,
  onMouseOver = () => null,
  onMouseOut = () => null,
  pointsOnAxes = true,
) => normalizedValues => {
  const MAXIMUM_MAX_VALUE = 1;
  const MINIMUM_MIN_VALUE = 0;
  const PIXEL_OFFSET = 1;
  const STROKE_WIDTH = 1.5;

  const { x, y, deviation, max, min } = normalizedValues;

  const candlestickWidth = 0.33 * bucketWidth; // minimum width set in case of large bucket widths
  const halfCandlestickWidth = candlestickWidth / 2;

  const candleStickHeight = deviation * height;
  const halfHeight = 0.5 * candleStickHeight;

  const meanRectWidth = Math.min(6, 0.1 * candlestickWidth);

  const xCenter = pointsOnAxes ? x + bucketWidth / 2 : x;

  // we want to adjust the location of the min/max lines so they are not cut off by graph border at values of 0/400
  const maxLineY =
    max === MAXIMUM_MAX_VALUE
      ? -(max * height) + PIXEL_OFFSET
      : -(max * height);
  const minLineY =
    min === MINIMUM_MIN_VALUE
      ? -(min * height) - PIXEL_OFFSET
      : -(min * height);

  return (
    <React.Fragment key={`${x}-${y}-${deviation}`}>
      <RenderIf validate={y}>
        {/* Candlestick rect */}
        <rect
          x={xCenter - halfCandlestickWidth}
          width={candlestickWidth}
          y={y - halfHeight}
          height={candleStickHeight}
          fill={colors.transparentCyan}
          onMouseMove={event =>
            onMouseOver(event, normalizedValues.data, toolTipWidth)
          }
          onMouseOut={onMouseOut}
        />
        {/* Max line */}
        <RenderIf validate={max > 1}>
          <TriangleShape
            x={xCenter}
            y={-height}
            width={candlestickWidth}
            widthAdjustment={0.4}
          />
        </RenderIf>
        <RenderIf validate={max <= 1}>
          <line
            x1={xCenter - halfCandlestickWidth}
            y1={maxLineY}
            x2={xCenter + halfCandlestickWidth}
            y2={maxLineY}
            strokeWidth={STROKE_WIDTH}
            stroke={colors.black}
          />
        </RenderIf>
        {/* Center line connecting max and min */}
        <line
          x1={xCenter}
          y1={maxLineY}
          x2={xCenter}
          y2={minLineY}
          strokeWidth={STROKE_WIDTH}
          stroke={colors.black}
        />
        {/* Min line */}
        <line
          x1={xCenter - halfCandlestickWidth}
          y1={minLineY}
          x2={xCenter + halfCandlestickWidth}
          y2={minLineY}
          strokeWidth={STROKE_WIDTH}
          stroke={colors.black}
        />
        {/* Mean center rect */}
        <rect
          x={xCenter - meanRectWidth / 2}
          width={meanRectWidth}
          y={0}
          height={meanRectWidth}
          fill={colors.black}
          onMouseMove={event =>
            onMouseOver(event, normalizedValues.data, toolTipWidth)
          }
          onMouseOut={onMouseOut}
          transform={`translate(0, ${y +
            0.5 * meanRectWidth}) rotate(45, ${xCenter +
            1.2 * meanRectWidth}, 0)`}
        />
      </RenderIf>
    </React.Fragment>
  );
};
