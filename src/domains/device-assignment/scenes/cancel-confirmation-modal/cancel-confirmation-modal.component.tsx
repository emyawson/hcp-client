import * as React from 'react';
import { DisclaimerIcon, XIcon } from 'src/assets/icons';
import { Button, LocalizedText } from 'src/components';
import { ButtonReset, colors } from 'src/core/styles';
import { translate } from 'src/i18n';
import { CommonHeader, ModalBody } from 'src/widgets/modal';

import { Hr } from '../device-assignment/device-assignment.style';

import {
  CancelConfirmationBody,
  CancelConfirmationButtonsDiv,
  CancelConfirmationContentDiv,
  CancelConfirmationDescriptionDiv,
  CancelConfirmationSubheadingDiv,
  CancelConfirmationTitleSpan,
} from './cancel-confirmation-modal.style';

type CancelConfirmationModalProps = {
  data: { onConfirmCancel: () => void };
  destroyModal: () => void;
};

export const CancelConfirmationModal: React.StatelessComponent<
  CancelConfirmationModalProps
> = ({ data: { onConfirmCancel }, destroyModal }) => (
  <ModalBody>
    <CommonHeader>
      <CancelConfirmationTitleSpan>
        <LocalizedText
          fontSize={4}
          textKey={'deviceAssignment.cancelConfirmation.title'}
        />
      </CancelConfirmationTitleSpan>
      <ButtonReset onClick={destroyModal}>
        <XIcon height={14} fillColor={colors.white} />
      </ButtonReset>
    </CommonHeader>
    <CancelConfirmationBody>
      <CancelConfirmationContentDiv>
        <DisclaimerIcon
          withBorder={true}
          borderColor={colors.brandBlue}
          iconColor={colors.brandBlue}
          borderFillColor={colors.blueMarineAlpha}
          height={60}
          width={60}
        />
        <CancelConfirmationSubheadingDiv>
          <LocalizedText
            textKey={'deviceAssignment.cancelConfirmation.subheading'}
          />
        </CancelConfirmationSubheadingDiv>
        <CancelConfirmationDescriptionDiv>
          <LocalizedText
            textKey={'deviceAssignment.cancelConfirmation.description'}
          />
        </CancelConfirmationDescriptionDiv>
      </CancelConfirmationContentDiv>
      <Hr />
      <CancelConfirmationButtonsDiv>
        <Button
          label={translate('deviceAssignment.cancelConfirmation.cancel')}
          buttonStyle="secondary"
          mr={4}
          onClick={destroyModal}
        />
        <Button
          label={translate('deviceAssignment.cancelConfirmation.confirm')}
          onClick={() => {
            onConfirmCancel();
            destroyModal();
          }}
        />
      </CancelConfirmationButtonsDiv>
    </CancelConfirmationBody>
  </ModalBody>
);
