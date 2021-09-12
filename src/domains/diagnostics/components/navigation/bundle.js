import React from 'react';

export class Bundle extends React.Component {
  state = {
    component: null,
    bundleWillLoad: () => undefined,
    bundleDidLoad: () => undefined,
  };

  componentWillMount() {
    this.load(this.props.bundleWillLoad);
  }

  render() {
    return this.state.component
      ? this.props.bundleDidLoad(this.state.component)
      : null;
  }

  async load(loadBundle: any) {
    const component = await loadBundle();
    this.setState({ component });
  }
}
