import React from 'react';

import {
  Tabs,
  Card,
  GridContainer,
  GridItem,
  TabsContent,
  TabsHeader,
  TabLinkItem,
} from 'src/components';
import { translate } from 'src/i18n';

export const OrgStripManagement = ({ match, children }) => (
  <GridContainer marginBottom>
    <GridItem span="12">
      <Card>
        <Tabs>
          <TabsHeader mb={4} mr="auto" ml="0">
            <TabLinkItem name={translate('orgStock.title')} path="" />
          </TabsHeader>
          <TabsContent>{children}</TabsContent>
        </Tabs>
      </Card>
    </GridItem>
  </GridContainer>
);
