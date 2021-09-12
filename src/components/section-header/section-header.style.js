import styled from 'styled-components';

import { colors } from 'src/core/styles';
import { combineRems, hasValue } from 'src/utils';

import { Headline } from '../../components';

export const SectionHeaderDiv = styled.div`
  margin: 0 auto
    ${props =>
      hasValue(props.bottomMargin)
        ? props.bottomMargin
        : props.theme.spacing.four};
  width: 100%;
`;

export const SectionHeaderHeadline = Headline.extend`
  margin: 0 auto
    ${props =>
      hasValue(props.bottomMarginHeadline)
        ? props.bottomMarginHeadline
        : combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  color: ${props => props.textColor};
`;
SectionHeaderHeadline.defaultProps = {
  textColor: colors.charcoal,
};
