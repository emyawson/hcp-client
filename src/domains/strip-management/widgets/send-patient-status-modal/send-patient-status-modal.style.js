import styled from 'styled-components';

import { InputTextArea } from 'src/components/input/input.style';

export const SendPatientStatusModalBodyDiv = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.four};
`;

export const SendPatientStatusButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: ${props => props.theme.spacing.two};
`;

export const SendPatientStatusTextArea = InputTextArea.extend`
  color: ${props => props.theme.colors.grayDark};
  font-size: ${props => props.theme.fontSize.p};
  margin: 0 auto ${props => props.theme.spacing.four};
  min-height: 5rem;
  padding: ${props => props.theme.spacing.three};
`;
