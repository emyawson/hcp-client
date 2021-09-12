import styled from 'styled-components';

import { colors, fontSize, spacing } from 'src/domains/diagnostics/styles';

const handleHeight = 20;
const handleWidth = 20;
const pathHeight = 6;
const tickLabelWidth = 64;

export const DateSliderWrapper = styled.div`
  height: 4rem;
  position: relative;
  z-index: 1;
  user-select: none;
  display: flex;
`;

DateSliderWrapper.displayName = 'DateSliderWrapper';

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
  background-color: ${props =>
    props.disabled ? colors.grayLight : colors.blueFaded};
  margin: 0.875rem 2.25rem;
  flex-grow: 1;
`;

Path.displayName = 'Path';

export const InnerPath = styled.div`
  position: absolute;
  z-index: 1;
  height: ${pathHeight / 16}rem;
  background-color: ${props =>
    props.disabled ? colors.grayLight : colors.blue};
  top: 0;
  left: ${props => props.left || 0}px;
  width: ${props => props.width || 0}px;
  cursor: ew-resize;
`;

InnerPath.displayName = 'InnerPath';

export const TickWrapper = styled.div`
  height: 2rem;
  position: relative;
  z-index: 2;
  pointer-events: none;
`;

DateSliderWrapper.displayName = 'DateSliderWrapper';

export const Tick = styled.div`
  width: ${tickLabelWidth / 16}rem;
  position: absolute;
  top: 1.5rem;
  left: ${props => (props.left || 0) - tickLabelWidth / 2}px;
  text-align: center;
  font-size: ${fontSize.caption};
  &::before {
    content: '';
    width: 0.1875rem;
    height: ${pathHeight / 16}rem;
    background: ${colors.white};
    position: absolute;
    left: ${(tickLabelWidth - 3) / 2}px;
    top: -1.5rem;
  }
`;

Tick.displayName = 'Tick';

export const DatePopup = styled.div`
  position: relative;
  top: -2rem;
  left: calc(50% - 2.75rem);
  width: 5.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  color: ${colors.white};
  background-color: ${colors.blue};
  font-size: ${fontSize.p};
  text-align: center;
  border-radius: 3px;
  border: 1px solid ${colors.white};
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: ${colors.blue} transparent transparent transparent;
    position: absolute;
    top: 100%;
    left: calc(50% - 5px);
  }
`;

DatePopup.displayName = 'DatePopup';

export const ButtonGroup = styled.div`
  margin-top: ${spacing.four};
  & button {
    margin-left: ${props => (props.rightSide ? spacing.two : 0)};
    margin-right: ${props => (props.leftSide ? spacing.two : 0)};
  }
`;

ButtonGroup.displayName = 'ButtonGroup';

export const DateSliderButton = styled.button`
  height: 1.875rem;
  width: 1.875rem;
  border-radius: 3px;
  background: ${colors.white};
  border: none;
  padding: 0;
`;

DateSliderButton.displayName = 'DateSliderButton';
