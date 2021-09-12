import { stopPropagation } from './stop-propagation';

describe('Stop Event Propagation Test', () => {
  const stopPropagationMock = jest.fn().mockName('stopEvent');
  const stopImmediatePropagationMock = jest.fn().mockName('stopNativeEvent');
  const mockEvent = {
    nativeEvent: {
      stopImmediatePropagation: stopImmediatePropagationMock,
    },
    stopPropagation: stopPropagationMock,
  };
  const mockHandler = jest.fn().mockName('handler');
  it('should stop browser event bubbling before dispatching handler', () => {
    stopPropagation(mockHandler)(mockEvent);
    expect(stopPropagationMock).toHaveBeenCalled();
  });
  it('should stop native event bubbling before dispatching handler', () => {
    stopPropagation(mockHandler)(mockEvent);
    expect(stopImmediatePropagationMock).toHaveBeenCalled();
  });
  it('should dispatch provided handler', () => {
    stopPropagation(mockHandler)(mockEvent);
    expect(mockHandler).toHaveBeenCalled();
  });
});
