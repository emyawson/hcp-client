import styled from 'styled-components';
import Select from 'react-select';

import { borderRadius, colors, spacing, transitions } from 'src/core';
import { convertPxToRem } from 'src/utils';

export const DropdownContainer = styled.div`
  display: ${props => (props.borderless ? 'block' : 'inline-block')};
  position: relative;
  cursor: pointer;
  text-align: center;
  flex-grow: 1;
  line-height: normal;
`;

DropdownContainer.displayName = 'DropdownContainer';

const colorBorder = colors.grayLight;
const colorBorderless = colors.clear;
const colorActive = colors.brandBlue;
const textActive = colors.black;
const textDisabled = colors.grayLight;

export const BrandedSelect = styled(Select)`
  .Select-input {
    height: auto;
  }
  .Select-control {
    background-color: ${colors.white};
    border-color: ${props =>
      props.borderless ? colorBorderless : colorBorder};
    border-radius: ${borderRadius.three};
    color: ${textActive};
    font-size: ${props => props.optionFontSize};
    height: ${props => props.selectHeight};
    transition: ${transitions.default};

    &:hover {
      color: ${props => (props.borderless ? colorBorderless : textActive)};
      path {
        fill: ${props => (props.borderless ? colorActive : colors.black)};
      }
    }
  }

  &.Select.is-open > .Select-control {
    border-color: ${props =>
      props.borderless ? colorBorderless : colorBorder};
  }

  .Select-placeholder {
    color: ${textActive};
    transition: ${transitions.default};
  }

  .Select-placeholder,
  .Select-control .Select-value {
    line-height: ${props => props.selectHeight};
    padding-left: ${props => props.selectedOptionPadding};
    padding-right: ${props => props.selectHeight};
    text-align: left;
  }

  .Select-arrow-zone {
    background-color: ${colors.white};
    color: ${colors.grayMedium};
    padding-right: 0;
    transition: ${transitions.default};
    width: ${props => props.selectHeight};

    path {
      transition: ${transitions.default};
    }

    &:hover {
      background-color: ${props =>
        props.borderless ? colorBorderless : colorActive};
      color: ${colors.red};

      path {
        fill: ${props => (props.borderless ? colors.active : colors.white)};
      }
    }
  }

  .Select-menu {
    max-height: 240px;
  }

  .Select-menu-outer {
    border-color: ${colorBorder};
    border-radius: ${borderRadius.three};
    z-index: 20;
    max-height: 250px;
  }

  .Select-noresults {
    padding: 0;
  }

  .Select-option {
    font-size: ${props => props.optionFontSize};
    padding: ${spacing.three};
    text-align: left;
    transition: ${transitions.default};
  }

  .Select-option.is-focused {
    background-color: ${colors.silver};
    border-color: ${colorActive};
    color: ${colors.black};
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
      color: ${props => (props.borderless ? colorActive : colors.white)};

      path {
        fill: ${props => (props.borderless ? colorActive : colors.white)};
      }
    }
  }

  &.Select.is-focused:not(.is-open) {
    & > .Select-control {
      border-color: ${props =>
        props.borderless ? colorBorderless : colorActive};
      box-shadow: none;
      outline: none;
      color: ${props => (props.borderless ? colorActive : colors.black)};
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
      background-color: ${colors.white};
      border-color: ${colors.silver};
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
      border-color: ${colors.silver};
      color: ${colors.silver};

      path {
        fill: ${colors.silver};
      }
    }
    .Select-placeholder {
      color: ${textDisabled};
    }
  }
`;

BrandedSelect.displayName = 'BrandedSelect';
