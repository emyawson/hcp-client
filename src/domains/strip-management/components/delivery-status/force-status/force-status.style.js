import styled from 'styled-components';

import { spacing } from 'src/core';
import { InputTextArea } from 'src/components/input/input.style';

export const ForceStatusRowDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: ${spacing.three} 0;
  width: 100%;
`;

export const ForceStatusControlsDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1 0 20%;
  justify-content: center;
  padding-right: ${spacing.three};
  min-width: 8rem;
`;

export const ForceStatusControlSpan = styled.span`
  margin: 0 ${spacing.two};
`;

export const ForceStatusSubmitDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

export const ForceStatusReasonTextArea = InputTextArea.extend`
  flex: 1 1 80%;
`;
