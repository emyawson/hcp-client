import React from 'react';
import { AreaSeries, AbstractSeries } from 'react-vis';

export class AbstractAreaGraph extends AbstractSeries {
  render() {
    return <AreaSeries {...this.props} />;
  }
}
