import styled from 'styled-components';

import { Headline } from 'src/domains/diagnostics/components';
import { combineRems } from 'src/domains/diagnostics/utils';

export const SectionHeaderDiv = styled.div`
  margin: 0 auto
    ${props =>
      props.bottomMargin ? props.bottomMargin : props.theme.spacing.four};
  width: 100%;
`;

export const SectionHeaderHeadline = Headline.extend`
  margin: 0 auto
    ${props =>
      props.bottomMarginHeadline
        ? props.bottomMarginHeadline
        : combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  color: ${props => props.textColor};
`;
