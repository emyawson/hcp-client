import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

interface ButtonProps {
  children?: any;
  key?: any;
  active?: boolean;
  onClick: (e: any) => void;
}

export const Button: StyledComponentClass<
  ButtonProps,
  IThemeInterface
> = styled<ButtonProps, 'button'>('button')`
  height: 2.25rem;
  font-size: ${props => props.theme.fontSize.p};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  background: ${props =>
    props.active ? props.theme.colors.blueMarineAlpha5 : 'none'};
  color: ${props =>
    props.active ? props.theme.colors.brandBlue : props.theme.colors.charcoal};
  border: 1px solid ${props => props.theme.colors.silverDark};
  border-left-style: hidden;

  &:first-child {
    border-left-style: solid;
    border-top-left-radius: ${props => props.theme.borderRadius[0]};
    border-bottom-left-radius: ${props => props.theme.borderRadius[0]};
  }

  &:last-child {
    border-top-right-radius: ${props => props.theme.borderRadius[0]};
    border-bottom-right-radius: ${props => props.theme.borderRadius[0]};
  }
`;
