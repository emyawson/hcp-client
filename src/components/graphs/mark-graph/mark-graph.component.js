import React from 'react';

import type { Mark } from 'src/types';

import { AbstractMarkGraph } from './abstract-mark-graph.component';
import {
  CircleMark,
  CrossMark,
  DiamondMark,
  RectangleMark,
  TriangleMark,
} from './mark-types';

const formatShapes = data => (
  mouseEnterHandler,
  mouseLeaveHandler,
  mouseClickHandler,
  opacity,
  selectedColor,
) =>
  data.map(datum => {
    const markDatum = datum;
    switch (datum.shape.type) {
      case 'circle':
        markDatum.customComponent = () => (
          <CircleMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            opacity={opacity}
            selectedColor={selectedColor}
            {...datum.shape.style}
          />
        );
        break;
      case 'cross':
        markDatum.customComponent = () => (
          <CrossMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            mouseClickHandler={() =>
              mouseClickHandler && mouseClickHandler(datum)
            }
            opacity={opacity}
            selectedColor={selectedColor}
            {...datum.shape.style}
          />
        );
        break;
      case 'rectangle':
        markDatum.customComponent = () => (
          <RectangleMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            mouseClickHandler={() =>
              mouseClickHandler && mouseClickHandler(datum)
            }
            opacity={opacity}
            selectedColor={selectedColor}
            {...datum.shape.style}
          />
        );
        break;
      case 'triangle':
        markDatum.customComponent = () => (
          <TriangleMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            mouseClickHandler={() =>
              mouseClickHandler && mouseClickHandler(datum)
            }
            opacity={opacity}
            selectedColor={selectedColor}
            {...datum.shape.style}
          />
        );
        break;
      case 'diamond':
        markDatum.customComponent = () => (
          <DiamondMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            {...datum.shape.style}
          />
        );
        break;
      default:
        markDatum.customComponent = () => (
          <CrossMark
            mouseEnterHandler={() => mouseEnterHandler(datum)}
            mouseLeaveHandler={() => mouseLeaveHandler()}
            opacity={opacity}
            selectedColor={selectedColor}
          />
        );
    }
    return markDatum;
  });

export const MarkGraph = (marks: Array<Mark[]>) => (
  mouseEnterHandler: Function = () => {},
  mouseLeaveHandler: Function = () => {},
  mouseClickHandler: Function = () => {},
  opacity: number,
  selectedColor: string,
) =>
  marks.map((mark, index) => (
    <AbstractMarkGraph
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      data={formatShapes(mark)(
        mouseEnterHandler,
        mouseLeaveHandler,
        mouseClickHandler,
        opacity,
        selectedColor,
      )}
    />
  ));
