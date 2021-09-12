import React from 'react';
import { equals } from 'ramda';

import { Button, LocalizedText } from 'src/components';
import {
  LoadingMessage,
  LoadingMessageHeadline,
  LoadingMessageContainerDiv,
} from 'src/components/loading-message';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils/render-if';
import { LOADING_MODAL_STATUS } from 'src/core/modal/modal.constants';

import {
  LoadingModalContentDiv,
  ConfirmationButtonWrapperDiv,
} from './loading-modal.style';

export const LoadingModal = ({ data: { status, text }, destroyModal }) => {
  const isComplete =
    equals(status, LOADING_MODAL_STATUS.SUCCESS) ||
    equals(status, LOADING_MODAL_STATUS.SUCCESS_REQUIRES_CONFIRMATION);
  const requiresConfirmation = equals(
    status,
    LOADING_MODAL_STATUS.SUCCESS_REQUIRES_CONFIRMATION,
  );
  const isError = equals(status, LOADING_MODAL_STATUS.ERROR);
  return (
    <LoadingModalContentDiv>
      <RenderIf validate={!isError}>
        <LoadingMessage isComplete={isComplete} infinite={true} text={text} />
      </RenderIf>
      <RenderIf validate={isError}>
        <LoadingMessageContainerDiv>
          <LoadingMessageHeadline>
            <LocalizedText textKey="requestsLoading.error" />
          </LoadingMessageHeadline>
          <Button
            label={translate('requestsLoading.closeModal')}
            onClick={destroyModal}
          />
        </LoadingMessageContainerDiv>
      </RenderIf>
      <RenderIf validate={requiresConfirmation}>
        <ConfirmationButtonWrapperDiv>
          <Button
            label={translate('prescription.customClinicGuides.modal.ok')}
            onClick={destroyModal}
          />
        </ConfirmationButtonWrapperDiv>
      </RenderIf>
    </LoadingModalContentDiv>
  );
};
