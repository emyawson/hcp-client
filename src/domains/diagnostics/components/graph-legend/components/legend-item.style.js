import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';

export const SVGContainer = styled.span`
  margin-right: ${spacing.two};
`;

export const Item = styled.li`
  color: ${props => (props.color ? props.color : colors.black)};
  padding: ${spacing.one} 0;
`;
