type RGB = {
  r: number;
  g: number;
  b: number;
};

// Lighten or darken a hex colour value
// Positive percent value will lighten, negative to darken
// Repurposed from https://gist.github.com/renancouto/4675192
export const blendHexColor = (color: string, percent: number): string => {
  const sanitizedColor = color.replace('#', '');
  const num = parseInt(sanitizedColor, 16);
  const amt = Math.round(2.55 * percent);
  // tslint:disable-next-line
  const R = (num >> 16) + amt;
  // tslint:disable-next-line
  const B = ((num >> 8) & 0x00ff) + amt;
  // tslint:disable-next-line
  const G = (num & 0x0000ff) + amt;

  const blendedColor = (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1);
  return `#${blendedColor}`;
};

// Convert hex colour string to { r, g, b } values object
// From: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const hexToRgb = (hex: string): RGB => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
};

// Convert hex colour string to RGB colour string
export const hexToRgbString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

// Convert RGB object and opacity value to CSS-compatible RGBA
export const formatRGBA = ({ r, g, b }: RGB, alpha: number): string =>
  `rgba(${r}, ${g}, ${b}, ${alpha})`;

// Convert hex colour string and opacity value to CSS-compatible RGBA
export const hexToRGBA = (color: string, alpha: number): string =>
  formatRGBA(hexToRgb(color), alpha);
