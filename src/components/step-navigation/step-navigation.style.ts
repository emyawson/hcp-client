import { createStyledComponent } from 'src/utils';
import styled from 'styled-components';

import {
  borderRadius,
  boxShadows,
  colors,
  fontSize,
  fontWeights,
  spacing,
} from '../../core/styles/index';
import { ButtonReset, OrderedListReset } from '../../core/styles/resets/index';

type StepButtonProps = {
  isActive: boolean;
  isDisabled?: boolean;
  isReadOnly: boolean;
};

export const StepNavigationItemButton = styled(ButtonReset)`
  background-color: ${({ isActive }: StepButtonProps) =>
    isActive ? colors.lavender : colors.white};
  cursor: ${({ isReadOnly }) => (isReadOnly ? 'initial' : '')};
  display: block;
  height: 100%;
  padding: 1.5rem ${spacing.four};
  pointer-events: ${({ isReadOnly }) => (isReadOnly ? 'none' : 'auto')};
  width: 100%;
`;

export const StepNavigationItemLabel = styled.span`
  color: ${colors.brandBlue};
  font-size: ${fontSize.p};
  text-transform: uppercase;

  span: {
    vertical-align: middle;
  }
`;

export const StepNavigationContainer = styled.div`
  border-radius: ${borderRadius.six};
  box-shadow: ${boxShadows.two};
  overflow: hidden;
`;

export const StepNavigationWrapper = OrderedListReset.extend`
  display: flex;
  justify-content: stretch;
  list-style: none;
`;

export const StepNavigationListItem = styled.li`
  border-right: 1px solid ${colors.silver};
  display: block;
  flex-grow: 1;

  &:last-child {
    border-right: none;
  }
`;

export const SuccessWrapper = createStyledComponent<'div', { size: number }>(
  'div',
)`
  border-radius: ${borderRadius.circle};
  height: ${props => props.size}px;
  position: relative;
  display: inline-block;
  width: ${props => props.size}px;
  background: ${colors.brandBlue};
  margin-right: ${spacing.three};
  vertical-align: middle;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
`;

export const StepNavigationItemLabelText = styled.span`
  vertical-align: middle;
  font-weight: ${fontWeights.bold};
`;
