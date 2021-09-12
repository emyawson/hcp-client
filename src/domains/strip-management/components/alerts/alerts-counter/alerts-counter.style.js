import styled from 'styled-components';

import { spacing } from 'src/core';
import { convertPxToRem } from 'src/utils';

export const AlertsCounterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AlertsCounterCheckboxWrapper = styled.div`
  margin: 0 ${convertPxToRem(48)} ${spacing.two} 0;
  min-width: ${convertPxToRem(100)};
`;

export const AlertsCounterIncrementWrapper = styled.div`
  margin: 0 ${spacing.two} 0 0;
`;

export const NumberInputWithLabelWrapper = styled.div``;
