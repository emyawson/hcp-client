import React from 'react';

import {
  LogbookCellBlockAlternate,
  LogbookCellBlockBase,
} from './logbook-cell-block.style';

export const LogbookCellBlock = ({
  alternateFill,
  children,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  color,
  flex,
  height,
  p,
}) => {
  const styles = {
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    flex,
    color,
    height,
    p,
  };
  if (alternateFill) {
    return (
      <LogbookCellBlockAlternate {...styles}>
        {children}
      </LogbookCellBlockAlternate>
    );
  }
  return <LogbookCellBlockBase {...styles}>{children}</LogbookCellBlockBase>;
};
