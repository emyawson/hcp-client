import { merge } from 'ramda';

import {
  createElevationShadow,
  getElevationValue,
  elevationScaleToShadows,
  zIndexScaleToShadows,
  colorDefault,
} from './box-shadow.util';

// Create a set of standardized UI element shadows
// Size and depth of the shadow will determined by its elevation
// -- Elevation is this element's depth relative to others onscreen
// -- We create a one-to-one relationship between zIndex and shadow elevation
const createBoxShadowsByElevation = () => {
  const shadowsByZIndex = zIndexScaleToShadows(colorDefault);
  const shadowsByElevation = elevationScaleToShadows(colorDefault);
  return merge(shadowsByZIndex, shadowsByElevation);
};

// Output a box-shadow str with default color: {xOffset} {yOffset} {blurRadius} {color}
// Usage: import { boxShadows } from "src/core";
// box-shadow: ${boxShadows.one}; OR box-shadow: ${boxShadows.popover};
export const boxShadows = createBoxShadowsByElevation();

// Output a box-shadow str with custom colour: {xOffset} {yOffset} {blurRadius} {color}
// -- RGBA color values recommended - use helpers in src/core/utils/color
// -- Depth can be referenced using the modular scale key, ex. "one", "two"
// ---- Or with a key from the z-index scale, such as "modal" or "popover"
// Usage: import { boxShadow } from "src/core";
// box-shadow: ${boxShadow({ color: "black", depth: "three"})};
export const boxShadow = ({ color = colorDefault, depth = 'base' } = {}) =>
  `${createElevationShadow(getElevationValue(depth), color)}`;
