import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const PatientSummaryBarDropdownHeaderDiv = styled.div`
  color: ${colors.charcoal};
  text-transform: capitalize;
  font-size: ${fontSize.title};
  font-weight: ${weight.semiBold};
  border-bottom: 1px solid ${colors.grayLighter};
  padding-bottom: ${spacing.three};
  margin: ${spacing.four} ${spacing.four} 0;
`;
PatientSummaryBarDropdownHeaderDiv.displayName =
  'PatientSummaryBarDropdownHeaderDiv';

export const PatientSummaryBarDropdownActionList = styled.ul`
  list-style: none;
  color: ${colors.grayDark};
  font-weight: ${weight.semiBold};
  font-size: ${fontSize.p};
  margin: 0;
  padding: 0;
`;
PatientSummaryBarDropdownActionList.displayName =
  'PatientSummaryBarDropdownActionList';
