import styled from 'styled-components';

import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { spacing, colors } from 'src/domains/diagnostics/styles';

import { HEADER_MODE } from './card-collapsable.constant';

import { CardTitle } from '../card-header/card-header.style';

const TITLE_COLOR_FROM_MODE = {
  [HEADER_MODE.DEFAULT]: colors.grayDark,
  [HEADER_MODE.DISABLED]: colors.grayLight,
  [HEADER_MODE.ACTIVE]: colors.brandBlue,
};
export const CardCollapsableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-weight: ${weight.bold};
`;
CardCollapsableHeader.displayName = 'CardCollapsableHeader';

export const CardCollapsableTitle = styled(CardTitle)`
  font-weight: ${weight.bold};
  color: ${props => TITLE_COLOR_FROM_MODE[props.mode]};
  margin: 0;
`;

export const CollapsableContentDiv = styled.div`
  height: ${props => (props.isCollapsed ? '0' : 'auto')};
  overflow: hidden;
  padding-top: ${props => (props.isCollapsed ? '0' : spacing.three)};
`;

export const CardCollapsableHeaderWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: ${props => (props.isDisabled ? 'default' : 'pointer')};
`;
