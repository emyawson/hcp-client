import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { GraphSettingsRowComponent } from 'src/domains/diagnostics/components/graph-settings-row/graph-settings-row.component';

import { connectToGraphs } from '../scenes/graphs/graph.container';

export const GraphSettings = ({
  graphType,
  translatedGraphType,
  changeGraphType,
  showChangeGraphToggle = true,
  startDate,
  endDate,
  lastMeasurementDate,
  onDatesChange,
  getClinicalData,
  children,
  match,
}) => (
  <React.Fragment>
    <GraphSettingsRowComponent
      graphType={graphType}
      translatedGraphType={translatedGraphType}
      startDate={startDate}
      endDate={endDate}
      lastMeasurementDate={lastMeasurementDate}
      changeGraphType={changeGraphType}
      showChangeGraphToggle={showChangeGraphToggle}
      onDatesChange={(startDate, endDate) => {
        onDatesChange(startDate, endDate);
        const patientId = match.params.id;
        getClinicalData({ patientId, startDate, endDate });
      }}
    />
    {children}
  </React.Fragment>
);

export const GraphSettingsWrapper = compose(
  connectToGraphs,
  withRouter,
)(GraphSettings);
