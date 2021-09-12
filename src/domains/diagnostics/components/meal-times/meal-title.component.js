import React, { Component } from 'react';

import { MealTitle } from './meal-times.style';

export class MealTitleWithTooltip extends Component {
  componentDidMount() {
    if (this.el && this.el.clientWidth < this.el.scrollWidth) {
      this.el.setAttribute('title', this.props.children);
    }
  }
  render() {
    const { textAlign } = this.props;
    return (
      <MealTitle textAlign={textAlign}>
        <div ref={el => (this.el = el)}>{this.props.children}</div>
      </MealTitle>
    );
  }
}
