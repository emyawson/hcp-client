import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';

export const KeylineHr = styled.hr`
  border: 0;
  border-bottom: 1px solid ${props => props.fillColor};
  display: block;
  width: 100%;
`;

KeylineHr.defaultProps = {
  fillColor: colors.grayLight,
};
