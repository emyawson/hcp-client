import { isNil, pickBy } from 'ramda';
import React from 'react';
import { LabelSeries, XAxis, YAxis } from 'react-vis';

import {
  TARGET_RANGE_MAX_TICK_KEY,
  TARGET_RANGE_MIN_TICK_KEY,
  THRESHOLD_TICK_KEY,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';

export const renderAxes = (axes, flexibleHeight) =>
  axes.map(axis => {
    const componentProps = pickBy(
      (value, key) => key !== 'name' && key !== 'type' && !isNil(value),
      axis,
    );

    switch (axis.type) {
      case 'x':
        return <XAxis {...componentProps} key={axis.name} />;
      case 'y':
        if (axis.name === 'y-axis-left-1' && !flexibleHeight) {
          componentProps.tickValues = [0, 400];
        }
        return <YAxis {...componentProps} key={axis.name} />;
      default:
        return null;
    }
  });

export const renderAxisLabels = (axisLabels, graphHeight) => {
  const adjustedAxisLabels = axisLabels.map(axisLabel =>
    axisLabel.map(axisObj => ({
      ...axisObj,
      yOffset: -(graphHeight / 2) + axisObj.yOffset,
    })),
  );

  return adjustedAxisLabels.map(axisLabel => (
    <LabelSeries data={axisLabel} key={axisLabel[0].label.trim()} />
  ));
};

// This is for use by the graph components built with the graphing library in /lib
export const filterVerticalTicksForViewAndVisibilityTolerance = (
  verticalTicks,
  flexibleHeight,
  threshold,
  targetRange,
  Y_AXIS_TICK_VISIBILITY_TOLERANCE,
  ceiling,
) =>
  !flexibleHeight
    ? verticalTicks.filter(
        tick =>
          tick.key === THRESHOLD_TICK_KEY ||
          tick.key === TARGET_RANGE_MAX_TICK_KEY ||
          tick.key === TARGET_RANGE_MIN_TICK_KEY ||
          tick.label === '0' ||
          tick.label === ceiling.toString(),
      )
    : verticalTicks.filter(
        tick =>
          tick.key === TARGET_RANGE_MAX_TICK_KEY ||
          tick.key === THRESHOLD_TICK_KEY ||
          (tick.key === TARGET_RANGE_MIN_TICK_KEY &&
            targetRange.data.min - threshold.data.value >
              Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
            targetRange.data.max - targetRange.data.min >
              Y_AXIS_TICK_VISIBILITY_TOLERANCE) ||
          (Math.abs(tick.label - targetRange.data.max) >
            Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
            Math.abs(tick.label - targetRange.data.min) >
              Y_AXIS_TICK_VISIBILITY_TOLERANCE &&
            Math.abs(tick.label - threshold.data.value) >
              Y_AXIS_TICK_VISIBILITY_TOLERANCE),
      );
