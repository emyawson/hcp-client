import styled from 'styled-components';

import { fontSize } from 'src/core';
import { P, Subheading, Title } from 'src/components/fonts';
import { convertPxToRem, combineRems } from 'src/utils';

export const FlexWrapperDiv = styled.div`
  color: ${props => props.theme.colors.charcoal};
  display: flex;
  padding: ${props =>
    combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  width: 100%;
`;

export const ManufacturerInfoLogoDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: ${props =>
    combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  min-width: ${convertPxToRem(80)};
`;

export const ManufacturerInfoWhiteLogoDiv = styled.div`
  display: flex;
  min-width: ${convertPxToRem(80)};
  justify-content: center;
  flex-direction: row;
  text-align: center;
  height: 100%;
  padding-left: ${props => props.theme.spacing.four};
`;

export const FactoryIconDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-right: ${props => props.theme.spacing.three};
`;

export const ManufacturerInfoTitle = Title.extend`
  color: ${props => props.theme.colors.brandBlue};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ManufacturerInfoSubTitle = Subheading.extend`
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

export const AddressDiv = FlexWrapperDiv.extend`
  background-color: ${props => props.theme.colors.silverLight};
  display: flex;
  ${ManufacturerInfoLogoDiv} {
    align-items: center;
    border-right: 1px solid ${props => props.theme.colors.grayLight};
  }
  ${ManufacturerInfoWhiteLogoDiv} {
    align-items: center;
    border-left: 1px solid ${props => props.theme.colors.grayLight};
    margin-left: ${props => props.theme.spacing.three};
  }

  ${P} {
    margin: 0 auto ${props => props.theme.spacing.one};
  }
`;

export const YearSpan = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${fontSize.title};
  margin-left: ${props => props.theme.spacing.two};
  margin-right: ${props => props.theme.spacing.two};
`;
