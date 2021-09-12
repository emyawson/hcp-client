import styled from 'styled-components';

import { colors } from 'src/domains/diagnostics/styles';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

import { weight } from '../weights';

export const Title = styled.h6`
  font-size: ${convertPxToRem(20)};
  font-weight: ${weight};
  margin: 0;
`;

export const TitleName = Title.extend`
  color: ${colors.brandBlue};
  font-weight: ${weight.semiBold};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'capitalize')};
`;
