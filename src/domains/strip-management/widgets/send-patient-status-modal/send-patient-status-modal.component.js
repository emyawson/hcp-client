import React from 'react';

import {
  CursorBlock,
  LocalizedText,
  GridContainer,
  Button,
  ControlText,
  LocalForm,
  ControlButton,
} from 'src/components';
import { CommonHeader, ModalBody } from 'src/widgets/modal';
import { StripStatusDetails } from 'src/domains/strip-management/components';
import { translate } from 'src/i18n';
import { XIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';
import { STATUS_COMMENT_MAX_LENGTH } from 'src/core/strip-delivery';
import { hasValue } from 'src/utils';

import {
  SendPatientStatusModalBodyDiv,
  SendPatientStatusButtonDiv,
  SendPatientStatusTextArea,
} from './send-patient-status-modal.style';

import { ExpandedPatientStripStatusContainer } from '../patient-strip-status';

const DEFAULT_PATIENT_STATUS = {
  comment: '',
};

export const SendPatientStatusModal = ({
  trafficLightStatusConditions,
  trafficLightStatus,
  destroyModal,
  attachDispatch,
  onSubmitPatientStatusComment,
  hasLastDeliveryWithAlert,
}) => (
  <ModalBody minWidth={960}>
    <CommonHeader>
      <LocalizedText fontSize={4} textKey={'modals.sendPatientStatus.title'} />
      <CursorBlock onClick={destroyModal}>
        <XIcon height={14} fillColor={colors.white} />
      </CursorBlock>
    </CommonHeader>
    <SendPatientStatusModalBodyDiv>
      <GridContainer>
        <ExpandedPatientStripStatusContainer displayOnly>
          <StripStatusDetails
            conditions={trafficLightStatusConditions}
            trafficLightStatus={trafficLightStatus}
            hasLastDeliveryWithAlert={hasLastDeliveryWithAlert}
          />
          <LocalForm
            onSubmit={onSubmitPatientStatusComment}
            getDispatch={attachDispatch}
            model="sendPatientStatus"
            initialState={DEFAULT_PATIENT_STATUS}
            validators={{
              comment: hasValue,
            }}
          >
            <ControlText
              model=".comment"
              component={SendPatientStatusTextArea}
              placeholder={translate(
                'stripDelivery.comments.adminComments.placeholder',
              )}
              maxLength={STATUS_COMMENT_MAX_LENGTH}
            />
            <SendPatientStatusButtonDiv>
              <ControlButton
                model={'sendPatientStatus'}
                disabled={{ valid: false }}
                component={Button}
                name={'sendPatientStatusSubmit'}
                controlProps={{
                  label: translate('modals.sendPatientStatus.send'),
                  type: 'submit',
                }}
              />
            </SendPatientStatusButtonDiv>
          </LocalForm>
        </ExpandedPatientStripStatusContainer>
      </GridContainer>
    </SendPatientStatusModalBodyDiv>
  </ModalBody>
);
