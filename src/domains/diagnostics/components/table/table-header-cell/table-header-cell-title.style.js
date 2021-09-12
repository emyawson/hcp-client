import styled from 'styled-components';

import { fontSize, spacing } from 'src/domains/diagnostics/styles';

export const TableHeaderCellTitle = styled.div`
  display: flex;
  padding: ${props => props.padding || `0 ${spacing.one}`};
  align-items: center;
  font-size: ${fontSize.p};
  width: 100%;
  & div {
    height: ${props => props.height || '1.5rem'};
    line-height: 1.5rem;
    overflow: ${props => props.overflow || 'hidden'};
    white-space: ${props => props.whiteSpace || 'nowrap'};
    text-overflow: ellipsis;
    text-align: ${props => props.textAlign || 'center'};
  }
`;
