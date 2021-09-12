import styled from 'styled-components';

import { convertPxToRem } from 'src/utils';

export const IconDiv = styled.div`
  width: ${props => convertPxToRem(props.size)};
  height: ${props => convertPxToRem(props.size)};
  background-color: ${props => props.color};
  border-radius: 50%;
`;
