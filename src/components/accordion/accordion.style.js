import styled from 'styled-components';

import {
  borderRadius,
  boxShadows,
  colors,
  fontSize,
  spacing,
  transitions,
  zIndexes,
} from 'src/core';
import { CardSection } from 'src/components/card/card-base/card-base.style';
import { convertPxToRem } from 'src/utils';

import { weight } from '../fonts/weights';

const hideToggleWhenActive = false;
const colorActive = colors.brandBlue;
const colorDisabled = colors.grayLight;
const titleBorderRadius = borderRadius.three;
const activeBorderSize = convertPxToRem(3);

const isActiveAccordionHeader = props => props.isNested && props.active;

export const AccordionContainerDiv = styled.div`
  width: 100%;
`;

export const AccordionItemDiv = styled.div`
  margin-bottom: ${spacing.four};
`;

export const AccordionItemContentDiv = styled.div`
  max-height: ${props => (props.active ? '999px' : '0')};
  overflow: ${props => (props.active ? 'visible' : 'hidden')};

  ${CardSection} {
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-left: ${activeBorderSize} solid
      ${props => (props.active ? colors.brandBlue : colors.silver)};
    transition: ${transitions.default};
  }
`;

export const AccordionTitleDiv = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid
    ${props =>
      isActiveAccordionHeader(props) ? colors.quartzBlue : colorDisabled};
  border-left: ${activeBorderSize} solid
    ${props => (props.active ? colorActive : colorDisabled)};
  border-radius: ${borderRadius.three};
  border-bottom-left-radius: ${props =>
    isActiveAccordionHeader(props) ? '0' : titleBorderRadius};
  border-bottom-right-radius: ${props =>
    isActiveAccordionHeader(props) ? '0' : titleBorderRadius};

  display: flex;
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  position: relative;
  transition: ${transitions.default};
  z-index: ${zIndexes.foreground};

  // Solves issue with CSS border rendering,
  // Where intersection of different left/bottom borders created a small gap
  &::after {
    content: '';
    background-color: ${colorActive};
    display: ${props => (isActiveAccordionHeader(props) ? 'block' : 'none')};
    height: 1px;
    position: absolute;
    top: 100%;
    right: 100%;
    width: ${activeBorderSize};
  }
`;

export const AccordionToggleDiv = AccordionTitleDiv.extend`
  &:hover,
  &:focus {
    box-shadow: ${props => (props.disabled ? 'none' : boxShadows.one)};
    outline: none;
  }
  &:active {
    box-shadow: ${props => (props.disabled ? 'none' : boxShadows.two)};
  }
`;

export const AccordionToggleContentDiv = styled.div`
  justify-self: flex-start;
  width: 100%;
`;

export const AccordionToggleButtonContainerDiv = styled.div`
  align-self: stretch;
  background-color: ${props => (props.disabled ? colorDisabled : colorActive)};
  display: ${props =>
    props.disabled && hideToggleWhenActive ? 'none' : 'flex'};
  min-width: ${spacing.four};
  margin-left: auto;
  transition: ${transitions.default};

  button > span,
  button:hover > span,
  button:focus > span {
    background: ${colors.clear};
  }
`;
