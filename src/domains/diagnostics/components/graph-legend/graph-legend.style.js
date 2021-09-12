import styled from 'styled-components';

import { colors, spacing } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.two} ${spacing.two} 0 ${spacing.two};
  height: 100%;
`;

export const Title = styled.div`
  color: ${colors.blue};
  font-weight: ${weight.bold};
  padding: ${spacing.one} ${spacing.three};
  margin-bottom: ${spacing.one};
`;

export const LegendListsContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const LegendList = styled.ul`
  list-style: none;
  border-right: ${props =>
    props.noBorder ? 'none' : `0.0625rem solid ${colors.grayLight}`};
  flex: 1;
  margin: 0;
  padding: 0 ${spacing.three};
`;

export const LegendListSectionHeader = styled.div`
  color: ${colors.grayDark};
  padding: ${spacing.two} 0;
`;

export const RotatedIconContainer = styled.div`
  display: inline-block;
  transform: rotate(${props => `${props.rotationAngle}deg`});
`;
