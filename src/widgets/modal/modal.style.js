import styled from 'styled-components';
import { minWidth } from 'styled-system';

import {
  colors,
  transitionEasing,
  transitionSpeed,
  boxShadow,
  spacing,
} from 'src/core';
import { fadeIn, slideUpFadeIn } from 'src/core/styles/animations';
import { Column } from 'src/components/column';

const { fast } = transitionSpeed;
const { enter } = transitionEasing;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${fadeIn} ${fast} ${enter} 0s backwards;
  background-color: ${colors.transparentBlack};
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.div`
  border-radius: 0.1875rem;
  box-shadow: 0 0.5625rem 0.8125rem 0.125rem rgba(51, 51, 51, 0.14),
    0 0.1875rem 1rem 0.1875rem rgba(51, 51, 51, 0.12),
    0 0.3125rem 0.375rem 0 rgba(51, 51, 51, 0.2);
  box-shadow: ${boxShadow({
    color: colors.black,
    depth: 'modal',
  })};
  display: inline-block;
  position: relative;
  z-index: 200;
  min-height: 11.25rem;
  background: #fff;
  animation: ${slideUpFadeIn} ${fast} ${enter} 0s backwards;
  max-width: 60rem;
`;

export const ModalBody = styled(Column)`
  ${minWidth};
`;
export const CommonHeader = styled.div`
  display: flex;
  color: ${colors.white};
  background-color: ${colors.brandBlue};
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.three} ${spacing.four};
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
`;
