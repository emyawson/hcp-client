import React from 'react';
import ModalFromLibrary from 'react-accessible-modal';

import './modal.style';

export const Modal = ({
  closeModal = () => undefined,
  destroyModal = () => undefined,
  isOpen,
  label,
  children,
}) => (
  <ModalFromLibrary
    isOpen={isOpen}
    label={label}
    onRequestClose={closeModal}
    onAfterClose={destroyModal}
    overlayClick
  >
    {children}
  </ModalFromLibrary>
);
