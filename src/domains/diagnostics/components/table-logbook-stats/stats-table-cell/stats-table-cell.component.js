import React from 'react';

import {
  StatsTableCellBase,
  StatsTableCellHighlighted,
  StatsTableCellAlternate,
} from '.';

export const StatsTableCell = ({
  paddingLeft,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  width,
  highlightDate,
  alternateFill,
  colSpan,
  children,
}) => {
  const styles = {
    paddingLeft,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    colSpan,
    width,
  };
  if (highlightDate) {
    return (
      <StatsTableCellHighlighted {...styles}>
        {children}
      </StatsTableCellHighlighted>
    );
  } else if (alternateFill) {
    return (
      <StatsTableCellAlternate {...styles}>{children}</StatsTableCellAlternate>
    );
  } else {
    return <StatsTableCellBase {...styles}>{children}</StatsTableCellBase>;
  }
};
