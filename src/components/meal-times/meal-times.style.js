import styled from 'styled-components';

import { colors, fontSize, spacing, zIndexes } from 'src/core';
import { convertPxToRem } from 'src/utils';

export const Container = styled.div`
  height: 3rem;
  margin-left: ${props => convertPxToRem(props.marginLeft)};
  margin-right: ${props => convertPxToRem(props.marginRight)};
  border-bottom: 1px solid ${colors.silverDark};
  position: relative;
  background: ${colors.white};
  top: 0.625rem;
  z-index: ${zIndexes.overlay};
`;

Container.displayName = 'Container';

export const MealTimesContainer = styled.div`
  height: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

MealTimesContainer.displayName = 'MealTimesContainer';

export const MealTime = styled.div`
  display: flex;
  padding: ${props => props.p || `0 ${spacing.one}`};
  flex-direction: column;
  align-items: ${props => props.alignItems || 'center'};
  width: ${props => props.width}%;
  height: 1.5rem;
  font-weight: ${props => (props.bold ? 'bold' : 'inherit')};
  border-right: ${props =>
    props.showBorder ? `1px solid ${colors.silverDark}` : 'none'};
  &:first-child {
    border-left: ${props =>
      props.showBorder ? `1px solid ${colors.silverDark}` : 'none'};
  }
`;

MealTime.displayName = 'MealTime';

export const MealTitle = styled.div`
  font-size: ${fontSize.p};
  width: 100%;
  & div {
    height: 1.5rem;
    line-height: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: ${props => props.textAlign || 'center'};
  }
`;

MealTitle.displayName = 'MealTitle';
