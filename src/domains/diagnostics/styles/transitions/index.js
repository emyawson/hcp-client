// Scale this initial value with a 1.2x modular step
const transitionSpeedBase = 187.5;

// Basic speeds provided should cover length of most common transitions
// Custom speeds can be added below with a descriptive name
// As a general rule, speeds should not exceed 400ms at risk of sluggish UI
// Example use in styled component:
// -- transition-duration: ${transitionSpeed.default};
export const transitionSpeed = {
  fast: `${transitionSpeedBase}ms`, // 187.5ms
  default: `${transitionSpeedBase * 1.2}ms`, // 225ms
  medium: `${transitionSpeedBase * 1.44}ms`, // 270ms
  slow: `${transitionSpeedBase * 1.728}ms`, // 324ms
};

// Transition elements smoothly from A to B along a motion curve
// Example use in styled component:
// -- transition-timing-function: ${transitionSpeed.default};
export const transitionEasing = {
  default: 'cubic-bezier(.4, 0, .2, 1)', // Quickly accelerate, slowly decelerate
  enter: 'cubic-bezier(0, 0, .2, 1)', // Decelerate as items enter screen
  exit: 'cubic-bezier(.4, 0, 1, 1)', // Accelerate as elements exit screen
};

// Combine speeds and easing curves into an easy CSS definition
// Example use in styled component:
// -- transition: ${transitions.default};
export const transitions = {
  default: `all ${transitionSpeed.default} ${transitionEasing.default}`,
  fast: `all ${transitionSpeed.fast} ${transitionEasing.default}`,
  medium: `all ${transitionSpeed.medium} ${transitionEasing.default}`,
  slow: `all ${transitionSpeed.slow} ${transitionEasing.default}`,
  enter: `all ${transitionSpeed.default} ${transitionEasing.enter}`, // Fly elements on screen
  exit: `all ${transitionSpeed.fast} ${transitionEasing.exit}`, // Drop items off screen
};

// ** If you experience buggy animations: **
// - note that this definition will attempt to transition ALL changed CSS rules
// - if there CSS properties that do not need transitions,
// - fall back to individual easing/speed rules and specify transition properties
// Example:
// -- transition-duration: ${transitionSpeed.default};
// -- transition-property: border, color;
// -- transition-timing-function: ${transitionEasing.default};
