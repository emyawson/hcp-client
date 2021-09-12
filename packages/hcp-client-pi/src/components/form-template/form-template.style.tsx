import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import * as React from 'react';
import { StyledComponentClass } from 'styled-components';

import { createStyledComponent } from '../../dashboards/advanced-indicators/scenes/advanced-indicators.style';
import { convertPxToRem } from '../../utils/styles';

export const PatternContent: StyledComponentClass<{}, IThemeInterface> = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.five};
  margin-top: ${({ theme }) => theme.spacing.five};
`;

type InputContentProps = {
  error?: boolean;
  type?: string;
  name?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
};

export const InputContent: StyledComponentClass<InputContentProps, IThemeInterface> = createStyledComponent('input', { error: false })`
  border: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('1px')} solid
    ${({ theme, error }) =>
      error ? theme.colors.red : theme.colors.grayLight};
  border-radius: ${({ theme }) => theme.borderRadius[0]};
  color: ${({ theme, error }) =>
    error ? theme.colors.red : theme.colors.black};
  font-size: ${({ theme }) => theme.BASE_FONT_SIZE};
  height: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('55px')};
  padding: ${({ theme }) => theme.spacing.three};
  margin: auto ${({ theme }) => theme.spacing.two};
  outline: none;
  text-align: center;
  width: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('70px')};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type DropdownContentProps = {
  name?: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  defaultValue?: string[] | string;
};

export const DropdownContent: StyledComponentClass<DropdownContentProps, IThemeInterface> = styled.select`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('1px')} solid
    ${({ theme }) => theme.colors.grayLight};
  border-radius: ${({ theme }) => theme.borderRadius[0]};
  font-size: ${({ theme }) => theme.BASE_FONT_SIZE};
  height: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('50px')};
  margin: auto ${({ theme }) => theme.spacing.two};
  outline: none;
  padding: ${({ theme }) => theme.spacing.two}
    ${({ theme }) => theme.spacing.three};

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const RadioContent: StyledComponentClass<{}, IThemeInterface> = styled.div`
  display: inline;
  position: relative;
  padding-left: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('35px')};
  margin-left: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('25px')};
  margin-right: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('30px')};
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  & .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('25px')};
    width: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('25px')};
    background-color: ${({ theme }) => theme.colors.grayLight};
    border-radius: 50%;
  }

  & input:checked ~ .checkmark {
    border: ${({ theme }) =>
      `${convertPxToRem(theme.BASE_FONT_SIZE)('1px')} solid ${
        theme.colors.brandBlue
      }`};
    background-color: ${({ theme }) => theme.colors.white};
  }

  & .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    top: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('2px')};
    left: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('2px')};
    border-radius: 100%;
    background: ${({ theme }) => theme.colors.brandBlue};
    width: 80%
    height: 80%;
  }
`;
