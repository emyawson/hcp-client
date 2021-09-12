import { injectGlobal } from 'styled-components';

import {
  borderRadius,
  boxShadow,
  colors,
  spacing,
  transitionEasing,
  transitionSpeed,
  zIndexes,
} from 'src/core';
import {
  fadeIn,
  fadeOut,
  slideUpFadeIn,
  slideDownFadeOut,
  slideOnscreenFadeIn,
  slideOffscreenFadeOut,
} from 'src/core/styles/animations';
import { convertPxToRem } from 'src/utils';

const { fast, slow } = transitionSpeed;
const { enter, exit } = transitionEasing;

const modalContentMinHeight = convertPxToRem(180);
const modalContentMinWidth = convertPxToRem(336);
const modalContentMaxWidth = convertPxToRem(960);

// tslint:disable:no-unused-expression
/**
 * -----------------------------------------------------------------------------
 * Modal lightboxes - Sourced and modified from react-accessible-modal library
 * -----------------------------------------------------------------------------
 *
 * As of 2015, the vertical-align: middle table is still the best cross-browser
 * way to vertically centre stuff. This modal component uses this pattern with
 * the following structure:
 *
 * <div class="modal modal--active">
 *     <div class="modal__table">
 *         <div class="modal__center">
 *             <div class="modal__content">
 *                 Hello!
 *             </div>
 *         </div>
 *     </div>
 * </div>
 *
 */
injectGlobal`
.u-body-modal-active {
  overflow: hidden;
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndexes.modal};
  animation: ${fadeIn} ${fast} ${enter} 0s backwards;
}


.modal--exit {
  animation: ${fadeOut} ${slow} ${exit} ${slow} forwards;
}

.modal--exit .modal__content {
  animation: ${slideDownFadeOut} ${slow} ${exit} ${slow}ms forwards;
}

.modal--exit .modal__close {
  animation: ${slideOffscreenFadeOut} ${slow} ${exit} 0ms forwards;
}


.modal__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndexes.foreground};
  background-color: ${colors.transparentBlack};
}


.modal__table {
  display: table;
  position: relative;
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.modal__center {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  animation: ${fadeIn} ${fast} ${enter} ${transitionSpeed.default} backwards;
}

.modal__content {
  border-radius: ${borderRadius.three};
  box-shadow: ${boxShadow({ color: colors.black, depth: 'alert' })};
  display: inline-block;
  position: relative;
  z-index: ${zIndexes.overlay};
  max-width: ${modalContentMaxWidth};
  min-width: ${modalContentMinWidth};
  min-height: ${modalContentMinHeight};
  padding: ${spacing.three} ${spacing.four};
  background: ${colors.white};
  animation: ${slideUpFadeIn} ${slow} ${enter} ${slow} backwards;
}


.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${zIndexes.overlay};
  padding: .9rem 1.35rem 1.1rem;
  font-size: 2em;
  line-height: 1;
  color: ${colors.white};
  cursor: pointer;
  background: ${colors.clear};
  animation: ${slideOnscreenFadeIn} ${slow} ${enter} ${
  transitionSpeed.default
} backwards;
}

.modal__close:hover,
.modal__close:active {
  color: ${colors.white};
  background: ${colors.transparentGrayDark};
}


.modal__control--inside .modal__close {
  top: -2rem;
  right: -2rem;
  border-radius: 100%;
  animation: ${slideUpFadeIn} ${slow} ${enter} ${
  transitionSpeed.default
} backwards;
}
`; // tslint:enable:no-unused-expression
