import React from 'react';

import { colors } from 'src/core/styles/colors';

import { AbstractAreaGraph } from './abstract-area-graph.component';

type Area = {
  x: number,
  y: number,
  y0: number,
};

type Areas = Array<Area[]>;

export const AreaGraph = (color: string) => (areas: Areas) =>
  areas.map((area, index) => (
    <AbstractAreaGraph
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      color={color}
      stroke={colors.clear}
      data={area}
    />
  ));
