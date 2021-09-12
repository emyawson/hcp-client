import styled from 'styled-components';

import { transitions } from 'src/core';

export const PatientSummaryDropdownContainer = styled.div`
  margin-left: auto;
  position: relative;
`;
PatientSummaryDropdownContainer.displayName = 'PatientSummaryDropdownContainer';

export const PatientSummaryIconContainer = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom: ${props => props.theme.spacing.three};
`;
PatientSummaryIconContainer.displayName = 'PatientSummaryIconContainer';

// Set hover state on SVG icon within
export const CaretDownContainer = styled.div`
  display: inline-block;
  path {
    transition: ${transitions.default};
  }
  &:hover,
  &:focus {
    path {
      fill: ${props => props.theme.colors.brandBlue};
    }
  }
`;
CaretDownContainer.displayName = 'CaretDownContainer';
