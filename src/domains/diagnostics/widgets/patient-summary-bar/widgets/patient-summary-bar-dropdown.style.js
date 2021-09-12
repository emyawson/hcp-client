import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, spacing, transitions } from 'src/domains/diagnostics/styles';

export const PatientSummaryDropdownContainer = styled.div`
  margin-left: auto;
  position: relative;
`;
PatientSummaryDropdownContainer.displayName = 'PatientSummaryDropdownContainer';

export const PatientSummaryIconContainer = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom: ${spacing.three};
`;
PatientSummaryIconContainer.displayName = 'PatientSummaryIconContainer';

export const PatientSummaryBarDropdownActionListItem = styled.li`
  padding: 0 ${spacing.four};
  border-left: 3px solid ${colors.white};

  &:hover {
    background-color: ${colors.silverLight};
    border-left: 3px solid ${colors.silverLight};

    &:active {
      border-left: 3px solid ${colors.brandBlue};
    }
  }
`;
PatientSummaryBarDropdownActionListItem.displayName =
  'PatientSummaryBarDropdownActionListItem';

export const PatientSummaryBarDropdownActionListItemLink = styled(Link)`
  display: inline-block;
  width: 100%;
  color: ${colors.grayDark};
  text-transform: capitalize;
  text-decoration: none;
  padding: 1rem 0;

  &:hover {
    color: ${colors.charcoal};
  }

  &:active {
    color: ${colors.brandBlue};
  }
`;
PatientSummaryBarDropdownActionListItemLink.displayName =
  'PatientSummaryBarDropdownActionListItemLink';

export const PatientSummaryBarDropdownActionListItemLinkText = styled.span`
  text-decoration: none;
`;
PatientSummaryBarDropdownActionListItemLinkText.displayName =
  'PatientSummaryBarDropdownActionListItemLinkText';

// Set hover state on SVG icon within
export const CaretDownContainer = styled.div`
  display: inline-block;
  path {
    transition: ${transitions.default};
  }
  &:hover,
  &:focus {
    path {
      fill: ${colors.brandBlue};
    }
  }
`;
CaretDownContainer.displayName = 'CaretDownContainer';
