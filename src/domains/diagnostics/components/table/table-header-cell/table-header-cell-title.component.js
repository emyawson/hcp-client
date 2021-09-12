import React, { Component } from 'react';

import { TableHeaderCellTitle } from './table-header-cell-title.style';

export class TableHeaderCellTitleWithTooltip extends Component {
  componentDidMount() {
    if (this.el && this.el.clientWidth < this.el.scrollWidth) {
      this.el.setAttribute('title', this.props.children);
    }
  }

  render() {
    const {
      height,
      overflow,
      padding,
      textAlign,
      whiteSpace,
      children,
    } = this.props;

    return (
      <TableHeaderCellTitle
        height={height}
        overflow={overflow}
        whiteSpace={whiteSpace}
        textAlign={textAlign}
        padding={padding}
      >
        <div ref={el => (this.el = el)}>{children}</div>
      </TableHeaderCellTitle>
    );
  }
}
