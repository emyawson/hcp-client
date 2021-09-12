import styled, { css } from 'styled-components';

import { GridContainer, GridItem } from 'src/components';
import { weight } from 'src/components/fonts/weights';
import {
  borderRadius,
  ButtonReset,
  colors,
  fontSize,
  spacing,
} from 'src/core/styles';
import { HrReset } from 'src/core/styles/resets';
import { combineRems, convertPxToRem } from 'src/utils';
import { hexToRGBA } from 'src/utils/color';

export const CancelButton = styled(ButtonReset)`
  color: ${colors.brandBlue};
  font-weight: bold;
  border: none;
  background-color: transparent;
  padding: ${spacing.three} ${spacing.four};
  outline: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    border-bottom: 1px solid ${colors.brandBlue};
  }
`;

export const FooterWrapper = styled.div`
  width: 100%;
  margin: 0 0 ${spacing.three} 0;
  display: flex;
  text-align: right;
  justify-content: flex-end;
`;

export const FooterWrapperCentered = FooterWrapper.extend`
  justify-content: center;
`;

export const OtherOptionsDiv = styled.div`
  font-size: ${fontSize.caption};
  font-weight: bold;
  color: ${colors.darkBlueMarine};
  padding-top: ${spacing.three};
`;

export const CaretLabel = styled.span`
  padding-left: ${spacing.two};
  font-weight: ${weight.regular};
  cursor: default;
`;

export const DeviceNumberTextDiv = styled.div`
  color: ${colors.charcoal};
  padding: ${spacing.three} 0;
`;

export const DeviceAssignmentCard = styled.div`
  width: 100%;
  border-top: 5px solid ${colors.brandBlue};
  border-radius: 6px;
  background-color: ${colors.white};
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  padding: ${spacing.five};
`;

export const HeaderWrapper = styled.div`
  color: ${colors.brandBlue};
  text-align: center;
  padding-bottom: ${spacing.two};
  & h2 {
    font-weight: ${weight.semiBold};
    margin: 0;
    padding-bottom: ${combineRems(spacing.two, spacing.three)};
  }
`;

export const Hr = styled.div`
  border-bottom: 1px solid ${colors.grayLighter};
  width: 100%;
`;

export const SmallHr = HrReset.extend`
  border-bottom: 2px solid ${colors.blueMarine};
  max-width: ${spacing.four};
`;

export const ContentWrapperTheme = css`
  background-color: ${colors.blueMarineAlpha5};
  border: 1px solid ${colors.quartzBlue};
  border-radius: ${borderRadius.three};
`;

export const Content = styled(GridContainer)`
  ${ContentWrapperTheme};
  padding: ${spacing.six} ${spacing.four};
  grid-column: 1/13;
`;

export const CenteredContentPanel = styled(GridItem)`
  display: flex;
  justify-content: center;
  padding: ${spacing.three};
`;

export const ContentPanel = styled(GridItem)`
  display: flex;
  padding: ${spacing.three};
  align-items: flex-start;
  align-content: flex-start;
`;

export const LargeIconWrapperDiv = styled.div`
  padding-right: ${spacing.five};
`;

export const MediumIconWrapperDiv = styled.div`
  padding-right: ${spacing.four};
`;

export const PanelContentRightDiv = styled.div``;

export const SerialNumberLabel = styled.span`
  padding-right: ${spacing.one};
  font-weight: ${weight.semiBold};
  color: ${colors.grayDark};
`;

export const SerialNumber = styled.span`
  font-weight: ${weight.semiBold};
  color: ${colors.grayDark};
`;

export const DeviceAssignmentResultTitle = styled.h2`
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.fontSize.display1};
  line-height: 1;
  margin: 0 auto
    ${({ theme }) => combineRems(theme.spacing.two, theme.spacing.three)};
`;

export const DeviceAssignmentResultSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.charcoal};
  font-size: ${({ theme }) => theme.fontSize.headline};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.2;
  margin: 0 auto;
  max-width: 75%;
`;

export const DeviceAssignmentResultHr = SmallHr.extend`
  margin: 0 auto ${({ theme }) => theme.spacing.four};
  max-width: ${convertPxToRem(52)};
`;

export const DeviceHeader = styled.h4`
  color: ${colors.brandBlue};
  font-size: ${fontSize.subheading};
  font-weight: ${weight.bold};
  margin: 0 0 ${combineRems(spacing.two, spacing.three)};
  text-transform: uppercase;
`;

export const DeviceErrorHeader = DeviceHeader.extend`
  color: ${colors.red};
`;

export const DeviceNameHeader = styled.h5`
  color: ${colors.charcoal};
  font-size: ${fontSize.title};
  font-weight: ${weight.bold};
  margin: 0 0 ${spacing.three};
`;

export const DeviceNumberText = styled.figure`
  background-color: ${hexToRGBA(colors.white, 0.9)};
  border: 1px solid ${colors.quartzBlue};
  border-radius: ${borderRadius.three};
  color: ${colors.grayDark};
  display: inline-block;
  font-weight: ${weight.semiBold};
  margin: 0;
  padding: ${spacing.two} ${combineRems(spacing.two, spacing.three)};
  text-transform: uppercase;
`;

export const DeviceAssignmentFeatureContent = styled.div`
  ${ContentWrapperTheme};
  display: flex;
  padding: ${combineRems(spacing.four, spacing.five)} 0;
`;

export const ContentColumn = styled.div`
  width: 50%;
`;

export const ContentLeft = ContentColumn.extend`
  display: flex;
  justify-content: flex-end;
  padding-right: ${spacing.five};
`;

export const ContentRight = ContentColumn.extend`
  padding-top: ${spacing.four};
`;
