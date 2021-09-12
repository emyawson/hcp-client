import * as React from 'react';
import Select from 'react-select';
import styled, { StyledComponentClass } from 'styled-components';

import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { convertPxToRem } from '@roche/patterns-indicators/utils/styles';
interface ContainerProps {
  borderless?: boolean;
}

export const DropdownContainer: StyledComponentClass<ContainerProps, IThemeInterface> = styled<ContainerProps, 'div'>('div')`
  display: ${props => (props.borderless ? 'block' : 'inline-block')};
  position: relative;
  cursor: pointer;
  text-align: center;
  flex-grow: 1;
  min-width: 100px;
  line-height: normal;
`;

DropdownContainer.displayName = 'DropdownContainer';

const colorBorder = props => props.theme.colors.grayLight;
const colorBorderless = props => props.theme.colors.clear;
const colorActive = props => props.theme.colors.brandBlue;
const textActive = props => props.theme.colors.black;
const textDisabled = props => props.theme.colors.grayLight;

export const createStyledReactComponent = <Props extends {}>(
  component: React.ComponentType<Props>,
) => styled<Props>(component);

export const BrandedSelect: StyledComponentClass<{}, IThemeInterface> = createStyledReactComponent<any>(Select)`
  .Select-input {
    height: auto;
  }
  .Select-control {
    background-color: ${props => props.theme.colors.white};
    border-color: ${props =>
      props.borderless ? colorBorderless : colorBorder};
    border-radius: ${props => props.theme.borderRadius.three};
    color: ${textActive};
    font-size: ${props => props.optionFontSize};
    height: ${props => props.selectHeight};
    transition: ${props => props.theme.transitions.default};

    &:hover {
      color: ${props => (props.borderless ? colorBorderless : textActive)};
      path {
        fill: ${props => (props.borderless ? colorActive : textActive)};
      }
    }
  }

  &.Select.is-open > .Select-control {
    border-color: ${props =>
      props.borderless ? colorBorderless : colorBorder};
  }

  .Select-placeholder {
    color: ${textActive};
    transition: ${props => props.theme.transitions.default};
  }

  .Select-placeholder,
  .Select-control .Select-value {
    line-height: ${props => props.selectHeight};
    padding-left: ${props => props.selectedOptionPadding};
    padding-right: ${props => props.selectHeight};
    text-align: left;
  }

  .Select-arrow-zone {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.grayMedium};
    padding-right: 0;
    transition: ${props => props.theme.transitions.default};
    width: ${props => props.selectHeight};

    path {
      transition: ${props => props.theme.transitions.default};
    }

    &:hover {
      background-color: ${props =>
        props.borderless ? colorBorderless : colorActive};
      color: ${props => props.theme.colors.red};

      path {
        fill: ${props =>
          props.borderless ? colorActive : props.theme.colors.white};
      }
    }
  }

  .Select-menu {
    max-height: 240px;
  }

  .Select-menu-outer {
    border-color: ${colorBorder};
    border-radius: ${props => props.theme.borderRadius.three};
    z-index: 20;
    max-height: 250px;
  }

  .Select-option {
    font-size: ${props => props.optionFontSize};
    padding: ${props => props.theme.spacing.three};
    text-align: left;
    transition: ${props => props.theme.transitions.default};
  }

  .Select-option.is-focused {
    background-color: ${props => props.theme.colors.silver};
    border-color: ${colorActive};
    color: ${textActive};
  }

  .Select-option.is-selected {
    background-color: transparent;
    border-left: ${convertPxToRem(3)} solid ${colorActive};
    color: ${colorActive};
  }

  &.Select.is-open {
    .Select-arrow-zone {
      background-color: ${props =>
        props.borderless ? colorBorderless : colorActive};
      color: ${props =>
        props.borderless ? colorActive : props.theme.colors.white};

      path {
        fill: ${props =>
          props.borderless ? colorActive : props.theme.colors.white};
      }
    }
  }

  &.Select.is-focused:not(.is-open) {
    & > .Select-control {
      border-color: ${props =>
        props.borderless ? colorBorderless : colorActive};
      box-shadow: none;
      outline: none;
      color: ${props =>
        props.borderless ? colorActive : props.theme.colors.black};
    }

    .Select-arrow-zone {
      border-color: ${colorActive};
      color: ${colorActive};

      path {
        fill: ${colorActive};
      }
    }
  }

  &.Select.is-disabled {
    > .Select-control {
      background-color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.silver};
    }
    &.Select.has-value.Select--single
      > .Select-control
      .Select-value
      .Select-value-label,
    &.Select.has-value.is-pseudo-focused.Select--single
      > .Select-control
      .Select-value
      .Select-value-label {
      color: ${textDisabled};
    }
    .Select-arrow-zone {
      border-color: ${props => props.theme.colors.silver};
      color: ${props => props.theme.colors.silver};

      path {
        fill: ${props => props.theme.colors.silver};
      }
    }
    .Select-placeholder {
      color: ${textDisabled};
    }
  }
`;

BrandedSelect.displayName = 'BrandedSelect';
