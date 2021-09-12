import React from 'react';
import { LineSeries, AbstractSeries } from 'react-vis';

export class AbstractLineGraph extends AbstractSeries {
  render() {
    const { onLineClick, data } = this.props;
    return (
      <LineSeries
        {...this.props}
        style={{ pointerEvents: 'stroke' }}
        onSeriesClick={graphEvent => {
          graphEvent.event.stopPropagation();
          onLineClick(data[0]);
        }}
      />
    );
  }
}
