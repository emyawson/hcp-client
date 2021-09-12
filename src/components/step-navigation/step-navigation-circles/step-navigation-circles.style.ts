import styled from 'styled-components';

import {
  borderRadius,
  colors,
  fontSize,
  fontWeights,
  spacing,
} from 'src/core/styles';
import { ButtonReset, OrderedListReset } from 'src/core/styles/resets';
import { combineRems } from 'src/utils';

type StepButtonProps = {
  isActive: boolean;
  isDisabled?: boolean;
};

export const StepNavigationCirclesItemButton = styled(ButtonReset)`
  background-color: ${({ isActive }: StepButtonProps) =>
    isActive ? colors.brandBlue : colors.blueMarineAlpha};
  color: ${({ isActive }: StepButtonProps) =>
    isActive ? colors.white : colors.blueMarine};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 2px solid ${colors.quartzBlue};
  border-radius: ${borderRadius.circle};
  width: ${combineRems(spacing.three, spacing.two)};
  height: ${combineRems(spacing.three, spacing.two)};
  margin: 0 ${spacing.two};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSize.p};
  cursor: initial;
`;

export const StepNavigationCirclesItemLabel = styled.span`
  color: ${colors.brandBlue};
  font-size: ${fontSize.caption};
  text-transform: uppercase;
  position: absolute;
  top: -${combineRems(spacing.four, spacing.one)};
`;

export const StepNavigationCirclesContainer = styled.div`
  border-radius: ${borderRadius.six};
  grid-column: 1/13;
  display: flex;
`;

export const StepNavigationCirclesWrapper = OrderedListReset.extend`
  display: flex;
  align-items: center;
  list-style: none;
  position: relative;
  justify-content: center;
  width: 100%;
`;

export const StepNavigationCirclesListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepNavigationConnectingLine = styled.div`
  flex-grow: 1;
  background-color: ${colors.quartzBlue};
  height: 4px;
  max-width: 20rem;
  border-radius: ${borderRadius.three};
`;

export const StepNavigationCirclesItemLabelText = styled.span`
  font-weight: ${fontWeights.bold};
`;
