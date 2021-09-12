import React from 'react';

import { colors } from 'src/core/styles/colors';

const defaultColor = '#000';

type Props = {
  strokeColor: string,
  fillColor: string,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
  mouseClickHandler: () => void,
  opacity: number,
  selectedColor: string,
};

export const RectangleMark = ({
  strokeColor,
  fillColor,
  mouseEnterHandler,
  mouseLeaveHandler,
  mouseClickHandler,
  opacity = 1,
  selectedColor,
}: Props) => (
  <rect
    stroke={selectedColor || strokeColor || defaultColor}
    fill={fillColor === colors.white ? fillColor : selectedColor || fillColor}
    onMouseEnter={mouseEnterHandler}
    onMouseLeave={mouseLeaveHandler}
    onClick={event => {
      event.stopPropagation();
      mouseClickHandler();
    }}
    strokeWidth="2"
    width="7"
    height="7"
    transform="translate(-3, -3)"
    opacity={opacity}
  />
);
