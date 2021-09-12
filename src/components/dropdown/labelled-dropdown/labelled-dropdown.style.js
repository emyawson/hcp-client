import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/core';
import { weight } from 'src/components/fonts/weights';

export const LabelledDropdownContainerDiv = styled.div`
  display: flex;
  flex-direction: ${props => (props.labelIsInline ? 'row' : 'column')};
  align-items: ${props => (props.labelIsInline ? 'center' : 'stretch')};
`;

export const DropdownLabel = styled.label`
  color: ${colors.charcoal};
  display: flex;
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  justify-content: space-between;
  padding-${props => (props.labelIsInline ? 'right' : 'bottom')}: ${
  spacing.three
};
`;
