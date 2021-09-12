import React from 'react';

// Display a default Component while a timer runs for ${duration}ms.
// When timer expires, swap default component for another - TimeoutComponent
// Child component can force timer to stop through use of onError or onLoad events
export const withTimeout = ({
  duration = 10000,
  stopTimer = 'isStopped',
  TimeoutComponent,
}) => Component =>
  class TimeoutErrorMessage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasTimedOut: false,
      };
      this.timer = null;
    }
    componentWillMount() {
      this.start();
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps[stopTimer]) {
        this.stop();
      }
    }
    componentWillUnmount() {
      this.stop();
    }
    render() {
      const isTimerStopped = this.state.hasTimedOut || this.props[stopTimer];
      const timeOutProps = {
        [stopTimer]: isTimerStopped,
        hasTimedOut: this.state.hasTimedOut,
        onError: this.handleError,
        onLoad: this.handleSuccess,
      };
      if (isTimerStopped) {
        return <TimeoutComponent {...this.props} {...timeOutProps} />;
      }
      return <Component {...this.props} {...timeOutProps} />;
    }
    handleSuccess = () => {
      // TODO: Extend functionality with separate use cases for success/failure
      if (!this.state.hasTimedOut) {
        this.stop();
      }
    };
    handleError = () => {
      if (!this.state.hasTimedOut) {
        this.stop();
      }
    };
    start() {
      this.timer = setTimeout(() => {
        this.setState({
          hasTimedOut: true,
        });
      }, duration);
    }
    stop() {
      clearTimeout(this.timer);
    }
  };
