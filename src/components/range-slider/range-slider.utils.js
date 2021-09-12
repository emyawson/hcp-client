import { HANDLES } from './range-slider.constants';

export const getHandleDragPosition = (
  pathWidth,
  pathX,
  tickDistance,
  rangeMin,
  rangeMax,
) => {
  if (pathX < 0) {
    return rangeMin;
  } else if (pathX > pathWidth) {
    return rangeMax;
  } else {
    return Math.ceil(pathX / tickDistance) + rangeMin;
  }
};

export const getHandleState = (
  pathWidth,
  pathX,
  tickDistance,
  draggingHandle,
  minHandleValue,
  maxHandleValue,
  rangeMin,
  rangeMax,
) => {
  let nextStartHandleValue =
    draggingHandle === HANDLES.MIN_HANDLE
      ? getHandleDragPosition(
          pathWidth,
          pathX,
          tickDistance,
          rangeMin,
          rangeMax,
        )
      : minHandleValue;
  let nextEndHandleValue =
    draggingHandle === HANDLES.MAX_HANDLE
      ? getHandleDragPosition(
          pathWidth,
          pathX,
          tickDistance,
          rangeMin,
          rangeMax,
        )
      : maxHandleValue;

  if (nextStartHandleValue > nextEndHandleValue) {
    nextStartHandleValue = minHandleValue;
    nextEndHandleValue = maxHandleValue;
  }

  return {
    maxHandleValue: nextEndHandleValue,
    minHandleValue: nextStartHandleValue,
  };
};
