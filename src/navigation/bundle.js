import React from 'react';

export class Bundle extends React.Component {
  state = {
    bundleDidLoad: () => undefined,
    bundleWillLoad: () => undefined,
    component: null,
  };

  componentWillMount() {
    this.load(this.props.bundleWillLoad);
  }

  render() {
    return this.state.component
      ? this.props.bundleDidLoad(this.state.component)
      : null;
  }

  async load(loadBundle) {
    const component = await loadBundle();
    this.setState({ component });
  }
}
