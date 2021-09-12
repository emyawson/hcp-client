import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

interface KeylineHrProps {
  fillColor: string;
}

export const KeylineHr: StyledComponentClass<KeylineHrProps, IThemeInterface> = styled<KeylineHrProps, 'hr'>('hr')`
  border: 0;
  border-bottom: 1px solid
    ${props =>
      props.fillColor ? props.fillColor : props.theme.colors.grayLight};
  display: block;
  width: 100%;
`;
