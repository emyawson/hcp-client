import React, { Component } from 'react';

import { PatientSummaryBarContainer } from 'src/widgets/patient-summary-bar';
import {
  StandardDayDetailContainer,
  StandardWeekDetailContainer,
  TrendDetailContainer,
  MetabolicContainer,
  GRAPHS,
  GRAPHS_NO_TABS,
  GRAPH_DEFAULT_DASHBOARD,
} from 'src/domains/diagnostics/scenes/graphs';
import { GlobalGraphOptionsContainer } from 'src/domains/diagnostics/widgets';
import {
  LogbookContainer,
  DistributionCardContainer,
  StatusCardContainer,
  InsulinDetailsContainer,
} from 'src/domains/diagnostics/widgets';
import { colors, spacing } from 'src/core';
import { verifyPermission } from 'src/core/permissions/permissions.utils';
import {
  Card,
  Tabs,
  TabsHeader,
  TabItem,
  GridItem,
  GridContainer,
  FlexibleGridContainer,
  SectionHeader,
  LoadingRing,
} from 'src/components';
import { HomeDeliveryCard } from 'src/domains/strip-management/components';
import { translate } from 'src/i18n';
import {
  WithPermissions,
  WithPatientPermissions,
} from 'src/utils/with-permissions/with-permissions.container';
import {
  PERMISSIONS,
  PATIENT_PERMISSIONS,
} from 'src/core/permissions/permissions.constants';
import { HypoglycaemiaCardContainer } from 'src/domains/diagnostics/widgets';
import { InsulinPumpContainer } from 'src/domains/diagnostics/scenes/insulin-pump/insulin-pump.container';
import { CollapsedPatientStripStatusContainer } from 'src/domains/strip-management/widgets';

import {
  LogbookWrapper,
  GraphContainerDiv,
  PatientPermissionsLoaderDiv,
} from './patient-dashboard.style';

import { BGStatsCardContainer } from '../../domains/diagnostics/widgets/bg-stats-card';

const advancedIndicatorsFeatureFlag = true;

const dashboardGridColumns = 12;
export class PatientDashboard extends Component {
  render() {
    const { match, permissions } = this.props;

    const hasGraphManagement = verifyPermission(permissions)(
      PERMISSIONS.USER_SHOW_GRAPHIC_CONFIG,
    );
    const hasPatientManagementDelete = verifyPermission(permissions)(
      PERMISSIONS.DELIVERY_PROFESSIONAL,
    );
    const hasTimeBlocksManagement = verifyPermission(permissions)(
      PERMISSIONS.TIME_BLOCKS_MANAGEMENT,
    );
    const hasTreatmentList = verifyPermission(permissions)(
      PERMISSIONS.TREATMENT_LIST,
    );

    const patientId = match.params.id;
    const actions = [];
    actions.push({
      textKey: 'dashboard.patientCardPopover.editPatient',
      url: `${match.url}/edit`,
    });
    if (hasTimeBlocksManagement) {
      actions.push({
        textKey: 'dashboard.patientCardPopover.timePeriods',
        url: `${match.url}/time-periods`,
      });
    }
    if (hasTreatmentList) {
      actions.push({
        textKey: 'dashboard.patientCardPopover.listTreatments',
        url: `${match.url}/treatments`,
      });
    }
    if (hasGraphManagement) {
      actions.push({
        textKey: 'dashboard.patientCardPopover.graphicSettings',
        url: `${match.url}/graph-settings`,
      });
    }
    actions.push({
      textKey: 'dashboard.patientCardPopover.listDevices',
      url: `${match.url}/devices`,
    });
    if (hasPatientManagementDelete) {
      actions.push({
        textKey: 'dashboard.patientCardPopover.deactivatePatient',
        url: `${match.url}/deactivate`,
      });
    }

    return (
      <WithPermissions hasPermissions={[PERMISSIONS.PATIENT_DIAGNOSTICS]}>
        <GridContainer marginBottom span={dashboardGridColumns}>
          <GridItem span="12">
            <PatientSummaryBarContainer />
          </GridItem>
          <GridItem span="12">
            <SectionHeader
              textColor={colors.charcoal}
              bottomMarginHeadline={spacing.two}
              title={translate('bloodGlucoseStats.title')}
            />
            <GlobalGraphOptionsContainer />
          </GridItem>
          <GridItem span="6">
            <Card
              title={translate('dashboard.distributionCardTitle')}
              cardStyles={['patientDashboard', 'flexible', 'noPadding']}
            >
              <DistributionCardContainer />
            </Card>
          </GridItem>
          <GridItem span="6">
            <Card
              title={translate('dashboard.statusCardTitle')}
              expandable={true}
              cardStyles={['patientDashboard', 'flexible', 'noPadding']}
              link={
                advancedIndicatorsFeatureFlag
                  ? `${match.url}/advanced-indicators`
                  : `${match.url}/blood-glucose-overview`
              }
            >
              <StatusCardContainer />
            </Card>
          </GridItem>

          {this.renderGraph()}
        </GridContainer>
        <WithPatientPermissions
          patientId={patientId}
          hasPermissions={[PATIENT_PERMISSIONS.PATIENT]}
          onVerification={() => (
            <GridItem span="12">
              <PatientPermissionsLoaderDiv>
                <LoadingRing infinite size={48} />
              </PatientPermissionsLoaderDiv>
            </GridItem>
          )}
        >
          <FlexibleGridContainer marginBottom>
            <WithPermissions hasPermissions={[PERMISSIONS.STRIP_TRAFFIC_LIGHT]}>
              <WithPatientPermissions
                patientId={patientId}
                hasPermissions={[PATIENT_PERMISSIONS.STRIP_MNG_PATIENT]}
              >
                <GridItem>
                  <Card
                    title={translate('stripDelivery.title')}
                    expandable={true}
                    link={`${match.url}/strip-information`}
                    cardStyles={['patientDashboard', 'noPadding']}
                  >
                    <CollapsedPatientStripStatusContainer />
                  </Card>
                </GridItem>
              </WithPatientPermissions>
            </WithPermissions>

            <WithPermissions
              hasPermissions={[PERMISSIONS.DELIVERY_PROFESSIONAL]}
            >
              <WithPatientPermissions
                patientId={patientId}
                hasPermissions={[PATIENT_PERMISSIONS.HOME_DELIVERY_PATIENT]}
              >
                <GridItem>
                  <Card
                    title={translate('homeStripDelivery.title')}
                    cardStyles={['patientDashboard', 'flexible', 'noPadding']}
                  >
                    <HomeDeliveryCard />
                  </Card>
                </GridItem>
              </WithPatientPermissions>
            </WithPermissions>

            <GridItem>
              <Card
                title={translate('dashboard.bgStatisticsCardTitle')}
                expandable={true}
                link={`${match.url}/graph/blood-glucose-general-stats/all`}
                collapsable={true}
                match={match}
                patientId={patientId}
                cardStyles={['patientDashboard', 'flexible', 'noPadding']}
              >
                <BGStatsCardContainer />
              </Card>
            </GridItem>

            <GridItem>
              <Card
                title={translate('dashboard.hypoCardTitle')}
                cardStyles={['patientDashboard', 'flexible', 'noPadding']}
              >
                <HypoglycaemiaCardContainer />
              </Card>
            </GridItem>
          </FlexibleGridContainer>
        </WithPatientPermissions>
      </WithPermissions>
    );
  }

