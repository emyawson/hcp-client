import React from 'react';
import { lte, not } from 'ramda';
import { withHandlers, compose, mapProps } from 'recompose';

import {
  Button,
  NumberInput,
  LocalizedText,
  LocalForm,
  ControlButton,
} from 'src/components';
import { translate } from 'src/i18n';
import { addLocalFormDispatchHandlers } from 'src/utils/forms';

import {
  DEFAULT_LOST_STRIPS,
  LOST_STRIPS_MIN_MAX,
} from './lost-strips.constant';

import {
  PatientStripsStockHeader,
  PatientStripsStockTitle,
  PatientStripsStockContainerDiv,
  PatientStripsStockFormDiv,
  PatientStripsStockFormLabel,
  PatientStripsStockInputContainerDiv,
  PatientStripsSubmitDiv,
} from '../patient-strip-stock.style';

const addHandlers = withHandlers({
  onUpdateNumberOfStrips: ({ updateValue }) => value =>
    updateValue('lostStrips.numberOfLostStrips', value),
  onSubmitLostStrips: ({
    patientId,
    stripModelId,
    submitLostStripsRequest,
    updateValue,
  }) => values => {
    submitLostStripsRequest({ ...values, patientId, stripModelId });
    updateValue(
      'lostStrips.numberOfLostStrips',
      DEFAULT_LOST_STRIPS.numberOfLostStrips,
    );
  },
});
const addProps = mapProps(props => ({
  ...props,
  isEnabled: () => not(props.disabled),
  lessOrEqualToPatientStock: val => lte(val, props.patientStock),
}));

export const LostStrips = compose(
  addLocalFormDispatchHandlers,
  addHandlers,
  addProps,
)(
  ({
    isEnabled,
    lessOrEqualToPatientStock,
    disabled,
    onUpdateNumberOfStrips,
    onSubmitLostStrips,
    attachDispatch,
  }) => (
    <PatientStripsStockContainerDiv>
      <PatientStripsStockHeader>
        <PatientStripsStockTitle>
          <LocalizedText textKey="stripDelivery.lostStrips.title" />
        </PatientStripsStockTitle>
      </PatientStripsStockHeader>
      <LocalForm
        onSubmit={onSubmitLostStrips}
        getDispatch={attachDispatch}
        model="lostStrips"
        initialState={DEFAULT_LOST_STRIPS}
        validators={{
          '': { isEnabled },
          numberOfLostStrips: {
            lessOrEqualToPatientStock,
          },
        }}
      >
        <PatientStripsStockFormLabel>
          <LocalizedText textKey="stripDelivery.lostStrips.numberOfLostStrips" />
        </PatientStripsStockFormLabel>
        <PatientStripsStockFormDiv>
          <PatientStripsStockInputContainerDiv>
            <NumberInput
              id="numberOfLostStrips"
              min={LOST_STRIPS_MIN_MAX.MIN}
              max={LOST_STRIPS_MIN_MAX.MAX}
              model=".numberOfLostStrips"
              initialValue={DEFAULT_LOST_STRIPS.numberOfLostStrips}
              updateValue={onUpdateNumberOfStrips}
              disabled={disabled}
              row
            />
          </PatientStripsStockInputContainerDiv>
          <PatientStripsSubmitDiv>
            <ControlButton
              component={Button}
              disabled={{ valid: false }}
              type="submit"
              label={translate('stripDelivery.lostStrips.recalculate')}
              model="lostStrips"
            />
          </PatientStripsSubmitDiv>
        </PatientStripsStockFormDiv>
      </LocalForm>
    </PatientStripsStockContainerDiv>
  ),
);
