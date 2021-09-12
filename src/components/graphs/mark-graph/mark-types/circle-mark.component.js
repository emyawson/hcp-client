import React from 'react';

const defaultColor = '#000';

type Props = {
  strokeColor: string,
  fillColor: string,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
  opacity: number,
};

export const CircleMark = ({
  strokeColor,
  fillColor,
  mouseEnterHandler,
  mouseLeaveHandler,
  opacity = 1,
}: Props) => (
  <circle
    cx="0"
    cy="0"
    r="3"
    stroke={strokeColor || defaultColor}
    onMouseEnter={mouseEnterHandler}
    onMouseLeave={mouseLeaveHandler}
    fill={fillColor || defaultColor}
    strokeWidth="2"
    opacity={opacity}
  />
);
