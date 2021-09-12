import React from 'react';

import { colors } from 'src/core/styles/colors';

const defaultColor = colors.blueLight;

type Props = {
  strokeColor: string,
  fillColor: string,
  mouseEnterHandler: () => void,
  mouseLeaveHandler: () => void,
  mouseClickHandler: () => void,
  opacity: number,
  selectedColor: string,
};

export const TriangleMark = ({
  strokeColor,
  fillColor,
  mouseEnterHandler,
  mouseLeaveHandler,
  mouseClickHandler,
  opacity,
  selectedColor,
}: Props) => (
  <polygon
    stroke={selectedColor || strokeColor || defaultColor}
    fill={selectedColor || fillColor || defaultColor}
    onMouseEnter={mouseEnterHandler}
    onMouseLeave={mouseLeaveHandler}
    onClick={event => {
      event.stopPropagation();
      mouseClickHandler();
    }}
    points="0,10 5,0 10,10"
    transform="translate(-5, 0)"
    opacity={opacity}
  />
);
