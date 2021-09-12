import styled from 'styled-components';

import { spacing } from 'src/domains/diagnostics/styles';

export const IntervalsDropdownValueContainer = styled.div`
  display: inline-block;
  min-width: 11rem;
  padding: 0.8rem 1rem;
`;

export const IntervalsDropdownValueWrapperDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
`;

export const IntervalsDropdownValueWrapperSpan = styled.span.attrs({
  role: 'option',
  'aria-selected': 'true',
})`
  margin-left: ${spacing.three};
`;
