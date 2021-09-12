import styled from 'styled-components';

import { spacing, fontSize, colors } from 'src/core';
import { weight } from 'src/components/fonts/weights';

export const AlertHeader = styled.h3`
  margin: 0;
  padding: 0;
  padding-left: ${spacing.one};
  width: 100%;
  color: ${colors.black};
  font-size: ${fontSize.subheading};
  font-weight: ${weight.semiBold};
`;

export const AlertContainer = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

export const AlertItem = styled.div`
  margin: ${spacing.two} 0 0;
`;

export const AlertItemBig = styled.div`
  margin: 0 0 ${spacing.three} 0;
  width: 100%;
`;

export const AlertItemContent = styled.p`
  padding-bottom: ${spacing.one};
  color: ${colors.black};
  font-size: ${fontSize.p};
  font-weight: ${weight.light};
`;

export const AlertItemContentSpan = styled.span`
  padding-right: ${spacing.two};
`;
