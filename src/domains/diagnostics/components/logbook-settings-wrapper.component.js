import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { LogbookSettingsRowComponent } from 'src/domains/diagnostics/components/graph-settings-row/graph-settings-row.component';

import { connectToGraphs } from '../scenes/graphs/graph.container';

export const GraphSettings = ({
  logbookType,
  changeLogbookType,
  onClickDisclaimer,
  children,
  match,
}) => (
  <React.Fragment>
    <LogbookSettingsRowComponent
      absolutePosition
      logbookType={logbookType}
      changeLogbookType={changeLogbookType}
      onClickDisclaimer={onClickDisclaimer}
    />
    {children}
  </React.Fragment>
);

export const LogbookSettingsWrapper = compose(
  connectToGraphs,
  withRouter,
)(GraphSettings);
