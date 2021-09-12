import React from 'react';

import { MenuIcon } from 'src/domains/diagnostics/assets/icons';
import {
  GraphLegend,
  GraphStatistics,
  VerticalTabs,
} from 'src/domains/diagnostics/components';
import { colors } from 'src/core/styles';

const selectedTabStyle = `
  path,
  circle {
    fill: ${colors.blue};
  }
  .horizontalLines {
    stroke: ${colors.blue};
  }
  color: ${colors.blue};
`;

const getGraphDetailTabs = (graphType, graphStatistics) => {
  const tabs = [
    {
      content: <GraphLegend graphType={graphType} />,
      keyText: 'legend',
      label: <MenuIcon />,
    },
  ];

  if (['logbook', 'logbook-stats', 'insulin-pump'].includes(graphType)) {
    return tabs;
  }

  return [
    {
      content: (
        <GraphStatistics graphType={graphType} graphDetails={graphStatistics} />
      ),
      keyText: 'statistics',
      label: '%',
    },
    ...tabs,
  ];
};

export const GraphDetail = ({ graphType, graphStatistics }) => (
  <VerticalTabs
    minHeight="12rem"
    navItemLabelSelectedStyle={selectedTabStyle}
    tabs={getGraphDetailTabs(graphType, graphStatistics)}
  />
);
