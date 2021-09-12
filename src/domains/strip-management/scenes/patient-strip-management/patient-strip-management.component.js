import React from 'react';

import {
  Tabs,
  Card,
  CardMinimizer,
  GridContainer,
  GridItem,
  TabLinkItem,
  TabsHeader,
  TabsContent,
} from 'src/components';
import { PatientSummaryBarContainer } from 'src/widgets/patient-summary-bar';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { translate } from 'src/i18n';

export const PatientStripManagementComp = ({ match, patient, children }) => (
  <GridContainer marginBottom>
    <GridItem span="12">
      <PatientSummaryBarContainer />
    </GridItem>
    <GridItem span="12">
      <Card>
        <WithPermissions hasPermissions={[PERMISSIONS.PATIENT_DIAGNOSTICS]}>
          <CardMinimizer link={`/patients/${match.params.id}`} />
        </WithPermissions>
        <Tabs>
          <TabsHeader mb={4} mr="auto" ml="0">
            <TabLinkItem
              exact
              path=""
              name={translate('stripDelivery.title')}
            />
            <WithPermissions hasPermissions={[PERMISSIONS.STRIP_PRESCRIPTIONS]}>
              <TabLinkItem
                path="prescription"
                name={translate('prescription.title')}
              />
            </WithPermissions>
            <WithPermissions
              hasPermissions={[PERMISSIONS.STRIP_PATIENT_ALERTS]}
            >
              <TabLinkItem
                exact
                path="alerts"
                name={translate('alerts.title')}
              />
            </WithPermissions>
          </TabsHeader>
          <TabsContent>{children}</TabsContent>
        </Tabs>
      </Card>
    </GridItem>
  </GridContainer>
);
