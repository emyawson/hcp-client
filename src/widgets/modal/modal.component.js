import React from 'react';
import { isNil, equals } from 'ramda';

import { MODAL_TYPES } from 'src/core';
import { RenderIf } from 'src/utils';
import { Portal } from 'src/components';

import { ModalOverlay, ModalWrapper, ModalCard } from './modal.style';
import {
  LoadingModal,
  DisclaimerModal,
  SupportModal,
  DTCModal,
  ManufacturerInfoModal,
} from './components';

const modalComponentMap = {
  [MODAL_TYPES.LOADING]: LoadingModal,
  [MODAL_TYPES.DISCLAIMER]: DisclaimerModal,
  [MODAL_TYPES.SUPPORT]: SupportModal,
  [MODAL_TYPES.DTC]: DTCModal,
  [MODAL_TYPES.MANUFACTURER_INFO]: ManufacturerInfoModal,
};

const renderModalComponent = (type, props) => {
  if (equals(type, MODAL_TYPES.CUSTOM)) {
    const CustomComponent = props.data.customComponent;
    return !isNil(CustomComponent) ? <CustomComponent {...props} /> : null;
  }
  const ModalComponent = modalComponentMap[type];
  return !isNil(ModalComponent) ? <ModalComponent {...props} /> : null;
};

export const Modal = ({ isOpen, type, ...props }) => (
  <Portal rootId="modal-root">
    <RenderIf validate={isOpen}>
      <ModalOverlay>
        <ModalWrapper>
          <ModalCard>{renderModalComponent(type, props)}</ModalCard>
        </ModalWrapper>
      </ModalOverlay>
    </RenderIf>
  </Portal>
);
