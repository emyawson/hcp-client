import React from 'react';
import { Observable } from 'rxjs';
import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  min-height: inherit;
  justify-content: center;
`;
Wrapper.displayName = 'Wrapper';

export class ResizeWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { minHeight = 0 } = props;
    this.state = {
      height: minHeight,
    };
  }

  componentDidMount() {
    this.setHeight();
    Observable.fromEvent(window, 'resize').subscribe(event => {
      this.setHeight();
    });
  }

  render() {
    const { render } = this.props;
    const { height } = this.state;
    return (
      <Wrapper innerRef={node => (this.wrapper = node)}>
        {render(height)}
      </Wrapper>
    );
  }

  setHeight = () => {
    const { wrapper } = this;
    const { disableResize = false } = this.props;
    if (wrapper && !disableResize) {
      const { resizeFunction } = this.props;
      this.setState({
        height: resizeFunction(wrapper.clientHeight),
      });
    }
  };
}
