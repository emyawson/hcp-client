import styled from 'styled-components';

import { colors } from 'src/core/styles/colors';

export const KeylineHr = styled.hr`
  border: 0;
  border-bottom: 1px solid ${props => props.fillColor};
  display: block;
  width: 100%;
`;

KeylineHr.defaultProps = {
  fillColor: colors.grayLight,
};
