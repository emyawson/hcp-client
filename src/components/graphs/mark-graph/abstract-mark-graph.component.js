import React from 'react';
import { CustomSVGSeries, AbstractSeries } from 'react-vis';

export class AbstractMarkGraph extends AbstractSeries {
  render() {
    return <CustomSVGSeries {...this.props} />;
  }
}
