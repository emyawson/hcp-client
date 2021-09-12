import React from 'react';

import { CursorBlock, LocalizedText, Button, Badge } from 'src/components';
import { CommonHeader, ModalBody } from 'src/widgets/modal';
import { translate } from 'src/i18n';
import { XIcon, DisclaimerIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';

import {
  DeleteCustomGuideModalBodyDiv,
  DeleteCustomGuideIconWrapperDiv,
  DeleteCustomGuideSubheading,
  DeleteCustomGuideInfoWrapperDiv,
  DeleteCustomGuideButtonsWrapperDiv,
  CancelDeleteGuideButton,
} from './delete-custom-guide-modal.style';

const RemoveDisclaimerIcon = () => (
  <DisclaimerIcon height={50} width={50} iconColor={colors.white} />
);
export const DeleteCustomGuideModal = ({
  data: { onDeleteClinicGuideRequest, clinicGuideName, clinicGuideId },
  destroyModal,
}) => (
  <ModalBody>
    <CommonHeader>
      <LocalizedText
        fontSize={4}
        textKey={'prescription.customClinicGuides.modal.title'}
      />
      <CursorBlock onClick={destroyModal}>
        <span>
          <XIcon height={14} fillColor={colors.white} />
        </span>
      </CursorBlock>
    </CommonHeader>
    <DeleteCustomGuideModalBodyDiv>
      <DeleteCustomGuideIconWrapperDiv>
        <Badge icon={<RemoveDisclaimerIcon />} bgColor={colors.red} size={80} />
      </DeleteCustomGuideIconWrapperDiv>
      <DeleteCustomGuideSubheading>
        {`${translate(
          'prescription.customClinicGuides.remove',
        )} "${clinicGuideName}"?`}
      </DeleteCustomGuideSubheading>
      <DeleteCustomGuideInfoWrapperDiv>
        <ul>
          <li>
            <LocalizedText
              textKey={'prescription.customClinicGuides.modal.descLine1'}
            />
          </li>
          <li>
            <LocalizedText
              textKey={'prescription.customClinicGuides.modal.descLine2'}
            />
          </li>
        </ul>
      </DeleteCustomGuideInfoWrapperDiv>
      <DeleteCustomGuideButtonsWrapperDiv>
        <CancelDeleteGuideButton
          label="Cancel"
          onClick={destroyModal}
          buttonStyle="secondary"
        />
        <Button
          label="Remove"
          onClick={() => onDeleteClinicGuideRequest({ clinicGuideId })}
        />
      </DeleteCustomGuideButtonsWrapperDiv>
    </DeleteCustomGuideModalBodyDiv>
  </ModalBody>
);
