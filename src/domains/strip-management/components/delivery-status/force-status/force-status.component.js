import React from 'react';
import { equals, filter, isNil, not, pipe } from 'ramda';

import { TRAFFIC_LIGHT_STATES, STATUS_COMMENT_MAX_LENGTH } from 'src/core';
import { Button, ControlText, ControlButton, Form } from 'src/components';
import { translate } from 'src/i18n';

import {
  ForceStatusSubmitDiv,
  ForceStatusControlsDiv,
  ForceStatusControlSpan,
  ForceStatusReasonTextArea,
  ForceStatusRowDiv,
} from './force-status.style';

import { DeliveryStatusIcon, ForceStatusButton } from '../../delivery-status';

const { DELIVER, DO_NOT_DELIVER, DISABLED } = TRAFFIC_LIGHT_STATES;

const forcibleTrafficStates = [DELIVER, DO_NOT_DELIVER];

export const ForceStatus = ({
  currentStatus = DISABLED,
  disabled = false,
  forceTrafficStatus,
  modelPath,
  setDeliveryStatusRequest,
  patientId,
}) => {
  const submitForcedStatus = ({ status, comment }) => {
    setDeliveryStatusRequest({ patientId, status, comment });
  };
  const isNotCurrentStatus = pipe(
    equals(currentStatus),
    not,
  );
  const forceStatusControls = filter(isNotCurrentStatus, forcibleTrafficStates);
  return (
    <Form model={modelPath} onSubmit={submitForcedStatus}>
      <ForceStatusRowDiv>
        <ForceStatusControlsDiv>
          {forceStatusControls.map(trafficStatus => (
            <ForceStatusControlSpan
              key={`ForceStatusButtonContainer-${trafficStatus}`}
            >
              <ForceStatusButton
                key={`ForceStatusButton-${trafficStatus}`}
                disabled={disabled || equals(trafficStatus, forceTrafficStatus)}
                modelPath=".status"
                status={trafficStatus}
              />
            </ForceStatusControlSpan>
          ))}
        </ForceStatusControlsDiv>
        <ControlText
          model=".comment"
          component={ForceStatusReasonTextArea}
          placeholder={translate('stripDelivery.forceStatus.comment')}
          maxLength={STATUS_COMMENT_MAX_LENGTH}
        />
      </ForceStatusRowDiv>
      <ForceStatusSubmitDiv>
        <DeliveryStatusIcon status={forceTrafficStatus} noIcon={true} />
        <div>
          <ControlButton
            component={Button}
            disabled={disabled || isNil(forceTrafficStatus)}
            model="stripDelivery.forceTrafficStatus"
            type="submit"
            label={translate('stripDelivery.forceStatus.submit')}
          />
        </div>
      </ForceStatusSubmitDiv>
    </Form>
  );
};
