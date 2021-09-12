import { getHandleDragPosition, getHandleState } from './date-slider.util';

describe('Date Slider Component Utils', () => {
  it('should return rangeStart value when pathX lesser than 0', () => {
    expect(getHandleDragPosition(1200, -12, 5, 20)).toBe(20);
  });

  it('should return maximum value allowed when pathX greater than pathWidth', () => {
    expect(getHandleDragPosition(1200, 1300, 5, 20)).toBe(260);
  });

  it('should return apropriate value when pathX is within range', () => {
    expect(getHandleDragPosition(1200, 300, 5, 20)).toBe(80);
  });

  it('should only modify the dragging handle value', () => {
    const startHandleValue = 40;
    const endHandleValue = 160;
    const handlestate = getHandleState(
      1200,
      600,
      5,
      'startHandle',
      startHandleValue,
      endHandleValue,
      0,
    );
    expect(handlestate.startHandleValue).not.toBe(startHandleValue);
  });

  it('should NOT modify non-dragging handle value', () => {
    const startHandleValue = 40;
    const endHandleValue = 160;
    const handlestate = getHandleState(
      1200,
      600,
      5,
      'startHandle',
      startHandleValue,
      endHandleValue,
      0,
    );
    expect(handlestate.endHandleValue).toBe(endHandleValue);
  });
});
