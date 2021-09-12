import { invertObj } from 'ramda';

// Standardize z-index to avoid conflicts that arise using arbitrary values
export const zIndexScale = {
  hidden: -1,
  base: 0,
  one: 100,
  two: 200,
  three: 300,
  four: 400,
  five: 500,
  six: 600,
  seven: 700,
  eight: 800,
};

// Relative content layers for the application
// This can be extended using values from the scale when new use cases arise
// --------------------------------------------
// Usage:
// -- import { zIndexes } from "src/core";
// -- z-index: ${zIndexes.overlay}
// Note: elements with z-index require a position: [relative | absolute | fixed]
export const zIndexes = {
  hidden: zIndexScale.hidden, // Intentionally position an element below all unpositioned content
  base: zIndexScale.base, // Content that will have other elements layered on top
  foreground: zIndexScale.one, // Position this element on top of standard unpositioned content
  overlay: zIndexScale.two, // Locally scoped headers or overlays, such as graph legends
  popover: zIndexScale.three, // Tooltips and other floating elements
  routeNav: zIndexScale.four, // Left nav, which stays on top when scrolling page
  modal: zIndexScale.five, // Prompts and full page takeovers
  alert: zIndexScale.six, // App-wide messaging that display regardless of page content
};

export const getZIndexScaleByKey = (key: string): string =>
  getZIndexScaleByValue(zIndexes[key]);

export const getZIndexScaleByValue = (value: number): string =>
  invertObj(zIndexScale)[value] || '';
