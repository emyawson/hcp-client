import styled from 'styled-components';

import {
  boxShadows,
  borderRadius,
  colors,
  spacing,
} from 'src/domains/diagnostics/styles';

export const CardContainer = styled.div`
  padding: ${spacing.one} 0;
`;

CardContainer.displayName = 'CardContainer';

export const RowCard = styled.div`
  background-color: ${colors.white};
  border: 0.0625rem solid ${colors.grayLight};
  border-radius: ${borderRadius.three};
  box-shadow: ${boxShadows.two};
  display: flex;
`;

RowCard.displayName = 'RowCard';
