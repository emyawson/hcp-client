import { path, map, pipe, reject, isNil, head } from 'ramda';

import { spacing } from 'src/domains/diagnostics/styles';
import { combineRems } from 'src/domains/diagnostics/utils/rem-calc';

const toCardStyleProperty = (property, styles) => cardStyle =>
  path([cardStyle, property], styles);
const removeUndefinedStyles = pipe(
  reject(isNil),
  head,
);
const emptyStyleProperty = '';
const findStyleToUse = (styles, property, props) =>
  pipe(
    map(toCardStyleProperty(property, styles)),
    removeUndefinedStyles,
  )([...props.cardStyles, 'default']);

// import mapCardStyle to where you want to map styles
// pass it an object of styles (make sure to include default) like:
//
// {
//   default: {
//     color: "#000",
//     borderBottomColor: "red"
//   },
//   secondary: {
//     color: "blue",
//     marginLeft: "3rem"
//   }
// }
//
// Then use the returned function util in styled components (see card-header.style.js for an example)
// The way the css property value is determined:
// - if property specified (via props), return that value
// - go through the specified card styles (passed as array cardStyles) to find the styles that match the property
// - if there are none, go with default
// - if there are more than one, take the style of the first card style
// - if there's no default, return empty value
//
// This allows for composable cardStyles (ex. noPadding + blue)
// The card base and header can be imported and used separately as well (do not have to use card component)
export const mapCardStyle = styles => property => props =>
  props[property] ||
  findStyleToUse(styles, property, props) ||
  emptyStyleProperty;

export const cardPadding = {
  none: 0,
  default: spacing.three,
  medium: combineRems(spacing.one, spacing.three),
  large: spacing.four,
};
