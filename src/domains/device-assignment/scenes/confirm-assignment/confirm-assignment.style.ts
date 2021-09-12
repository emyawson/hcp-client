import styled from 'styled-components';

import { weight } from 'src/components/fonts/weights';
import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  spacing,
  transitions,
} from 'src/core/styles';
import { convertPxToRem } from 'src/utils';

export const ChangePatientButton = styled.button`
  border: 1px solid ${colors.quartzBlue};
  color: ${colors.brandBlue};
  border-radius: ${borderRadius.three};
  background-color: ${colors.white};
  padding: ${spacing.two} ${spacing.three};
  font-size: ${fontSize.p};
  display: flex;
  align-items: center;
  font-weight: ${weight.semiBold};
  outline: none;
  transition: ${transitions.default};

  &:hover {
    cursor: pointer;
    box-shadow: ${boxShadow({ color: colors.black, depth: 'one' })};
  }
  &:focus {
    border: 1px solid ${colors.brandBlue};
  }
`;

export const ChangePatientLabel = styled.span`
  padding-left: ${spacing.one};
`;

export const UserInfoDetailDiv = styled.div`
  color: ${colors.charcoal};
  font-size: ${fontSize.subheading};
  font-weight: ${weight.semiBold};
  padding: ${spacing.three} 0 0 0;
`;

export const UnderlinedSubheaderDiv = styled.div`
  font-weight: ${weight.bold};
  font-size: ${fontSize.p};
  color: ${colors.brandBlue};
  text-transform: uppercase;
  padding-bottom: ${spacing.three};
  border-bottom: 1px solid ${colors.grayLighter};
  width: 100%;
  margin-bottom: ${spacing.four};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${convertPxToRem(54)};
`;
