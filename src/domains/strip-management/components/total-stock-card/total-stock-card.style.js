import styled from 'styled-components';

import { spacing, fontSize } from 'src/core';
import { Headline } from 'src/components';
import { combineRems } from 'src/utils';

const totalStockContentRhythm = combineRems(spacing.three, spacing.four);
export const CenteredFlexRowDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const CenteredFlexRowWithMarginDiv = CenteredFlexRowDiv.extend`
  margin-bottom: ${totalStockContentRhythm};
`;

export const TotalStockContentWrapperDiv = styled.div`
  padding: ${spacing.three} 0;
  text-align: center;
`;

export const TotalStockSubheadlinesDiv = styled.div`
  margin-bottom: ${spacing.four};
`;

export const TotalStockHeadline = Headline.extend`
  margin-bottom: ${spacing.three};
`;

export const TotalStockCardLineItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const TotalStockCardLineItemRightDiv = TotalStockCardLineItemDiv.extend`
  text-align: right;
`;

export const TotalStockSmallCardSeparatorDiv = styled.div`
  border-left: 1px solid ${props => props.theme.colors.grayLight};
  display: inline-flex;
  margin: 0 ${combineRems(spacing.two, spacing.three)};
`;

export const QuantityDisplayDiv = styled.div`
  font-size: ${fontSize.display2};
  line-height: 1;
  margin-bottom: ${spacing.two};
`;