  renderGraph() {
    const { changeGraph, graph, match } = this.props;

    const tabs = [
      {
        name: translate('graphs.trendTitle'),
        activeTitle: GRAPHS.TREND,
        onClick: () => changeGraph(GRAPHS.TREND),
      },
      {
        name: translate('graphs.standardDayTitle'),
        activeTitle: GRAPHS.STANDARD_DAY,
        onClick: () => changeGraph(GRAPHS.STANDARD_DAY),
      },
      {
        name: translate('graphs.standardWeekTitle'),
        activeTitle: GRAPHS.STANDARD_WEEK,
        onClick: () => changeGraph(GRAPHS.STANDARD_WEEK),
      },
      {
        name: translate('graphs.logbookTitle'),
        activeTitle: GRAPHS.LOGBOOK,
        onClick: () => changeGraph(GRAPHS.LOGBOOK),
      },
      {
        name: translate('graphs.metabolicTitle'),
        activeTitle: GRAPHS.METABOLIC_RATE,
        onClick: () => changeGraph(GRAPHS.METABOLIC_RATE),
      },
      {
        name: translate('graphs.insulin.title'),
        activeTitle: GRAPHS.INSULIN,
        onClick: () => changeGraph(GRAPHS.INSULIN),
      },
      {
        name: translate('graphs.insulinPumpTitle'),
        activeTitle: GRAPHS.INSULIN_PUMP,
        onClick: () => changeGraph(GRAPHS.INSULIN_PUMP),
      },
    ];

    let chart = null;

    if (GRAPHS_NO_TABS.indexOf(graph) > -1) {
      changeGraph(GRAPH_DEFAULT_DASHBOARD);
    } else if (graph === GRAPHS.TREND) {
      chart = <TrendDetailContainer collapsed showDetails={false} />;
    } else if (graph === GRAPHS.STANDARD_DAY) {
      chart = <StandardDayDetailContainer collapsed showDetails={false} />;
    } else if (graph === GRAPHS.STANDARD_WEEK) {
      chart = <StandardWeekDetailContainer collapsed showDetails={false} />;
    } else if (graph === GRAPHS.LOGBOOK) {
      chart = (
        <LogbookWrapper collapsed>
          <LogbookContainer collapsed showDetails={false} />
        </LogbookWrapper>
      );
    } else if (graph === GRAPHS.METABOLIC_RATE) {
      chart = <MetabolicContainer collapsed showDetails={false} />;
    } else if (graph === GRAPHS.INSULIN) {
      chart = <InsulinDetailsContainer showLoader />;
    } else if (graph === GRAPHS.INSULIN_PUMP) {
      chart = <InsulinPumpContainer collapsed />;
    }

    return (
      <GridItem span="12">
        <Card
          collapsable={graph === GRAPHS.INSULIN}
          expandable
          link={`${match.url}/graph/${graph}`}
          cardStyles={['noHeaderBorder']}
          customHeaderComponent={
            <Tabs>
              <TabsHeader pt={1} mb={4} mr="auto" ml="0">
                {tabs.map(t => (
                  <TabItem
                    key={`tab-${t.activeTitle}`}
                    {...t}
                    currentTitle={graph}
                  />
                ))}
              </TabsHeader>
            </Tabs>
          }
        >
          <GraphContainerDiv graph={graph}>{chart}</GraphContainerDiv>
        </Card>
      </GridItem>
    );
  }
}
