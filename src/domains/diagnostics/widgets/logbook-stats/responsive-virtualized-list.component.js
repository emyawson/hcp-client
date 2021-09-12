import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

export const ResponsiveVirtualizedList = ({
  length = 0,
  overscanRowCount = 1,
  rowHeight = 0,
  rowRenderer = () => <React.Fragment />,
  rowNumberToScrollTo = 0,
}) => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        overscanRowCount={overscanRowCount}
        rowCount={length}
        rowHeight={rowHeight}
        rowRenderer={({ key, index, isScrolling, isVisible, style }) => (
          <div key={key} style={style}>
            {rowRenderer(index, isScrolling, isVisible)}
          </div>
        )}
        scrollToIndex={rowNumberToScrollTo}
        width={width}
      />
    )}
  </AutoSizer>
);
