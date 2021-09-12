import React from 'react';
import {
  GridItem,
  GridContainer,
  GridContainerCard,
  GridItemWithoutPadding,
} from 'src/components/grid-layout';

import { AddOrgStock } from 'src/domains/strip-management/components/add-org-stock';
import { Card } from 'src/components/card';
import {
  TotalStockCard,
  OrgStockHistory,
} from 'src/domains/strip-management/components';

import { InnerWrapper } from './org-stock.style';

export const OrgStock = ({
  stripModels,
  aggregateStock,
  stripModelStockAndHistory,
  onAddOrgStock,
}) => (
  <GridContainer>
    <GridItem span="12">
      <InnerWrapper>
        <GridContainerCard cardStyles={['primary']}>
          <GridItemWithoutPadding span="6">
            <TotalStockCard aggregateStock={aggregateStock} />
          </GridItemWithoutPadding>
          <GridItemWithoutPadding span="6">
            <Card>
              <AddOrgStock
                stripModels={stripModels}
                onAddOrgStock={onAddOrgStock}
              />
            </Card>
          </GridItemWithoutPadding>
        </GridContainerCard>
      </InnerWrapper>
    </GridItem>

    <GridItem span="12">
      <InnerWrapper>
        <OrgStockHistory
          stripModelStockAndHistory={stripModelStockAndHistory}
        />
      </InnerWrapper>
    </GridItem>
  </GridContainer>
);
