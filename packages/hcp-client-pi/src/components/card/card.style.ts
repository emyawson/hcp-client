import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

interface CardDivProps {
  borderColor?: string;
}

export const CardDiv: StyledComponentClass<CardDivProps, IThemeInterface> = styled<CardDivProps, 'div'>('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.four};
  box-shadow: ${props => props.theme.boxShadows.two};
  border: 1px solid ${props => props.theme.colors.silverDark};
`;
