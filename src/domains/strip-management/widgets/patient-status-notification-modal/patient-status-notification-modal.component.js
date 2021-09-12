import React from 'react';

import {
  CursorBlock,
  LocalizedText,
  GridContainer,
  Button,
  Comment,
} from 'src/components';
import { CommonHeader, ModalBody } from 'src/widgets/modal';
import { StripStatusDetails } from 'src/domains/strip-management/components';
import { RenderIf, hasValue } from 'src/utils';
import { translate } from 'src/i18n';
import { XIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';

import {
  PatientStatusNotificationModalBodyDiv,
  PatientStatusNotificationButtonDiv,
  PatientStatusCommentWrapperDiv,
} from './patient-status-notification-modal.style';

import { ExpandedLastPatientStripStatusContainer } from '../patient-strip-status';

export const PatientStatusNotificationModal = ({
  lastTrafficLightStatusConditions,
  lastTrafficLightStatus,
  lastTrafficLightStatusComment,
  lastTrafficLightStatusDateCalculated,
  hasLastTrafficLightStatusWithAlert,
  destroyModal,
}) => (
  <ModalBody minWidth={960}>
    <CommonHeader>
      <LocalizedText
        fontSize={4}
        textKey={'modals.patientStatusNotification.title'}
      />
      <CursorBlock onClick={destroyModal}>
        <span>
          <XIcon height={14} fillColor={colors.white} />
        </span>
      </CursorBlock>
    </CommonHeader>
    <PatientStatusNotificationModalBodyDiv>
      <GridContainer>
        <ExpandedLastPatientStripStatusContainer
          displayOnly
          hideNextDeliveryDate
        >
          <StripStatusDetails
            conditions={lastTrafficLightStatusConditions}
            trafficLightStatus={lastTrafficLightStatus}
            hasLastDeliveryWithAlert={hasLastTrafficLightStatusWithAlert}
          />
          <RenderIf validate={hasValue(lastTrafficLightStatusComment)}>
            <PatientStatusCommentWrapperDiv>
              <Comment
                message={lastTrafficLightStatusComment}
                title={translate('stripDelivery.comments.adminComments.title')}
                date={lastTrafficLightStatusDateCalculated}
              />
            </PatientStatusCommentWrapperDiv>
          </RenderIf>
          <PatientStatusNotificationButtonDiv>
            <Button
              label={translate(
                'modals.patientStatusNotification.acknowledgePatientStatus',
              )}
              onClick={destroyModal}
            />
          </PatientStatusNotificationButtonDiv>
        </ExpandedLastPatientStripStatusContainer>
      </GridContainer>
    </PatientStatusNotificationModalBodyDiv>
  </ModalBody>
);
