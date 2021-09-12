import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { convertPxToRem } from '@roche/patterns-indicators/utils/styles/rem-calc';
import styled, { StyledComponentClass } from 'styled-components';

import { P } from '../fonts';
import { ControlCheckbox } from '../forms';

const paddingRatio = 1 / 12;
const bgColorsByState = colors => ({
  disabled: colors.silver,
  active: colors.brandBlue,
  focused: colors.blueMarine,
});

export const ToggleSwitchWrapperLabel: StyledComponentClass<{ htmlFor?: string }, IThemeInterface> = styled.label``;

export const ToggleSwitchP: StyledComponentClass<{}, IThemeInterface> = P.extend`
  color: ${({ theme }) => theme.colors.charcoal};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin: 0 0 ${({ theme }) => theme.spacing.three};
`;

interface ToggleSwitchContainerSpanProps {
  size: number;
}

export const ToggleSwitchContainerSpan: StyledComponentClass<ToggleSwitchContainerSpanProps, IThemeInterface> = styled<
  ToggleSwitchContainerSpanProps,
  'span'
>('span')`
  background-color: ${({ theme }) => bgColorsByState(theme.colors).disabled};
  border-color: ${({ theme }) => theme.colors.clear};
  border-radius: ${({ theme }) => theme.borderRadius[3]};
  border-style: solid;
  border-width: ${({ size, theme }) =>
    convertPxToRem(theme.BASE_FONT_SIZE)(size * paddingRatio)};
  box-sizing: content-box;
  cursor: pointer;
  display: block;
  transition: ${({ theme }) => theme.transitions.default};
  width: ${({ size, theme }) => convertPxToRem(theme.BASE_FONT_SIZE)(size * 2)};
`;

export interface ToggleSwitchIndicatorSpan {
  size: number;
}

export const ToggleSwitchIndicatorSpan: StyledComponentClass<ToggleSwitchIndicatorSpan, IThemeInterface> = styled<
  ToggleSwitchIndicatorSpan,
  'span'
>('span')`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[5]};
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
  display: block;
  height: ${({ size, theme }) => convertPxToRem(theme.BASE_FONT_SIZE)(size)};
  transition: ${({ theme }) => theme.transitions.exit};
  transform: translate(0, 0);
  will-change: transform;
  width: ${({ size, theme }) => convertPxToRem(theme.BASE_FONT_SIZE)(size)};
`;

export interface ToggleSwitchInputProps {
  checked?: boolean;
  modelPath: string;
  onChange?: () => void;
  type?: string;
  id?: string;
  disabled?: boolean;
  onKeyPress?: (e: any) => void;
}

export const ToggleSwitchInput: StyledComponentClass<ToggleSwitchInputProps, IThemeInterface> = styled<ToggleSwitchInputProps, 'input'>(
  'input',
)`
  position: absolute;
  opacity: 0;

  &:checked + ${ToggleSwitchContainerSpan} {
    background-color: ${({ theme }) => bgColorsByState(theme.colors).active};

    & ${ToggleSwitchIndicatorSpan} {
      transform: translateX(100%);
      transition: ${({ theme }) => theme.transitions.enter};
    }
  }

  &:not(:checked) {
    background-color: black;
  }
`;

export const ToggleSwitchControl = ToggleSwitchInput.withComponent(
  ControlCheckbox,
);
