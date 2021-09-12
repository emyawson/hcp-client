import styled from 'styled-components';

import { weight } from 'src/components/fonts/weights';
import { borderRadius } from 'src/core';
import { combineRems } from 'src/utils';

export const OrgStockHistoryItemWrapper = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.four};
  width: 100%;
`;

export const OrgStockHistoryHeader = styled.div`
  background: ${props => props.theme.colors.blueMarineAlpha};
  border-radius: ${borderRadius.three};
  color: ${props => props.theme.colors.blue};
  font-size: ${props => props.theme.fontSize.p};
  font-weight: ${weight.semiBold};
  margin-bottom: ${props => props.theme.spacing.four};
  padding: ${props =>
    `${combineRems(props.theme.spacing.two, props.theme.spacing.three)} ${
      props.theme.spacing.four
    }`};
  text-transform: uppercase;
  width: 100%;
`;
