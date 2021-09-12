import { colors } from 'src/domains/diagnostics/styles';

export const getBorder = border => {
  if (!border) {
    return 'none';
  }

  // TODO - remove "thick" prop use color instead
  const { color, size, thick } = border;
  const borderSize = size ? size : '0.0625rem';

  if (!thick) {
    return `${borderSize} solid ${color ? color : colors.silverDark}`;
  }
  return `${borderSize} solid ${color ? color : colors.grayLight}`;
};
