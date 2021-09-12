import { connect } from 'react-redux';

import {
  Configurations,
  ConfigurationsProps,
} from './configurations.component';
import { configurationsConnector } from './configurations.selector';

export const ConfigurationsContainer: React.ComponentClass<
  ConfigurationsProps
> = connect<
  Pick<ConfigurationsProps, 'profileType'>,
  {},
  { toggleDisplay: ConfigurationsProps['toggleDisplay'] }
>(
  configurationsConnector,
  () => ({}),
)(Configurations);
