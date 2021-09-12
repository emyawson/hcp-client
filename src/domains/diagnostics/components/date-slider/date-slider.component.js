import React, { Component } from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import {
  RightChevronIcon,
  RightGuillemetIcon,
  LeftChevronIcon,
  LeftGuillemetIcon,
} from 'src/domains/diagnostics/assets/icons';
import { RenderIf } from 'src/domains/diagnostics/utils';

import { DateSliderPath } from './date-slider-path.component';
import { DateSliderHandle } from './date-slider-handle.component';
import { DateSliderTicks } from './date-slider-ticks.component';
import {
  DateSliderWrapper,
  InnerPath,
  DatePopup,
  DateSliderButton,
  ButtonGroup,
} from './date-slider.style';
import {
  getHandleState,
  sliderValueToDate,
  getRangeValues,
} from './date-slider.util';
import { HANDLES } from './date-slider.constant';

export class DateSlider extends Component {
  state = {
    draggingHandle: null,
    startHandleValue: 0,
    endHandleValue: 0,
    rangeStart: 0,
    rangeEnd: 0,
    initialRangeStart: 0,
    initializedWithProps: false,
    tickDistance: 0,
    initialClientX: 0,
    dayOffset: 0,
  };

  componentDidMount() {
    this.initializeSliderWithProps(this.props);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.adaptSliderToWindowSize);
  }

  componentWillReceiveProps(nextProps) {
    this.initializeSliderWithProps(nextProps);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.adaptSliderToWindowSize);
  }

  render() {
    const {
      startHandleValue,
      endHandleValue,
      tickDistance,
      draggingHandle,
      rangeStart,
      rangeEnd,
    } = this.state;

    const { firstMeasurementDate, disabled } = this.props;
    const { onHandleMouseDown, registerRef, shiftHandles } = this;

    const strokeColor = disabled ? colors.grayLight : colors.darkBlueMarine;

    return (
      <DateSliderWrapper>
        <ButtonGroup leftSide>
          <DateSliderButton onClick={e => shiftHandles(-1, true)}>
            <LeftGuillemetIcon withBorder strokeColor={strokeColor} />
          </DateSliderButton>
          <DateSliderButton onClick={e => shiftHandles(-1)}>
            <LeftChevronIcon withBorder strokeColor={strokeColor} />
          </DateSliderButton>
        </ButtonGroup>
        <DateSliderPath
          disabled={disabled}
          registerRef={registerRef(HANDLES.PATH)}
        >
          <RenderIf validate={tickDistance >= 0}>
            <InnerPath
              left={(startHandleValue - rangeStart) * tickDistance}
              width={(endHandleValue - startHandleValue) * tickDistance}
              onMouseDown={onHandleMouseDown(HANDLES.PATH)}
            />
            <DateSliderHandle
              registerRef={registerRef(HANDLES.START_HANDLE)}
              onMouseDown={onHandleMouseDown(HANDLES.START_HANDLE)}
              left={(startHandleValue - rangeStart) * tickDistance}
              dragging={draggingHandle === HANDLES.START_HANDLE}
            >
              {draggingHandle && (
                <DatePopup>
                  {sliderValueToDate(firstMeasurementDate, startHandleValue)}
                </DatePopup>
              )}
            </DateSliderHandle>
            <DateSliderHandle
              registerRef={registerRef(HANDLES.END_HANDLE)}
              onMouseDown={onHandleMouseDown(HANDLES.END_HANDLE)}
              dragging={draggingHandle === HANDLES.END_HANDLE}
              left={(endHandleValue - rangeStart) * tickDistance}
            >
              {draggingHandle && (
                <DatePopup>
                  {sliderValueToDate(firstMeasurementDate, endHandleValue)}
                </DatePopup>
              )}
            </DateSliderHandle>
            <DateSliderTicks
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              tickDistance={tickDistance}
              firstMeasurementDate={firstMeasurementDate}
            />
          </RenderIf>
        </DateSliderPath>
        <ButtonGroup rightSide>
          <DateSliderButton onClick={e => shiftHandles(1)}>
            <RightChevronIcon withBorder strokeColor={strokeColor} />
          </DateSliderButton>
          <DateSliderButton onClick={e => shiftHandles(1, true)}>
            <RightGuillemetIcon withBorder strokeColor={strokeColor} />
          </DateSliderButton>
        </ButtonGroup>
      </DateSliderWrapper>
    );
  }

  shiftHandles = (direction, shiftBySelection = false) => {
    if (this.props.disabled) {
      return;
    }

    const {
      startHandleValue,
      endHandleValue,
      rangeEnd,
      initialRangeEnd,
    } = this.state;

    const initialShiftValue = shiftBySelection
      ? (endHandleValue - startHandleValue + 1) * direction
      : direction;

    let shiftValue = initialShiftValue;

    if (rangeEnd <= initialRangeEnd) {
      if (endHandleValue + initialShiftValue > rangeEnd) {
        shiftValue = rangeEnd - endHandleValue;
      } else if (startHandleValue + initialShiftValue < 0) {
        shiftValue = 0 - startHandleValue;
      }
    }

    this.setState(
      prevState => ({
        startHandleValue: prevState.startHandleValue + shiftValue,
        endHandleValue: prevState.endHandleValue + shiftValue,
      }),
      () => this.updateStoreWithDateSelections(),
    );
  };

  initializeSliderWithProps = props => {
    const {
      firstMeasurementDate,
      lastMeasurementDate,
      startDate,
      endDate,
    } = props;

    const rangeValues = getRangeValues(
      firstMeasurementDate,
      lastMeasurementDate,
      startDate,
      endDate,
    );

    const numberOfDays = rangeValues.rangeEnd - rangeValues.rangeStart;
    const pathLength = this.path.clientWidth;
    this.setState({
      ...rangeValues,
      tickDistance: pathLength / numberOfDays,
    });
  };

  adaptSliderToWindowSize = e => this.initializeSliderWithProps(this.props);

  registerRef = id => node => (this[id] = node);

  onHandleMouseDown = handleId => e => {
    if (this.props.disabled) {
      return;
    }
    this.setState({ draggingHandle: handleId, initialClientX: e.clientX });
  };

  shouldPathSlide = (nextStartHandleValue, nextEndHandleValue, delta) =>
    delta !== 0 &&
    nextStartHandleValue >= this.state.rangeStart &&
    nextEndHandleValue <= this.state.rangeEnd;

  onMouseMove = e => {
    const {
      draggingHandle,
      startHandleValue,
      endHandleValue,
      tickDistance,
      initialClientX,
      rangeStart,
    } = this.state;
    const { path, shouldPathSlide } = this;
    const pathOffsetLeft = path.getBoundingClientRect().left;
    const pathX = e.clientX - pathOffsetLeft;

    if (
      draggingHandle === HANDLES.START_HANDLE ||
      draggingHandle === HANDLES.END_HANDLE
    ) {
      const nextState = getHandleState(
        path.clientWidth,
        pathX,
        tickDistance,
        draggingHandle,
        startHandleValue,
        endHandleValue,
        rangeStart,
      );
      this.setState(prevState => nextState);
    } else if (draggingHandle === HANDLES.PATH) {
      const delta = (e.clientX - initialClientX) / tickDistance;
      const nextStartHandleValue = this.state.startHandleValue + delta;
      const nextEndHandleValue = this.state.endHandleValue + delta;
      if (shouldPathSlide(nextStartHandleValue, nextEndHandleValue, delta)) {
        this.setState(prevState => ({
          initialClientX: e.clientX,
          startHandleValue: this.state.startHandleValue + delta,
          endHandleValue: this.state.endHandleValue + delta,
        }));
      }
    }
  };

  onMouseUp = e => {
    if (this.state.draggingHandle) {
      this.setState({ draggingHandle: null, initialClientX: 0 });
      this.updateStoreWithDateSelections();
    }
  };

  updateStoreWithDateSelections = () => {
    const { startHandleValue, endHandleValue } = this.state;
    const { firstMeasurementDate } = this.props;
    this.props.onDatesChange(
      sliderValueToDate(firstMeasurementDate, startHandleValue, false),
      sliderValueToDate(firstMeasurementDate, endHandleValue, false),
    );
  };
}
