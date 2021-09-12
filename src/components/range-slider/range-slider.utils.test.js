import { getHandleDragPosition, getHandleState } from './range-slider.utils';
import { HANDLES } from './range-slider.constants';

const { MIN_HANDLE, MAX_HANDLE } = HANDLES;

describe('RangeSlider Component Utils', () => {
  const pathWidth = 1200,
    tickDistance = 5,
    rangeMin = 20,
    rangeMax = 260;
  it('should return rangeMin value when pathX lesser than 0', () => {
    const pathX = -12;
    expect(
      getHandleDragPosition(pathWidth, pathX, tickDistance, rangeMin, rangeMax),
    ).toBe(rangeMin);
  });

  it('should return maximum value allowed when pathX greater than pathWidth', () => {
    const pathX = 1300;
    expect(
      getHandleDragPosition(pathWidth, pathX, tickDistance, rangeMin, rangeMax),
    ).toBe(rangeMax);
  });

  it('should return apropriate value when pathX is within range', () => {
    const pathX = 300;
    expect(
      getHandleDragPosition(pathWidth, pathX, tickDistance, rangeMin, rangeMax),
    ).toBe(80);
  });

  it('should only modify the dragging handle value', () => {
    const minHandleValue = 40;
    const maxHandleValue = 160;
    const handlestate = getHandleState(
      1200,
      600,
      5,
      MIN_HANDLE,
      minHandleValue,
      maxHandleValue,
      0,
    );
    expect(handlestate.minHandleValue).not.toBe(minHandleValue);
  });

  it('should NOT modify non-dragging handle value: max', () => {
    const minHandleValue = 40;
    const maxHandleValue = 160;
    const handlestate = getHandleState(
      1200,
      600,
      5,
      MIN_HANDLE,
      minHandleValue,
      maxHandleValue,
      0,
    );
    expect(handlestate.maxHandleValue).toBe(maxHandleValue);
  });
  it('should NOT modify non-dragging handle value: min', () => {
    const minHandleValue = 40;
    const maxHandleValue = 160;
    const handlestate = getHandleState(
      1200,
      600,
      5,
      MAX_HANDLE,
      minHandleValue,
      maxHandleValue,
      0,
    );
    expect(handlestate.minHandleValue).toBe(minHandleValue);
  });
});
