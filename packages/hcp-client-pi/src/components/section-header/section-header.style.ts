import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import { combineRems } from '@roche/patterns-indicators/utils/styles/rem-calc';
import { hasValue } from '@roche/patterns-indicators/utils/validation/validation.utils';
import { StyledComponentClass } from 'styled-components';

interface SectionHeaderDivProps {
  bottomMargin: string;
}

export const SectionHeaderDiv: StyledComponentClass<SectionHeaderDivProps, IThemeInterface> = styled<SectionHeaderDivProps, 'div'>('div')`
  margin: 0 auto
    ${props =>
      hasValue(props.bottomMargin)
        ? props.bottomMargin
        : props.theme.spacing.four};
  width: 100%;
`;

interface SectionHeaderHeadlineProps {
  bottomMarginHeadline: string;
  children?: string | JSX.Element;
  textColor: string;
}
export const SectionHeaderHeadline: StyledComponentClass<SectionHeaderHeadlineProps, IThemeInterface> = styled<SectionHeaderHeadlineProps, 'h5'>(
  'h5',
)`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights};
  margin: 0;
  margin: 0 auto
    ${props =>
      hasValue(props.bottomMarginHeadline)
        ? props.bottomMarginHeadline
        : combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  color: ${props =>
    props.textColor ? props.textColor : props.theme.colors.charcoal};
`;
