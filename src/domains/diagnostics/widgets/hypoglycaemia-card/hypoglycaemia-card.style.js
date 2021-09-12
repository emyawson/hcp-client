import styled from 'styled-components';
import {
  flex,
  space,
  color,
  fontSize as fontSizeSystem,
  fontWeight,
  textAlign,
  flexDirection,
  alignItems,
  justifyContent,
} from 'styled-system';

import { colors, spacing } from 'src/domains/diagnostics/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

Container.displayName = 'HypoglycaemiaCard_Container';

export const Row = styled.div`
  display: flex;
  width: 100%;
  background-color: ${props =>
    props.blueBG ? colors.blueMarineAlpha : colors.white};
  ${flexDirection};
  ${textAlign};
  ${flex};
  ${space};
  ${color};
  ${justifyContent};
  ${alignItems};
`;

Row.displayName = 'HypoglycaemiaCard_Row';

export const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${alignItems};
  ${justifyContent};
  ${flex};
  ${flexDirection};
  ${space};
`;

Block.displayName = 'HypoglycaemiaCard_Block';

export const BlockMain = Block.extend`
  border-bottom: 1px solid ${colors.quartzBlue};
  margin: 0 ${spacing.three};

  & span {
    color: ${colors.blueMarine};
  }
`;

BlockMain.displayName = 'HypoglycaemiaCard_BlockMain';

export const Text = styled.span`
  ${fontSizeSystem};
  ${fontWeight};
`;

Text.displayName = 'HypoglycaemiaCard_Text';

export const Separator = styled.div`
  display: block;
  border-right: 1px solid ${colors.grayLighter};
  height: 45%;
`;

Separator.displayName = 'HypoglycaemiaCard_Seperator';
