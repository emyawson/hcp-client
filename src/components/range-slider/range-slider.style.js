import styled from 'styled-components';

import { colors } from 'src/core/styles/colors';

const handleHeight = 20;
const handleWidth = 20;
const pathHeight = 6;

export const RangeSliderWrapper = styled.div`
  height: 4rem;
  position: relative;
  z-index: 1;
  user-select: none;
  display: flex;
`;

RangeSliderWrapper.displayName = 'RangeSliderWrapper';

export const Handle = styled.div`
  position: absolute;
  top: -${handleHeight / 2 - pathHeight / 2}px;
  left: ${props => (props.left || 0) - handleWidth / 2}px;
  z-index: ${props => (props.dragging ? 4 : 3)};
  width: ${handleHeight / 16}rem;
  height: ${handleHeight / 16}rem;
  border-radius: 50%;
  background-color: ${colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
`;

Handle.displayName = 'Handle';

export const Path = styled.div`
  position: relative;
  z-index: 1;
  height: ${pathHeight / 16}rem;
  border-radius: ${pathHeight}rem;
  background-color: ${colors.blueFaded};
  margin: 0 auto;
  flex-grow: 1;
`;

Path.displayName = 'Path';

export const InnerPath = styled.div`
  position: absolute;
  z-index: 1;
  height: ${pathHeight / 16}rem;
  background-color: ${colors.blue};
  top: 0;
  left: ${props => props.left || 0}px;
  width: ${props => props.width || 0}px;
`;

InnerPath.displayName = 'InnerPath';
