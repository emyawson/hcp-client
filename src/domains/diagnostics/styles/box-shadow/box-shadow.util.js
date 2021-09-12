import { map } from 'ramda';

import { convertPxToRem } from 'src/domains/diagnostics/utils/rem-calc';
import { hexToRGBA } from 'src/domains/diagnostics/utils/color';

import { colors } from '../colors';
import {
  getZIndexScaleByKey,
  getZIndexScaleByValue,
  zIndexes,
} from '../z-index';

// Set relative depth between elements on the scale
// Used to calculate shadow sizing on render
export const elevationScale = {
  base: 1,
  one: 2,
  two: 3,
  three: 4,
  four: 6,
  five: 8,
  six: 9,
  seven: 12,
  eight: 16,
  nine: 24,
};

export const colorDefault = colors.grayMedium;

// Return a hex color with alpha opacity applied, for use in shadow system
// If color already contains RGBA formatting, return as is
const shadowColor = (
  color: string = colorDefault,
  opacity: number = 0.15,
): string => {
  const isAlpha = color.indexOf('rgba') > -1;
  if (!isAlpha) {
    return hexToRGBA(color, opacity);
  }
  return color;
};

// Set varying opacity on element shadows depending on Z distance
const alphaMap = {
  edge: 0.2,
  depth: 0.14,
  drop: 0.12,
};

// Draw a standard shadow, indication of depth between this element and the next
const depthShadow = (
  elevation: number,
  color: string = shadowColor(colorDefault, alphaMap.depth),
) =>
  `0 ${convertPxToRem(elevation)} ${convertPxToRem(
    Math.floor(elevation * 1.5),
  )} ${convertPxToRem(Math.ceil(elevation / 8))} ${color}`;

// Draw a distant shadow with a large radius
const dropShadow = (
  elevation: number,
  color: string = shadowColor(colorDefault, alphaMap.drop),
) =>
  `0 ${convertPxToRem(Math.floor(elevation * 0.375))} ${convertPxToRem(
    elevation * 2 - 2,
  )} ${convertPxToRem(Math.floor(elevation / 3))} ${color}`;

// Draw a close shadow with a more defined edge
const edgeShadow = (
  elevation: number,
  color: string = shadowColor(colorDefault, alphaMap.edge),
) =>
  `0 ${convertPxToRem(Math.ceil(elevation / 2))} ${convertPxToRem(
    Math.floor(elevation / 1.5),
  )} 0 ${color}`;

// Combine all three shadow definitions into one
export const createElevationShadow = (
  elevation: number = 0,
  color: string = colorDefault,
) =>
  `${depthShadow(elevation, shadowColor(color, alphaMap.depth))},
  ${dropShadow(elevation, shadowColor(color, alphaMap.drop))},
  ${edgeShadow(elevation, shadowColor(color, alphaMap.edge))}`;

// Helper method, allowing developers to pass in a value from:
// - scale system, ex. "one", "two"
// - z-index named values, ex. "modal", "popover"
export const getElevationValue = (elevation: string): number =>
  elevationScale[elevation] ||
  elevationScale[getZIndexScaleByKey(elevation)] ||
  0;

// Create a keyed list of box-shadows based on the elevation scale defined above
export const elevationScaleToShadows = (color: string) =>
  map(value => createElevationShadow(value, color), elevationScale);

// Create a keyed list of box-shadows, with elevation tied to their z-index
export const zIndexScaleToShadows = (color: string) =>
  map(
    value =>
      createElevationShadow(
        elevationScale[getZIndexScaleByValue(value)],
        color,
      ),
    zIndexes,
  );
