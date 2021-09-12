import React from 'react';

import { CardSection } from './card-base.style';

export const CardBase = ({ cardStyles, width, height, children, ...props }) => (
  <CardSection cardStyles={cardStyles} width={width} height={height} {...props}>
    {children}
  </CardSection>
);
