import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

export const LabelledDropdownContainerDiv = styled.div`
  display: flex;
  flex-direction: ${props => (props.labelIsInline ? 'row' : 'column')};
  align-items: ${props => (props.labelIsInline ? 'center' : 'stretch')};
`;

export const DropdownLabel = styled.label`
  color: ${colors.charcoal};
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  padding-${props => (props.labelIsInline ? 'right' : 'bottom')}: ${
  spacing.three
};
`;
