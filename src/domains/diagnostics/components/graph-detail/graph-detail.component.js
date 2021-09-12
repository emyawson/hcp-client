import React from 'react';

import { MenuIcon } from 'src/domains/diagnostics/assets/icons';
import {
  GraphLegend,
  GraphStatistics,
  VerticalTabs,
} from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';

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
      label: <MenuIcon />,
      keyText: 'legend',
      content: <GraphLegend graphType={graphType} />,
    },
  ];

  if (['logbook', 'logbook-stats', 'insulin-pump'].includes(graphType)) {
    return tabs;
  }

  return [
    {
      label: '%',
      keyText: 'statistics',
      content: (
        <GraphStatistics graphType={graphType} graphDetails={graphStatistics} />
      ),
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
