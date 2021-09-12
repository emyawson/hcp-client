import styled from 'styled-components';
import { space } from 'styled-system';
import { path } from 'ramda';

import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  spacing,
  transitions,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { convertPxToRem, combineRems } from 'src/domains/diagnostics/utils';

const {
  brandBlue,
  brandBlueDark,
  grayLight,
  silver,
  transparent,
  white,
} = colors;

// Set button theming
// Multiple themes ill be mapped to one styled component below
const buttonMap = {
  primary: {
    always: {
      padding: `${combineRems(spacing.one, spacing.two)} ${spacing.four}`,
    },
    default: {
      bg: brandBlue,
      border: brandBlue,
      text: white,
      boxShadow: 'none',
    },
    hover: {
      bg: brandBlue,
      border: brandBlue,
      text: white,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
    disabled: {
      bg: silver,
      border: silver,
      text: grayLight,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
  },
  secondary: {
    always: {
      padding: `${combineRems(spacing.one, spacing.two)} ${spacing.four}`,
    },
    default: {
      bg: transparent,
      border: brandBlue,
      text: brandBlue,
      boxShadow: 'none',
    },
    hover: {
      bg: transparent,
      border: brandBlueDark,
      text: brandBlueDark,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
    disabled: {
      bg: transparent,
      border: silver,
      text: grayLight,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
  },
  info: {
    always: {
      padding: `${combineRems(spacing.one, spacing.two)} ${spacing.two}`,
    },
    default: {
      bg: white,
      border: white,
      text: brandBlue,
      boxShadow: boxShadow({ depth: 'one', color: colors.black }),
    },
    hover: {
      bg: white,
      border: white,
      text: brandBlueDark,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
    disabled: {
      bg: white,
      border: white,
      text: grayLight,
      boxShadow: boxShadow({ depth: 'two', color: colors.black }),
    },
  },
};

export const BaseButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: ${convertPxToRem(2)} solid currentColor;
  border-radius: ${borderRadius.hundred};
  cursor: ${props =>
    props.loading || props.disabled ? 'not-allowed' : 'pointer'};
  display: inline-block;
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  line-height: 0.85em;
  max-width: 100%;
  min-width: 9.75rem;
  padding: ${props =>
    path([props.buttonStyle, 'always', 'padding'], buttonMap)};
  pointer-events: ${props =>
    props.loading || props.disabled ? 'none' : 'auto'};
  transition: ${transitions.default};
  ${space};
  &:focus {
    outline: none;
  }
`;

// Create dynamic button styling based on props
export const BrandButton = BaseButton.extend`
  background-color: ${props =>
    path([props.buttonStyle, 'default', 'bg'], buttonMap)};
  border-color: ${props =>
    path([props.buttonStyle, 'default', 'border'], buttonMap)};
  color: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};
  font-size: ${props => props.fontSize};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'capitalize')};
  font-weight: ${props => weight[props.fontWeight]};
  min-width: ${props => props.minWidth};
  box-shadow: ${props =>
    path([props.buttonStyle, 'default', 'boxShadow'], buttonMap)};

  path {
    fill: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};
  }
  circle {
    fill: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};
    & + path {
      fill: ${props => path([props.buttonStyle, 'default', 'bg'], buttonMap)};
    }
  }

  &:hover,
  &:focus {
    background-color: ${props =>
      path([props.buttonStyle, 'hover', 'bg'], buttonMap)};
    border-color: ${props =>
      path([props.buttonStyle, 'hover', 'border'], buttonMap)};
    box-shadow: ${props =>
      path([props.buttonStyle, 'hover', 'boxShadow'], buttonMap)};
    color: ${props => path([props.buttonStyle, 'hover', 'text'], buttonMap)};

    path {
      fill: ${props => path([props.buttonStyle, 'hover', 'text'], buttonMap)};
    }
    circle {
      fill: ${props => path([props.buttonStyle, 'hover', 'text'], buttonMap)};
      & + path {
        fill: ${props => path([props.buttonStyle, 'hover', 'bg'], buttonMap)};
      }
    }
  }

  &:active {
    background-color: ${props =>
      path([props.buttonStyle, 'default', 'bg'], buttonMap)};
    border-color: ${props =>
      path([props.buttonStyle, 'default', 'border'], buttonMap)};
    box-shadow: ${props =>
      path([props.buttonStyle, 'hover', 'boxShadow'], buttonMap)};
    color: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};

    path {
      fill: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};
    }
    circle {
      fill: ${props => path([props.buttonStyle, 'default', 'text'], buttonMap)};
      & + path {
        fill: ${props => path([props.buttonStyle, 'default', 'bg'], buttonMap)};
      }
    }
  }

  &[disabled] {
    background-color: ${props =>
      path([props.buttonStyle, 'disabled', 'bg'], buttonMap)};
    border-color: ${props =>
      path([props.buttonStyle, 'disabled', 'border'], buttonMap)};
    color: ${props => path([props.buttonStyle, 'disabled', 'text'], buttonMap)};

    path {
      fill: ${props =>
        path([props.buttonStyle, 'disabled', 'text'], buttonMap)};
    }
    circle {
      fill: ${props =>
        path([props.buttonStyle, 'disabled', 'text'], buttonMap)};
      & + path {
        fill: ${props =>
          path([props.buttonStyle, 'disabled', 'bg'], buttonMap)};
      }
    }
  }
`;

BrandButton.defaultProps = {
  buttonStyle: 'primary',
};

export const ButtonTextSpan = styled.span``;

export const ButtonIconSpan = styled.span`
  svg {
    height: ${fontSize.subheading};
  }
  & + ${ButtonTextSpan} {
    padding-left: ${spacing.two};
  }
`;

export const ButtonContentSpan = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const ButtonIconColor = (
  buttonStyle: ButtonStyles,
  isDisabled: boolean,
): string => {
  const buttonState = isDisabled ? 'disabled' : 'default';
  return path([buttonStyle, buttonState, 'text'], buttonMap);
};

export const ButtonLoadingIconSpan = styled.span`
  padding-left: ${spacing.two};
`;
