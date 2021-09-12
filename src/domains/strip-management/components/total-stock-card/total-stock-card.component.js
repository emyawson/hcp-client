import React from 'react';

import { StripStockIcon } from 'src/assets/icons';
import { Badge, Caption, Card, LocalizedText } from 'src/components';

import {
  TotalStockCardLineItemDiv,
  TotalStockCardLineItemRightDiv,
  TotalStockSmallCardSeparatorDiv,
  CenteredFlexRowDiv,
  CenteredFlexRowWithMarginDiv,
  TotalStockContentWrapperDiv,
  TotalStockSubheadlinesDiv,
  TotalStockHeadline,
  QuantityDisplayDiv,
} from './total-stock-card.style';

export const TotalStockCard = ({ aggregateStock }) => {
  const { stripStock, tubeStock, lastShipmentDate } = aggregateStock;
  return (
    <Card cardStyles={['secondary']}>
      <TotalStockContentWrapperDiv>
        <TotalStockHeadline>
          <LocalizedText textKey="orgStock.totalStock.title" />
        </TotalStockHeadline>

        <TotalStockSubheadlinesDiv>
          <Caption>
            <LocalizedText textKey="orgStock.totalStock.lastAddedDate" />
            <span>: {lastShipmentDate}</span>
          </Caption>
        </TotalStockSubheadlinesDiv>

        <CenteredFlexRowWithMarginDiv>
          <Badge size={120} icon={<StripStockIcon height={56} />} />
        </CenteredFlexRowWithMarginDiv>
        <CenteredFlexRowDiv>
          <TotalStockCardLineItemRightDiv>
            <QuantityDisplayDiv>{tubeStock}</QuantityDisplayDiv>
            <Caption>
              <LocalizedText textKey="orgStock.totalStock.tubes" />
            </Caption>
          </TotalStockCardLineItemRightDiv>
          <TotalStockSmallCardSeparatorDiv />
          <TotalStockCardLineItemDiv>
            <QuantityDisplayDiv>{stripStock}</QuantityDisplayDiv>
            <Caption>
              <LocalizedText textKey="orgStock.totalStock.strips" />
            </Caption>
          </TotalStockCardLineItemDiv>
        </CenteredFlexRowDiv>
      </TotalStockContentWrapperDiv>
    </Card>
  );
};
