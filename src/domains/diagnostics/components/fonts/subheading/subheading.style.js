import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

// 16px
export const Subheading = styled.p`
  font-size: 1rem;
  font-weight: ${weight};
`;

export const TitleMed = Subheading.extend`
  color: ${colors.charcoal};
  font-weight: ${weight.semiBold};
  text-transform: capitalize;
`;
