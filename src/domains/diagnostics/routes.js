import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from 'src/domains/diagnostics/components/protected-route/protected-route.container';
import { RouterOutlet } from 'src/domains/diagnostics/components';
import { LogbookContainer } from 'src/domains/diagnostics/widgets/logbook/logbook.container';
import { LogbookDiaryContainer } from 'src/domains/diagnostics/widgets/logbook-diary/logbook-diary.container';
import { LogbookStatsContainer } from 'src/domains/diagnostics/widgets/logbook-stats/logbook-stats.container';
import { InsulinContainer } from 'src/domains/diagnostics/scenes/insulin/insulin.container';
import { InsulinPumpContainer } from 'src/domains/diagnostics/scenes/insulin-pump/insulin-pump.container';
import { RenderIf } from 'src/domains/diagnostics/utils';

import { GraphBundle } from './bundles';
import { GraphPageWrapper } from './components/graph-wrapper.component';
import { BloodGlucoseOverviewContainer } from './scenes/blood-glucose-overview/blood-glucose-overview.container';
import { GraphSettingsWrapper } from './components/graph-settings-wrapper.component';
import { LogbookSettingsWrapper } from './components/logbook-settings-wrapper.component';
import { connectToGraphs } from './scenes/graphs/graph.container';
import { TrendDetailContainer } from './scenes/graphs/trend/trend-detail/trend-detail.container';
import { TrendTrendContainer } from './scenes/graphs/trend/trend-trend/trend-trend.container';
import { StandardDayDetailContainer } from './scenes/graphs/standard-day-detail/standard-day-detail.container';
import { StandardDayTrendContainer } from './scenes/graphs/standard-day-trend/standard-day-trend.container';
import { StandardWeekDetailContainer } from './scenes/graphs/standard-week-detail/standard-week-detail.container';
import { StandardWeekTrendContainer } from './scenes/graphs/standard-week-trend/standard-week-trend.container';
import { MetabolicContainer } from './scenes/graphs/metabolic/metabolic.container';
import { BloodGlucoseGeneralStatsContainer } from './widgets/blood-glucose-general-stats/blood-glucose-general-stats.container';
import { DeviceDetailsBundle } from './bundles';
import { connectToBloodGlucoseStats } from './widgets/blood-glucose-general-stats/blood-glucose-general-stats.container';

export const diagnosticsLinks = {
  bloodGlucoseOverview: '/patients/:id/blood-glucose-overview',
  insulin: '/patients/:id/graph/insulin',
  graph: '/patients/:id/graph',
  trend: '/patients/:id/graph/trend',
  logbook: '/patients/:id/graph/logbook/:selectedDate?',
  logbookStats: '/patients/:id/graph/logbook-stats/:selectedDate?',
  logbookDiary: '/patients/:id/graph/logbook-diary/:selectedDate?',
  metabolicRate: '/patients/:id/graph/metabolic-rate',
  standardWeek: '/patients/:id/graph/standard-week',
  standardDay: '/patients/:id/graph/standard-day',
  bloodGlucoseGeneralStats: '/patients/:id/graph/blood-glucose-general-stats',
  insulinPump: '/patients/:id/graph/insulin-pump',
};

export const DiagnosticsRoutes = ({ withNavigators }) => {
  const BloodGlucoseOverviewContainerWithNavigators = BloodGlucoseOverviewContainer(
    withNavigators,
  );
  const GraphPageWrapperWithNavigators = GraphPageWrapper(withNavigators);
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={diagnosticsLinks.bloodGlucoseOverview}
        component={BloodGlucoseOverviewContainerWithNavigators}
      />

      <ProtectedRoute
        exact
        path={diagnosticsLinks.graph}
        component={GraphBundle}
      />
      <RouterOutlet path={diagnosticsLinks.graph}>
        <GraphPageWrapperWithNavigators withNavigators={withNavigators}>
          <ProtectedRoute
            exact
            path={diagnosticsLinks.insulin}
            component={() => (
              <GraphSettingsWrapper showChangeGraphToggle={false}>
                <InsulinContainer />
              </GraphSettingsWrapper>
            )}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.logbook}
            component={connectToGraphs(({ logbookType }) => (
              <LogbookSettingsWrapper>
                {logbookType === 'details' ? (
                  <LogbookContainer />
                ) : logbookType === 'statistics' ? (
                  <LogbookStatsContainer />
                ) : (
                  <LogbookDiaryContainer />
                )}
              </LogbookSettingsWrapper>
            ))}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.metabolicRate}
            component={connectToGraphs(() => (
              <MetabolicContainer flexibleHeight showDetails />
            ))}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.insulinPump}
            component={() => <InsulinPumpContainer showDetails />}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.trend}
            component={connectToGraphs(({ graphType }) => (
              <GraphSettingsWrapper>
                <RenderIf validate={graphType === 'details'}>
                  <TrendDetailContainer flexibleHeight />
                </RenderIf>
                <RenderIf validate={graphType !== 'details'}>
                  <TrendTrendContainer flexibleHeight />
                </RenderIf>
              </GraphSettingsWrapper>
            ))}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.standardDay}
            component={connectToGraphs(({ graphType }) => (
              <GraphSettingsWrapper>
                <RenderIf validate={graphType === 'details'}>
                  <StandardDayDetailContainer flexibleHeight linesClickable />
                </RenderIf>
                <RenderIf validate={graphType !== 'details'}>
                  <StandardDayTrendContainer flexibleHeight />
                </RenderIf>
              </GraphSettingsWrapper>
            ))}
          />
          <ProtectedRoute
            exact
            path={diagnosticsLinks.standardWeek}
            component={connectToGraphs(({ graphType }) => (
              <GraphSettingsWrapper>
                <RenderIf validate={graphType === 'details'}>
                  <StandardWeekDetailContainer flexibleHeight linesClickable />
                </RenderIf>
                <RenderIf validate={graphType !== 'details'}>
                  <StandardWeekTrendContainer flexibleHeight />
                </RenderIf>
              </GraphSettingsWrapper>
            ))}
          />

          <ProtectedRoute
            path={diagnosticsLinks.bloodGlucoseGeneralStats}
            component={() => (
              <BloodGlucoseGeneralStatsContainer>
                <Switch>
                  <ProtectedRoute
                    path={`${diagnosticsLinks.bloodGlucoseGeneralStats}/all`}
                    component={connectToBloodGlucoseStats(() => (
                      <DeviceDetailsBundle deviceId="" />
                    ))}
                  />
                  <ProtectedRoute
                    exact
                    path={`${diagnosticsLinks.bloodGlucoseGeneralStats}/:id`}
                    component={connectToBloodGlucoseStats(({ match }) => (
                      <DeviceDetailsBundle deviceId={match.params.id} />
                    ))}
                  />
                </Switch>
              </BloodGlucoseGeneralStatsContainer>
            )}
          />
        </GraphPageWrapperWithNavigators>
      </RouterOutlet>
    </Switch>
  );
};
