import styled from 'styled-components';

import { Badge } from 'src/components';
import { borderRadius } from 'src/core/styles';
import { convertPxToRem } from 'src/utils';

export const CommentCardDiv = styled.div`
  background-color: ${props => props.theme.colors.lavender};
  border: 1px solid ${props => props.theme.colors.quartzBlue};
  border-radius: ${borderRadius.three};
  color: ${props => props.theme.colors.charcoal};
  overflow: hidden;
`;

const borderSize = convertPxToRem(3);

export const CommentWrapperDiv = styled.div`
  border-left: ${props =>
    props.isExpanded
      ? `${borderSize} solid ${props.theme.colors.trafficRed}`
      : 'none'};
  border-top: ${props =>
    !props.isExpanded
      ? `${borderSize} solid ${props.theme.colors.trafficRed}`
      : 'none'};
  display: flex;
  padding: ${props => props.theme.spacing.three}
    ${props =>
      props.isExpanded ? props.theme.spacing.four : props.theme.spacing.three};
`;

export const CommentContentDiv = styled.div`
  width: 100%;
`;

export const CommentIconDiv = styled.div`
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.quartzBlue};
  display: flex;
  margin-right: ${props =>
    props.isExpanded ? props.theme.spacing.four : props.theme.spacing.three};
  padding-right: ${props =>
    props.isExpanded ? props.theme.spacing.four : props.theme.spacing.three};
`;

export const CommentIconBadge = styled(Badge)`
  padding: ${borderSize};
`;

export const CommentHeaderDiv = styled.div`
  align-items: baseline;
  display: flex;
  margin: 0 auto ${props => props.theme.spacing.two};
  width: 100%;
`;

const CommentHeaderText = styled.span`
  color: ${props => props.theme.colors.blueMarine5};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin: 0;
`;

export const CommentHeadline = CommentHeaderText.withComponent('h2').extend`
  font-size: ${props =>
    props.isExpanded
      ? props.theme.fontSize.subheading
      : props.theme.fontSize.p};
  line-height: 1;
  margin-right: ${props => props.theme.spacing.one};
`;

export const CommentDateSpan = CommentHeaderText.extend`
  font-size: ${props => props.theme.fontSize.label};
  text-transform: uppercase;
`;

export const CommentBodyP = styled.p`
  font-size: ${props => props.theme.fontSize.p};
  line-height: 1.75;
  margin: 0;
`;
