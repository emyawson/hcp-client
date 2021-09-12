import React from 'react';
import ReactDOM from 'react-dom';

export class Portal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into.
    this.el = document.createElement('div');
    this.root = document.getElementById(props.rootId);
  }

  componentDidMount() {
    // Append the element into the DOM on mount
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.root.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
