import { shallow } from 'enzyme';
import React from 'react';

import { withTimeout } from './with-timeout';

describe('With Timeout HoC test suite', () => {
  const DefaultComponent = () => <span>Loading</span>;
  const TimeoutComponent = () => <span>Failed to load</span>;
  const mockProps = {
    TimeoutComponent,
  };
  const MockTimer = withTimeout(mockProps)(DefaultComponent);

  jest.useFakeTimers();

  describe('Component rendering', () => {
    it('should render DefaultComponent while timer is running', () => {
      const wrapper = shallow(<MockTimer />);
      expect(wrapper.state().hasTimedOut).toBeFalsy();
      expect(wrapper.find(DefaultComponent)).toHaveLength(1);
    });
    it('should render TimeoutComponent when timer has stopped', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.setState({ hasTimedOut: true });
      expect(wrapper.find(TimeoutComponent)).toHaveLength(1);
    });
  });
  describe('State changes', () => {
    it('should start a timer on mount, and timeout when not interrupted by props', () => {
      const wrapper = shallow(<MockTimer />);
      jest.advanceTimersByTime(10000);
      expect(wrapper.state().hasTimedOut).toBeTruthy();
    });
    it('should clear the timer when stopTimer prop is invoked', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.setProps({ isStopped: true });
      jest.advanceTimersByTime(10000);
      expect(wrapper.state().hasTimedOut).toBeFalsy();
    });
    it('should clear the timer when handleSuccess is invoked', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.instance().handleSuccess();
      jest.advanceTimersByTime(10000);
      expect(wrapper.state().hasTimedOut).toBeFalsy();
    });
    it('should clear the timer when handleError is invoked', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.instance().handleError();
      jest.advanceTimersByTime(10000);
      expect(wrapper.state().hasTimedOut).toBeFalsy();
    });
    it('should not clear timeout on success if already complete', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.setState({ hasTimedOut: true });
      wrapper.instance().handleSuccess();
      jest.advanceTimersByTime(1000);
      expect(wrapper.find(TimeoutComponent)).toHaveLength(1);
    });
    it('should not clear timeout on error if already complete', () => {
      const wrapper = shallow(<MockTimer />);
      wrapper.setState({ hasTimedOut: true });
      wrapper.instance().handleError();
      jest.advanceTimersByTime(10000);
      expect(wrapper.find(TimeoutComponent)).toHaveLength(1);
    });
  });
});
