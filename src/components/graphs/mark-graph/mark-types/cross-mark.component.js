import React from 'react';

const defaultColor = '#000';

type Props = {
  strokeColor?: string,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
  mouseClickHandler: () => void,
  opacity: number,
  selectedColor: string,
};

export const CrossMark = ({
  strokeColor,
  mouseEnterHandler,
  mouseLeaveHandler,
  mouseClickHandler,
  opacity = 1,
  selectedColor,
}: Props) => (
  <g
    stroke={selectedColor || strokeColor || defaultColor}
    strokeWidth="1.75"
    opacity={opacity}
  >
    <path d="M-5,-5 L5,5" />
    <path d="M5,-5 L-5,5" />
    <rect
      stroke="rgba(0, 0, 0, 0)"
      fill="rgba(0, 0, 0, 0)"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={event => {
        event.stopPropagation();
        mouseClickHandler();
      }}
      strokeWidth="2"
      width="8"
      height="8"
      transform="translate(-4, -4)"
    />
  </g>
);
