import styled from 'styled-components';

import { convertPxToRem } from 'src/domains/diagnostics/utils';

export const Tooltip = styled.span`
  position: relative;
  z-index: 1;
  display: inline-block;
  text-align: center;
  line-height: ${({ theme }) => theme.spacing.three};
  margin-left: ${({ theme }) => theme.spacing.one};
  cursor: pointer;
  top: ${convertPxToRem(2)};
`;
