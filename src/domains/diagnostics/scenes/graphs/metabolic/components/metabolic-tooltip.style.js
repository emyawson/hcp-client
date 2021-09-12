import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

export const toolTipWidth = 180;

export const ContainerDiv = styled.div`
  width: ${convertPxToRem(toolTipWidth)};
  border-radius: 0.125rem;
  box-shadow: 0 0.0625rem 0.1875rem 0.125rem rgba(0, 0, 0, 0.15);
`;
ContainerDiv.displayName = 'ContainerDiv';

export const TopBarDiv = styled.div`
  background-color: ${colors.blue};
  height: 0.4375rem;
`;
TopBarDiv.displayName = 'TopBarDiv';

export const DateWrapper = styled.div`
  text-align: right;
  padding: ${spacing.two} 0.375rem;
  border-bottom: 0.0625rem solid ${colors.grayLight};
  font-size: ${fontSize.p};
  color: ${colors.grayMedium};
`;
DateWrapper.displayName = 'DateWrapper';

export const MeasurementsWrapper = styled.div`
  display: flex;
  padding: ${spacing.one};
`;
MeasurementsWrapper.displayName = 'MeasurementsWrapper';

export const Measurement = styled.div`
  padding: 0.375rem;
  flex-grow: 1;
`;
Measurement.displayName = 'Measurement';

export const MeasurementLabel = styled.div`
  font-size: ${fontSize.graphLabel};
  font-weight: ${weight.bold};
  letter-spacing: 0.06875rem;
  color: ${colors.grayMedium};
  margin-bottom: ${spacing.one};
`;
MeasurementLabel.displayName = 'MeasurementLabel';

export const MeasurementValue = styled.div`
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  color: ${colors.charcoal};
`;
MeasurementValue.displayName = 'MeasurementValue';

export const MeasurementUnit = styled.span`
  font-size: ${fontSize.graphLabel};
  color: ${colors.charcoal};
  margin-left: ${spacing.one};
`;
MeasurementUnit.displayName = 'MeasurementUnit';
