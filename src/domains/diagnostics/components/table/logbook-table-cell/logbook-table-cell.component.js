import React from 'react';

import {
  LogbookTableBaseCell,
  LogbookTableAlternateCell,
  LogbookTableBaseCellDiv,
  LogbookTableAlternateCellDiv,
} from '.';

export const LogbookTableCell = ({
  alternateFill,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  fontSize,
  paddingLeft,
  textAlign,
  textTransform,
  width,
  colspan,
  color,
  fontWeight,
  height,
  children,
  verticalAlign,
}) => {
  const styles = {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    color,
    fontSize,
    fontWeight,
    height,
    paddingLeft,
    textAlign,
    textTransform,
    verticalAlign,
    width,
  };
  if (alternateFill) {
    return (
      <LogbookTableAlternateCell {...styles} colspan={colspan}>
        {children}
      </LogbookTableAlternateCell>
    );
  }
  return (
    <LogbookTableBaseCell {...styles} colspan={colspan}>
      {children}
    </LogbookTableBaseCell>
  );
};

export const LogbookTableCellDiv = ({
  alternateFill,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  width,
  children,
  mouseClickHandler,
  pointerCursor,
  highlight,
}) => {
  const styles = {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    width,
    pointerCursor,
  };
  if (alternateFill) {
    return (
      <LogbookTableAlternateCellDiv
        highlight={highlight}
        {...styles}
        onClick={mouseClickHandler}
      >
        {children}
      </LogbookTableAlternateCellDiv>
    );
  }
  return (
    <LogbookTableBaseCellDiv
      highlight={highlight}
      {...styles}
      onClick={mouseClickHandler}
    >
      {children}
    </LogbookTableBaseCellDiv>
  );
};
