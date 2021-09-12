import styled from 'styled-components';

import { Column } from 'src/components/column';

export const InfoContainer = styled(Column)`
  align-items: center;
  padding: ${props => props.theme.spacing.three};
`;

export const ContentWrapper = styled(Column)`
  padding: ${props => props.theme.spacing.four};
`;
