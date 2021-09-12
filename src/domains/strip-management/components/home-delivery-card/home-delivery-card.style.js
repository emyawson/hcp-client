import styled from 'styled-components';

import { spacing } from 'src/core';

export const HomeDeliveryCardContentContainer = styled.div`
  margin: ${spacing.four};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const HomeDeliveryCardButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${spacing.three} 0 0;
  width: 100%;

  button {
    margin: 0 ${spacing.one} ${spacing.two};
  }
`;
