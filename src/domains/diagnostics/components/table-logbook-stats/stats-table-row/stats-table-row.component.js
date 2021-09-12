import React from 'react';

import { StatsGroupsTr } from './stats-table-row.style';

export const StatsTableRow = ({
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  width,
  children,
}) => {
  const styles = {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    width,
  };

  return <StatsGroupsTr {...styles}>{children}</StatsGroupsTr>;
};
