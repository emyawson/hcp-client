import React from 'react';

import { StatsCellBlockBase } from './stats-table-cell-block.style';

export const StatsTableCellBlock = ({
  children,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  flex,
}) => {
  const styles = { borderTop, borderRight, borderBottom, borderLeft, flex };
  return <StatsCellBlockBase {...styles}>{children}</StatsCellBlockBase>;
};
