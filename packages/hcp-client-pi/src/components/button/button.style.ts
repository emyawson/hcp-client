import {
  createStyledComponent,
  IThemeInterface,
} from '@roche/patterns-indicators/theme';
import { combineRems } from '@roche/patterns-indicators/utils';
import * as React from 'react';
import { StyledComponentClass } from 'styled-components';

interface BaseButtonProps {
  type: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const BaseButton: StyledComponentClass<BaseButtonProps, IThemeInterface>  = createStyledComponent<'button', BaseButtonProps>(
  'button',
)`
  border-radius: ${props => props.theme.borderRadius[4]};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  cursor: pointer;
  color: ${props => {
    if (props.type === 'secondary') {
      if (props.disabled === true) {
        return props.theme.colors.gray;
      } else {
        return props.theme.colors.blue;
      }
    }
    return props.theme.colors.white; // primary always white
  }};
  background-color: ${props => {
    if (props.type === 'primary') {
      if (props.disabled === false) {
        return props.theme.colors.blue;
      } else {
        return props.theme.colors.gray;
      }
    }
    return props.theme.colors.clear; // secondary always clear
  }};
  border: 0.125rem solid transparent;
  padding: ${props => props.theme.spacing.two};
  padding: ${props =>
    `${combineRems(props.theme.spacing.one, props.theme.spacing.two)} ${
      props.theme.spacing.four
    }`};
  appearance: none;
  display: inline-block;
  font-size: ${props => props.theme.fontSize.p};
  line-height: 0.85em;
  max-width: 100%;
  min-width: 9.75rem;
  transition: ${props => props.theme.transitions.default};
    
  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: ${props =>
      props.type === 'primary' && props.disabled === false
        ? props.theme.boxShadow({
            depth: 'two',
            color: props.theme.colors.black,
          })
        : 'none'};  
    text-decoration: ${props =>
      props.type === 'secondary' ? 'underline' : 'none'};
  }
  `;
