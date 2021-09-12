import * as React from 'react';
import { colors } from 'src/core/styles/colors';
import { createStyledComponent } from 'src/utils';
import { convertPxToRem } from 'src/utils';

import { SharedInputBaseStyles } from '../input.style';

import { InputDropdownProps } from './input-dropdown.types';

const colorBorder = colors.silverDark;
const colorActive = colors.brandBlue;
const textActive = colors.black;
const textDisabled = colors.silverDark;
const selectHeight = convertPxToRem(48);

export const styleDropdownInput = (
  DropdownComponent: React.StatelessComponent<InputDropdownProps>,
) => createStyledComponent<any, InputDropdownProps>(DropdownComponent)`
  .Select-input {
    height: auto;
  }
  .Select-control {
    ${SharedInputBaseStyles};
    height: ${selectHeight};

    border-color: ${({ hasError, theme }) =>
      hasError ? theme.colors.trafficRed : ''};

    &:hover {
      color: ${textActive};
      path {
        fill: ${colors.black};
      }
    }
  }

  &.Select.is-open > .Select-control {
    border-color: ${colorBorder};
  }

  .Select-placeholder {
    color: ${({ hasError, theme }) =>
      hasError ? theme.colors.trafficRed : textActive};
    transition: ${({ theme }) => theme.transitions.default};
  }

  .Select-placeholder,
  .Select-control .Select-value,
  &.Select--single > .Select-control .Select-value {
    line-height: ${selectHeight};
    padding-left: ${({ theme }) => theme.spacing.three};
    padding-right: ${selectHeight};
    text-align: left;
  }

  .Select-control > *:last-child {
    padding-right: 0;
  }

  .Select-arrow-zone {
    background-color: ${colors.white};
    color: ${colors.grayMedium};
    padding-right: 0;
    transition: ${({ theme }) => theme.transitions.default};
    width: ${({ theme }) => theme.spacing.four};

    path {
      transition: ${({ theme }) => theme.transitions.default};
    }

    &:hover {
      background-color: ${colorActive};

      path {
        fill: ${colors.white};
      }
    }
  }

  .Select-menu-outer {
    border-color: ${colorBorder};
    ${({ theme }) => theme.borderRadius[0]};
    z-index: 20;
  }

  .Select-option {
    font-size: ${({ theme }) => theme.fontSize.p};
    padding: ${({ theme }) => theme.spacing.three};
    text-align: left;
    transition: ${({ theme }) => theme.transitions.default};
  }

  .Select-option.is-focused {
    background-color: ${colors.silverMedium};
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
      background-color: ${colorActive};
      color: ${colors.white};

      path {
        fill: ${colors.white};
      }
    }
  }

  &.Select.is-focused:not(.is-open) {
    & > .Select-control {
      border-color: ${colorActive};
      box-shadow: none;
      outline: none;
      color: ${colors.black};
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
      border-color: ${colors.silverMedium};
    }
    &.Select.has-value.Select--single > .Select-control .Select-value .Select-value-label,
    &.Select.has-value.is-pseudo-focused.Select--single
      > .Select-control
      .Select-value
      .Select-value-label {
      color: ${textDisabled};
    }
    .Select-arrow-zone {
      border-color: ${colors.silverMedium};
      color: ${colors.silverMedium};

      path {
        fill: ${colors.silverMedium};
      }
    }
    .Select-placeholder {
      color: ${textDisabled};
    }
  }
`;
