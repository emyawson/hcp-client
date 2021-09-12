import styled from 'styled-components';

import { colors, fontSize } from 'src/core/styles';
import { weight } from 'src/components/fonts/weights';
import { GraphHintDiv } from 'src/domains/diagnostics/scenes/graphs/graph.style';

export const ContainerDiv = GraphHintDiv.extend`
  width: 180px;
`;

export const TopBar = styled.div`
  height: 7px;
  background-color: ${props => props.color || 'black'};
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.grayMedium};
  margin-right: 3px;
  transform: scale(0.7);
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px;
  margin-bottom: 5px;
  font-size: ${fontSize.p};
  color: ${colors.grayMedium};
  font-weight: ${weight.semiBold};
`;

export const DateLabel = styled.div`
  margin-left: auto;
`;

export const BGWrapper = styled.div`
  padding: 7px;
`;

export const BGLabel = styled.div`
  font-size: ${fontSize.graphLabel};
  color: ${colors.grayMedium};
  line-height: 13px;
  letter-spacing: 1.07px;
`;

export const BGValueWrapper = styled.div`
  color: ${colors.darkestGray};
  font-size: 11px;
  font-weight: ${weight.semiBold};
`;

export const BGValue = styled.span`
  font-size: 30px;
`;
