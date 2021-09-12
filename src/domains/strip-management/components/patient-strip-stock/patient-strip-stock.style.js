import styled from 'styled-components';

import { spacing } from 'src/core';
import { P, Subheading, weight } from 'src/components';
import { combineRems } from 'src/utils';

export const PatientStripsStockContainerDiv = styled.div``;

export const PatientStripsStockHeader = styled.header`
  margin-bottom: ${combineRems(spacing.two, spacing.three)};
`;

export const PatientStripsStockTitle = Subheading.extend`
  font-weight: ${weight.bold};
  margin: 0 auto 1em;
`;

export const PatientStripsStockFormLabel = P.extend`
  font-weight: ${weight.semiBold};
  margin: 0 auto;
`;

export const PatientStripsStockFormDiv = styled.div`
  padding: ${spacing.two} 0 0;
  display: flex;
`;

export const PatientStripsStockInputContainerDiv = styled.div`
  margin-right: ${spacing.four};
`;

export const PatientStripsSubmitDiv = styled.div`
  align-items: center;
  display: flex;
`;

export const PatientStripsStockInputLabel = P.extend`
  font-weight: ${weight.semiBold};
  margin: 0 0;
  padding-bottom: ${spacing.one};
`;
