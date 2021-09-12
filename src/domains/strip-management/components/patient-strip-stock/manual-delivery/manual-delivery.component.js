import React from 'react';
import { compose, withHandlers, mapProps } from 'recompose';
import { not } from 'ramda';

import {
  STRIPS_PER_TUBE,
  DELIVERY_COMMENT_MAX_LENGTH,
} from 'src/core/strip-delivery';
import {
  Button,
  LocalizedText,
  NumberInput,
  LocalForm,
  ControlButton,
  ControlText,
} from 'src/components';
import { translate } from 'src/i18n';
import {
  maskUserNumberInput,
  addLocalFormDispatchHandlers,
  hasValue,
} from 'src/utils';

import {
  DEFAULT_EXTRA_STRIPS,
  EXTRA_TUBES_MIN_MAX,
} from './manual-delivery.constant';
import {
  ManualDeliveryInputsDiv,
  StripsInputDiv,
  ButtonDiv,
  CommentDiv,
  ExtraStripsNumberInputField,
  ManualDeliveryReasonTextArea,
} from './manual-delivery.style';

import {
  PatientStripsStockHeader,
  PatientStripsStockTitle,
  PatientStripsStockContainerDiv,
  PatientStripsStockInputLabel,
} from '../patient-strip-stock.style';

const addHandlers = withHandlers({
  onUpdateNumberOfTubes: ({ updateValue }) => value => {
    const numberOfTubesDisplay = maskUserNumberInput(
      value,
      EXTRA_TUBES_MIN_MAX.MAX,
    );
    const numberOfStripsDisplay =
      numberOfTubesDisplay && numberOfTubesDisplay * STRIPS_PER_TUBE;
    updateValue('manualDelivery.numberOfTubesDelivered', numberOfTubesDisplay);
    updateValue(
      'manualDelivery.numberOfStripsDelivered',
      numberOfStripsDisplay,
    );
  },
  onSubmitManualDelivery: ({
    patientId,
    stripModelId,
    submitManualDeliveryRequest,
    updateValue,
  }) => values => {
    submitManualDeliveryRequest({ ...values, patientId, stripModelId });
    updateValue(
      'manualDelivery.numberOfTubesDelivered',
      DEFAULT_EXTRA_STRIPS.numberOfTubesDelivered,
    );
    updateValue(
      'manualDelivery.numberOfStripsDelivered',
      DEFAULT_EXTRA_STRIPS.numberOfStripsDelivered,
    );
    updateValue('manualDelivery.comment', DEFAULT_EXTRA_STRIPS.comment);
  },
});

const addProps = mapProps(props => ({
  ...props,
  isEnabled: () => not(props.disabled),
}));

export const ManualDelivery = compose(
  addLocalFormDispatchHandlers,
  addHandlers,
  addProps,
)(
  ({
    onSubmitManualDelivery,
    attachDispatch,
    onUpdateNumberOfTubes,
    disabled,
    isEnabled,
  }) => (
    <PatientStripsStockContainerDiv>
      <PatientStripsStockHeader>
        <PatientStripsStockTitle>
          <LocalizedText textKey="stripDelivery.manualDelivery.title" />
        </PatientStripsStockTitle>
      </PatientStripsStockHeader>
      <LocalForm
        onSubmit={onSubmitManualDelivery}
        getDispatch={attachDispatch}
        model="manualDelivery"
        initialState={DEFAULT_EXTRA_STRIPS}
        validators={{
          '': { isEnabled },
          comment: { hasValue },
        }}
      >
        <ManualDeliveryInputsDiv>
          <StripsInputDiv>
            <PatientStripsStockInputLabel>
              <LocalizedText textKey="stripDelivery.manualDelivery.tubes" />
            </PatientStripsStockInputLabel>
            <NumberInput
              id="numberOfTubesDelivered"
              min={EXTRA_TUBES_MIN_MAX.MIN}
              max={EXTRA_TUBES_MIN_MAX.MAX}
              model=".numberOfTubesDelivered"
              updateValue={onUpdateNumberOfTubes}
              initialValue={DEFAULT_EXTRA_STRIPS.numberOfTubesDelivered}
              disabled={disabled}
              row
            />
          </StripsInputDiv>
          <StripsInputDiv>
            <PatientStripsStockInputLabel>
              <LocalizedText textKey="stripDelivery.manualDelivery.strips" />
            </PatientStripsStockInputLabel>
            <ExtraStripsNumberInputField
              model=".numberOfStripsDelivered"
              disabled
            />
          </StripsInputDiv>
          <CommentDiv>
            <ControlText
              model=".comment"
              component={ManualDeliveryReasonTextArea}
              placeholder={translate('stripDelivery.manualDelivery.comment')}
              maxLength={DELIVERY_COMMENT_MAX_LENGTH}
              disabled={disabled}
            />
          </CommentDiv>
        </ManualDeliveryInputsDiv>
        <ButtonDiv>
          <ControlButton
            component={Button}
            type="submit"
            label={translate('stripDelivery.manualDelivery.manualDelivery')}
            model="manualDelivery"
            disabled={{ valid: false }}
          />
        </ButtonDiv>
      </LocalForm>
    </PatientStripsStockContainerDiv>
  ),
);
