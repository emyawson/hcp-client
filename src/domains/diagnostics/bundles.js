import React from 'react';

import { Bundle } from 'src/domains/diagnostics/components';

export const GraphBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        GraphContainer,
      } = await import(/* webpackChunkName: "graphs" */ './scenes/graphs');
      return GraphContainer;
    }}
    bundleDidLoad={GraphContainer => <GraphContainer {...props} />}
  />
);

export const BloodGlucoseGeneralStatsBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        BloodGlucoseGeneralStatsContainer,
      } = await import('./widgets/blood-glucose-general-stats/blood-glucose-general-stats.container');
      return BloodGlucoseGeneralStatsContainer;
    }}
    bundleDidLoad={BloodGlucoseGeneralStatsContainer => (
      <BloodGlucoseGeneralStatsContainer {...props} />
    )}
  />
);

export const DeviceDetailsBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        DeviceDetailsContainer,
      } = await import('./widgets/blood-glucose-general-stats/components/device-details/device-details.container');
      return DeviceDetailsContainer;
    }}
    bundleDidLoad={DeviceDetailsContainer => (
      <DeviceDetailsContainer {...props} />
    )}
  />
);
