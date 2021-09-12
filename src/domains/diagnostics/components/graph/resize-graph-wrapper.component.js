import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export class ResizeGraphWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      layout: EmptyDomRect,
    };

    this.getEl = el => {
      if (!el) return;
      const observer = new ResizeObserver(entries => {
        const entry = entries.find(({ target }) => target === el);
        if (!entry) return;
        this.setState(state => ({ layout: entry.contentRect }));
      });
      observer.observe(el);
    };
  }

  render() {
    return (
      <ResizeChildrenWrapper
        render={this.props.render}
        layout={this.state.layout}
        element={this.getEl}
      />
    );
  }
}

// This is a separate class because pure components need to be wrapped in instances for Ref to work
class ResizeChildrenWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      layout: EmptyDomRect,
    };
  }
  componentWillReceiveProps({ layout }) {
    if (layout === this.state.layout) return;
    this.setState(state => ({ layout }));
  }
  render() {
    const { render, element } = this.props;
    const { layout } = this.state;
    const rendered = render(layout);
    const root = React.Children.only(rendered); // .only throws if there are multiple children (eg: an array returned)
    const clone = React.cloneElement(root, { innerRef: element }); // add the ref to the DOM (note: innerRef must be used for)
    return clone;
  }
}

const EmptyDomRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};
