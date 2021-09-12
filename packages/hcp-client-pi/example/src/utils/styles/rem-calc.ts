// Decorate a number with the "rem" unit of measurement
export const addRemUnit = (value: number): string => `${value}rem`;

// Remove a unit of measurement (rem, em, px) from a number
export const stripUnit = (value): number =>
  value ? parseFloat(value.toString().replace(/[^\d.-]/g, '')) : 0;

// Convert a font size in px to rems
// Default to unitless 0 if not available
export const convertPxToRem = BASE_FONT_SIZE => (
  value,
  base: number = BASE_FONT_SIZE,
): string | number => {
  return stripUnit(value) ? addRemUnit(stripUnit(value) / base) : 0;
};
