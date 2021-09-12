import React from 'react';

import { CardContainer, RowCard } from './logbook-row-card.style';

// "style" is used by the react-virtualized library to improve render performance
export const LogbookRowCard = ({ children, keyText, style }) => (
  <CardContainer style={{ ...style }}>
    <RowCard>{children}</RowCard>
  </CardContainer>
);
