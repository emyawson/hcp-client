import styled, { css } from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';

import { Column } from './column.style';

export const dayColumnStyle = css`
  min-width: 5.9rem;
`;

export const DayColumn = styled(Column)`
  ${dayColumnStyle};
  position: relative;
  &:after {
    position: absolute;
    top: ${spacing.two};
    left: 0;
    bottom: 0.375rem;
    width: 0.1875rem;
    border-radius: 0.1875rem;
    background: ${colors.blue};
    ${props => (props.highlight ? 'content: "";' : null)};
  }
`;
