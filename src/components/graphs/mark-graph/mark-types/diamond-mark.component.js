import React from 'react';

const defaultColor = '#000';

type Props = {
  strokeColor: string,
  fillColor: string,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
};

export const DiamondMark = ({
  strokeColor,
  fillColor,
  mouseEnterHandler,
  mouseLeaveHandler,
}: Props) => (
  <rect
    stroke={strokeColor || defaultColor}
    fill={fillColor}
    onMouseEnter={mouseEnterHandler}
    onMouseLeave={mouseLeaveHandler}
    strokeWidth="2"
    width="3"
    height="3"
    transform="translate(-50, 18.5) rotate(45 50 50)"
  />
);
