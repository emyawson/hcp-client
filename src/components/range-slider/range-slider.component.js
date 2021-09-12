import React, { Component } from 'react';

import { Path, Handle, InnerPath } from './range-slider.style';
import { HANDLES } from './range-slider.constants';
import { getHandleState } from './range-slider.utils';

export class RangeSlider extends Component {
  state = {
    draggingHandle: null,
    initialClientX: 0,
    maxHandleValue: 0,
    minHandleValue: 0,
    rangeMax: 0,
    rangeMin: 0,
    tickDistance: 0,
  };

  componentDidMount() {
    this.initialize(this.props);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.adaptRangeSliderToWindowSize);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.adaptRangeSliderToWindowSize);
  }

  render() {
    const {
      rangeMin,
      minHandleValue,
      maxHandleValue,
      tickDistance,
    } = this.state;
    return (
      <Path innerRef={ref => (this.path = ref)}>
        <InnerPath
          left={(minHandleValue - rangeMin) * tickDistance}
          width={(maxHandleValue - minHandleValue) * tickDistance}
        />
        <Handle
          left={(minHandleValue - rangeMin) * tickDistance}
          onMouseDown={this.onMouseDown(HANDLES.MIN_HANDLE)}
          innerRef={ref => (this.minHandle = ref)}
        />
        <Handle
          left={(maxHandleValue - rangeMin) * tickDistance}
          onMouseDown={this.onMouseDown(HANDLES.MAX_HANDLE)}
          innerRef={ref => (this.maxHandle = ref)}
        />
      </Path>
    );
  }

  adaptRangeSliderToWindowSize = e => this.initialize(this.props);

  initialize = props => {
    const { minValue, maxValue, rangeMin, rangeMax } = props;
    const range = rangeMax - rangeMin;
    const tickDistance = this.path && this.path.clientWidth / range;
    this.setState({
      maxHandleValue: maxValue,
      minHandleValue: minValue,
      rangeMax,
      rangeMin,
      tickDistance,
    });
  };

  onMouseDown = handleId => e =>
    this.setState({ draggingHandle: handleId, initialClientX: e.clientX });

  onMouseMove = e => {
    const {
      draggingHandle,
      maxHandleValue,
      minHandleValue,
      rangeMin,
      rangeMax,
      tickDistance,
    } = this.state;
    if (draggingHandle) {
      const { path } = this;
      const pathX = e.clientX - path.getBoundingClientRect().left;
      const pathWidth = path.clientWidth;
      const nextState = getHandleState(
        pathWidth,
        pathX,
        tickDistance,
        draggingHandle,
        minHandleValue,
        maxHandleValue,
        rangeMin,
        rangeMax,
      );
      this.setState(nextState);
    }
  };

  onMouseUp = e => {
    if (this.state.draggingHandle) {
      this.setState({ draggingHandle: null, initialClientX: 0 });
      this.handleOnChange();
    }
  };

  handleOnChange = () => {
    const { minHandleValue, maxHandleValue } = this.state;
    this.props.onChange({ max: maxHandleValue, min: minHandleValue });
  };
}
RangeSlider.defaultProps = {
  maxValue: 1,
  minValue: 0,
  onChange: () => undefined,
  rangeMax: 1,
  rangeMin: 0,
};
