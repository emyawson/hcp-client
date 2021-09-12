const transformScaleBase = 5;
export const transformScale = {
  one: transformScaleBase, // 5
  two: transformScaleBase * 2, // 10
  three: transformScaleBase * 4, // 20
  four: transformScaleBase * 8, // 40
  five: transformScaleBase * 16, // 80
  quarter: 25,
  half: 50,
  full: 100,
};

export const opacityScale = {
  hidden: 0,
  disabled: 0.25,
  default: 1,
};

// Convert values from the transform scale for use in transformations
export const toPercentage = (value: number): number => value / 100;
export const toPercentageStr = (value: number): string => `${value}%`;
