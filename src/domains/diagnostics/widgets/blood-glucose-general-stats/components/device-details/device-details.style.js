import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const DeviceDetailsTitleText = styled.span`
  font-size: ${fontSize.caption};
  color: ${colors.charcoal};
`;

export const DeviceDetailsContentText = styled.span`
  font-size: ${fontSize.p};
  color: ${colors.charcoal};
  font-weight: ${weight.semiBold};
`;

export const DeviceDetailsRow = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${spacing.three} 0 ${spacing.three} ${spacing.three};
  width: 17rem;
`;

export const DeviceDetailsCell = styled.div`
  padding: 0.1rem;
`;

export const DeviceDetailsHeader = styled.header`
  text-align: left;
  text-transform: uppercase;
  background-color: ${colors.blueMarineAlpha5};
  font-size: ${fontSize.p};
  font-weight: ${weight.bold};
  line-height: 0.71;
  letter-spacing: normal;
  color: ${colors.blue};
  padding: ${spacing.three};
`;

export const IconWrapper = styled.span`
  margin-right: ${spacing.one};
`;
