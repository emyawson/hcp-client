import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

interface BannerDivProps {
  backgroundColor?: string;
}

export const BannerDiv: StyledComponentClass<BannerDivProps, IThemeInterface> = styled<BannerDivProps, 'div'>('div')`
  background-color: ${props => props.theme.colors.blueMarine};
  border-radius: ${props => props.theme.borderRadius[1]};
  color: ${props => props.theme.colors.white};
  padding: 1em ${props => props.theme.spacing.four};
  text-align: center;
  width: 100%;
`;

export const BannerP: StyledComponentClass<{}, IThemeInterface> = styled<{}, 'p'>('p')`
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1;
  margin: 0 auto;
`;
