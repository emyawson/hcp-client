import styled from 'styled-components';

import { HrReset } from 'src/core/styles/resets';
import { combineRems, convertPxToRem } from 'src/utils';

export const PatientInfoWrapper = styled.div`
  padding: ${props => props.theme.spacing.four}
    ${props => props.theme.spacing.five};
`;
PatientInfoWrapper.displayName = 'PatientInfoWrapper';

export const CreateNewPatientHeader = styled.h1`
  color: ${props => props.theme.colors.brandBlue};
  font-size: ${props => props.theme.fontSize.headline};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  line-height: 1;
  margin: 0 auto
    ${props => combineRems(props.theme.spacing.one, props.theme.spacing.three)};
`;

export const CreateNewPatientSubHeader = styled.h3`
  color: ${props => props.theme.colors.brandBlue};
  font-size: ${props => props.theme.fontSize.subheading};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin: 0 auto
    ${props => combineRems(props.theme.spacing.one, props.theme.spacing.two)};
  text-transform: uppercase;
`;

export const Hr = HrReset.extend`
  border-bottom: 1px solid ${props => props.theme.colors.grayLighter};
  width: 100%;
`;

export const SmallHr = HrReset.extend`
  border-bottom: 2px solid ${props => props.theme.colors.blueMarine};
  margin: 0 auto;
  max-width: ${props => props.theme.spacing.four};
  width: 100%;
`;

export const AllowPatientAccessWrapper = styled.div`
  align-items: center;
  display: flex;
  min-height: ${convertPxToRem(60)};
`;

export const CreateNewPatientFormHeader = styled.h4`
  font-size: ${props => props.theme.fontSize.p};
  margin: 0;
`;
