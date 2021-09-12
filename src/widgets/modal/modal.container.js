import { connect } from 'react-redux';

import { selectModalProps, destroyModal } from 'src/core';
import { mapDispatchers } from 'src/utils';

import { Modal } from './modal.component';

const dispatchers = mapDispatchers({
  destroyModal: destroyModal,
});

export const ModalContainer = connect(
  selectModalProps,
  dispatchers,
)(Modal);
