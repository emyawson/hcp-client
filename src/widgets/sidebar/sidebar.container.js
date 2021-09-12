import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/utils';
import { createModal, MODAL_TYPES } from 'src/core/modal';

import { SideBarNav } from './sidebar.component';
import { sidebarSelector } from './store/side-bar.selector.js';

const dispatchers = mapDispatchers({
  showDtcModal: () =>
    createModal({
      key: MODAL_TYPES.DTC,
    }),
  showManufacturerInfoModal: () =>
    createModal({
      key: MODAL_TYPES.MANUFACTURER_INFO,
    }),
});

export const SideBarContainer = compose(
  connect(
    sidebarSelector,
    dispatchers,
  ),
)(SideBarNav);
