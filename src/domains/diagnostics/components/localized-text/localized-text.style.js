import styled from 'styled-components';
import { fontSize, fontWeight, space, color, textStyle } from 'styled-system';

import { breakpoints } from 'src/domains/diagnostics/styles/breakpoints';

export const StyledLocalize = styled.span`
${space};
${fontSize};
${fontWeight};
${color};
${textStyle};
@media (min-width: ${breakpoints.medium}) {
  text-align: ${props => (props.textAlign ? props.textAlign : null)};
}
@media (min-width: ${breakpoints.large}) {
  text-align: left};
}
@media (min-width: 1280px) {
  text-align: left};
}
`;
