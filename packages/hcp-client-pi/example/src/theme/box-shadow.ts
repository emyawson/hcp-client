import { merge } from 'ramda';

import {
  colorDefault,
  createElevationShadow,
  elevationScaleToShadows,
  getElevationValue,
  zIndexScaleToShadows,
} from './box-shadow.util';

// Create a set of standardized UI element shadows
// Size and depth of the shadow will determined by its elevation
// -- Elevation is this element's depth relative to others onscreen
// -- We create a one-to-one relationship between zIndex and shadow elevation
const createBoxShadowsByElevation = () => {
  const shadowsByZIndex = zIndexScaleToShadows(colorDefault);
  const shadowsByElevation = elevationScaleToShadows(colorDefault);

  return merge(shadowsByZIndex, shadowsByElevation) as {
    [key: string]: string;
  };
};

// Output a box-shadow str with default color: {xOffset} {yOffset} {blurRadius} {color}
export const boxShadows = createBoxShadowsByElevation();

// Output a box-shadow str with custom colour: {xOffset} {yOffset} {blurRadius} {color}
// -- RGBA color values recommended - use helpers in src/domains/diagnostics/styles/color
// -- Depth can be referenced using the modular scale key, ex. "one", "two"
// ---- Or with a key from the z-index scale, such as "modal" or "popover"
export const boxShadow = ({ color = colorDefault, depth = 'base' } = {}) =>
  `${createElevationShadow(getElevationValue(depth), color)}`;
