import styled from 'styled-components';

import {
  breakpoints,
  fontSize,
  colors,
  spacing,
  transitions,
  complexStyles,
} from 'src/core';
import { Link } from 'src/components/link';
import { combineRems } from 'src/utils';
import { weight } from 'src/components/fonts/weights';

export const PatientSummaryDataPointBlock = styled.div`
  display: flex;
  flex-flow: column wrap;
  box-sizing: border-box;
  padding-right: ${spacing.four};
  padding-left: ${spacing.four};
  border-left: ${props =>
    props.setSeparator ? `1px solid ${colors.grayLighter}` : null};
`;
PatientSummaryDataPointBlock.displayName = 'PatientSummaryDataPointBlock';

export const PatientSummaryDataPointBlockName = PatientSummaryDataPointBlock.extend`
  padding: ${spacing.three} 0 ${spacing.three} ${spacing.one};
`;
PatientSummaryDataPointBlockName.displayName =
  'PatientSummaryDataPointBlockName';

export const PatientSummaryEditPatientBlock = PatientSummaryDataPointBlock.extend`
  margin-left: auto;
  @media (min-width: ${breakpoints.medium}) {
    margin-right: ${spacing.two};
  }
  @media (min-width: ${breakpoints.large}) {
    margin-right: ${combineRems(spacing.four, spacing.two)};
  }
  padding: ${combineRems(spacing.one, spacing.two)} 0 0
    ${combineRems(spacing.one, spacing.two)};
`;
PatientSummaryEditPatientBlock.displayName = 'PatientSummaryEditPatientBlock';

export const PatientSummaryDataPointHeader = styled.span`
  font-size: ${fontSize.caption};
  font-weight: ${weight.semiBold};
  text-transform: ${complexStyles.textStyles.caps.textTransform};
  line-height: 1.33;
  color: ${colors.grayMedium};
  margin: 0 0 0.57rem 0;
`;
PatientSummaryDataPointHeader.displayName = 'PatientSummaryDataPointHeader';

export const PatientSummaryDataPointContent = styled.span`
  font-size: ${fontSize.p};
  font-weight: ${weight.bold};
  text-transform: ${complexStyles.textStyles.caps.textTransform};
  line-height: 1.14;
  color: ${colors.grayDark};
`;
PatientSummaryDataPointContent.displayName = 'PatientSummaryDataPointContent';

export const PatientSummaryDataPointName = styled.span`
  font-size: ${fontSize.display2};
  font-weight: ${weight.semiBold};
  color: ${colors.darkBlueMarine};
  text-align: left;
`;
PatientSummaryDataPointName.displayName = 'PatientSummaryDataPointName';

export const PatientSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
`;
PatientSummaryContainer.displayName = 'PatientSummaryContainer';

export const PatientSummaryItemsContainer = PatientSummaryContainer.extend`
  flex-direction: row;
  height: 5.125rem;
`;
PatientSummaryItemsContainer.displayName = 'PatientSummaryItemsContainer';

export const PatientSummaryLineItem = styled.p`
  margin: 0 ${spacing.three} 0 0;

  @media (min-width: ${breakpoints.medium}) {
    margin-right: ${combineRems(spacing.one, spacing.three)};
    flex-shrink: 0; // Temporary fix until redesign
  }

  @media (min-width: ${breakpoints.large}) {
    margin-right: ${spacing.four};
  }
`;
PatientSummaryLineItem.displayName = 'PatientSummaryLineItem';

export const PatientNameLineItem = PatientSummaryLineItem.extend`
  color: ${colors.charcoal};
  font-weight: ${weight.bold};
`;
PatientNameLineItem.displayName = 'PatientNameLineItem';

export const EditPatientLineItem = PatientSummaryLineItem.extend`
  margin-left: auto;
  margin-right: 0;
  min-width: 5rem;

  @media (min-width: ${breakpoints.medium}) {
    margin-right: 0;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-right: 0;
  }
`;
EditPatientLineItem.displayName = 'EditPatientLineItem';

export const EditPatientLink = styled(Link)`
  color: ${props => props.theme.colors.brandBlue};
  margin-right: -${props => props.theme.spacing.three};
  padding: 0 ${props => props.theme.spacing.three};

  &:visited {
    color: ${props => props.theme.colors.brandBlue};
  }

  &:hover {
    color: ${props => props.theme.colors.brandBlueDark};
    path {
      fill: ${props => props.theme.colors.brandBlueDark};
    }
  }
`;
EditPatientLink.displayName = 'EditPatientLink';

export const EditPatientLinkLabelSpan = styled.span`
  font-size: ${fontSize.p};
  text-transform: uppercase;
  transition: ${transitions.default};
`;
EditPatientLinkLabelSpan.displayName = 'EditPatientLinkLabelSpan';

export const EditPatientLinkIconSpan = styled.span`
  margin-right: ${props => props.theme.spacing.two};
  svg {
    display: inline-block;
    vertical-align: bottom;
  }
  path {
    transition: ${transitions.default};
  }
`;
EditPatientLinkIconSpan.displayName = 'EditPatientLinkIconSpan';
