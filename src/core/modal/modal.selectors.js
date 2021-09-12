import { prop, last } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import { getToken } from 'src/core/authentication';
import { isNotEmpty } from 'src/utils';

const selectModals = prop('modals');

const selectIsOpen = createSelector(selectModals, isNotEmpty);

const selectCurrentModal = createSelector(selectModals, last);

const selectCurrentModalType = createSelector(selectCurrentModal, prop('key'));
const selectCurrentModalData = createSelector(selectCurrentModal, prop('data'));

export const selectModalProps = createStructuredSelector({
  data: selectCurrentModalData,
  isOpen: selectIsOpen,
  token: getToken,
  type: selectCurrentModalType,
});
