import React from 'react';

import { Item, SVGContainer } from './legend-item.style';

export const LegendItem = ({ color, icon, label }) => (
  <Item color={color}>
    <span>
      <SVGContainer>{icon}</SVGContainer>
      {label}
    </span>
  </Item>
);
