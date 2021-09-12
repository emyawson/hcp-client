import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';

export const UnitHeader = styled.div`
  border-right: 0.0625rem solid ${colors.greyAxis};
  flex: 1;
`;

UnitHeader.displayName = 'UnitHeader';
