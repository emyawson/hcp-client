import styled from 'styled-components';
import { space } from 'styled-system';

import {
  colors,
  fontSize,
  spacing,
  zIndexes,
} from 'src/domains/diagnostics/styles';

export const Header = styled.div`
  padding: ${spacing.two};
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.grayLighter};
  background-color: ${colors.white};
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  padding: ${spacing.two};
  background-color: ${colors.white};
  width: 100%;
`;
export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 12.5rem;
  position: relative;
  z-index: ${zIndexes.overlay};

  & ${Row}:nth-child(odd) {
    background-color: ${colors.silverLight};
  }
`;

export const InnerRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${space};
`;

const Label = styled.span`
  ${space};
`;

export const SmallerLabel = Label.extend`
  font-size: ${fontSize.graphLabel};
`;

export const SmallLabel = Label.extend`
  font-size: ${fontSize.caption};
`;

export const MediumLabel = Label.extend`
  font-size: ${fontSize.p};
`;

export const LargeLabel = Label.extend`
  font-size: ${fontSize.subheading};
`;

export const GrayMediumLabel = MediumLabel.extend`
  color: ${colors.charcoal};
`;

export const GraySmallLabel = SmallLabel.extend`
  color: ${colors.charcoal};
`;

export const LightGraySmallLabel = SmallLabel.extend`
  color: ${colors.silverLight};
`;
