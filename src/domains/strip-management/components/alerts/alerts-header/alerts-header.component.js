import React from 'react';

import { GridItemWithoutVerticalPadding, LocalizedText } from 'src/components';

import {
  AlertsInternalGrid,
  AlertsPageHeader,
  AlertsHeaderTitleP,
} from '../alerts.style';

export const AlertsHeader = () => (
  <AlertsPageHeader>
    <AlertsInternalGrid>
      <GridItemWithoutVerticalPadding span="1" columns="4">
        <AlertsHeaderTitleP>
          <LocalizedText textKey="alerts.preIdealInterval" />
        </AlertsHeaderTitleP>
      </GridItemWithoutVerticalPadding>
      <GridItemWithoutVerticalPadding span="1" columns="4">
        <AlertsHeaderTitleP>
          <LocalizedText textKey="alerts.postIdealInterval" />
        </AlertsHeaderTitleP>
      </GridItemWithoutVerticalPadding>
      <GridItemWithoutVerticalPadding span="1" columns="4">
        <AlertsHeaderTitleP>
          <LocalizedText textKey="alerts.noctIdealInterval" />
        </AlertsHeaderTitleP>
      </GridItemWithoutVerticalPadding>
      <GridItemWithoutVerticalPadding span="1" columns="4">
        <AlertsHeaderTitleP>
          <LocalizedText textKey="alerts.alertSettings" />
        </AlertsHeaderTitleP>
      </GridItemWithoutVerticalPadding>
    </AlertsInternalGrid>
  </AlertsPageHeader>
);
