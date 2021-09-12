import React from 'react';
import { compose, withHandlers } from 'recompose';
import moment from 'moment';

import { STRIPS_PER_TUBE } from 'src/core/strip-delivery';
import { addLocalFormDispatchHandlers } from 'src/utils/forms';
import { maskUserNumberInput, hasValue, isNotNil } from 'src/utils';
import {
  LocalForm,
  ControlButton,
  Button,
  LabelledDropdown,
  LocalizedText,
  NumberInputField,
  SectionHeader,
  Keyline,
} from 'src/components';
import { LabelledDatePicker } from 'src/components/date-picker/labelled-date-picker';
import { translate } from 'src/i18n';

import {
  NumberOfStripsControl,
  NumberOfStripsControlDiv,
  NumberOfStripsFieldDiv,
  AddOrgStockWrapperDiv,
  AddOrgStockNumberInputsDiv,
  AddOrgStockRowDiv,
  AddOrgStockFieldLabel,
  AddOrgStockFieldDiv,
  AddOrgStockSubmitDiv,
} from './add-org-stock.style';
import {
  DEFAULT_ADD_ORG_STOCK,
  ADD_TUBES_MIN_MAX,
} from './add-org-stock.constant';

const addHandlers = withHandlers({
  onUpdateNumberOfTubes: ({ updateValue }) => value => {
    const numberOfTubesDisplay = maskUserNumberInput(
      value,
      ADD_TUBES_MIN_MAX.MAX,
    );
    const numberOfStripsDisplay =
      numberOfTubesDisplay && numberOfTubesDisplay * STRIPS_PER_TUBE;
    updateValue('addNewStock.numberOfTubes', numberOfTubesDisplay);
    updateValue('addNewStock.numberOfStrips', numberOfStripsDisplay);
  },
  onDateChange: ({ updateValue }) => date =>
    updateValue('addNewStock.actionPerformedAt', date),
  onSubmitAddNewStock: ({ onAddOrgStock, updateValue }) => values => {
    onAddOrgStock(values);
    updateValue(
      'addNewStock.numberOfTubes',
      DEFAULT_ADD_ORG_STOCK.numberOfTubes,
    );
    updateValue(
      'addNewStock.numberOfStrips',
      DEFAULT_ADD_ORG_STOCK.numberOfStrips,
    );
  },
});

const greaterThanZero = val => parseInt(val, 10) > 0;
const today = moment()
  .utc()
  .startOf('day');

export const AddOrgStock = compose(
  addLocalFormDispatchHandlers,
  addHandlers,
)(
  ({
    attachDispatch,
    onDateChange,
    onUpdateNumberOfTubes,
    stripModels,
    onSubmitAddNewStock,
  }) => (
    <AddOrgStockWrapperDiv>
      <SectionHeader title={translate('orgStock.addNewStock.title')} />
      <LocalForm
        model="addNewStock"
        initialState={{
          actionPerformedAt: today.toDate(),
          numberOfTubes: DEFAULT_ADD_ORG_STOCK.numberOfTubes,
          numberOfStrips: DEFAULT_ADD_ORG_STOCK.numberOfStrips,
        }}
        getDispatch={dispatch => attachDispatch(dispatch)}
        validators={{
          actionPerformedAt: { isNotNil },
          stripModelId: { hasValue },
          numberOfTubes: { hasValue, greaterThanZero },
        }}
        onSubmit={onSubmitAddNewStock}
      >
        <AddOrgStockRowDiv>
          <AddOrgStockFieldDiv>
            <LabelledDatePicker
              defaultDate={today}
              displayFormat="MMM D YYYY"
              label={translate('orgStock.addNewStock.date.label')}
              modelPath=".actionPerformedAt"
              onChange={onDateChange}
              showIcon
              single
            />
          </AddOrgStockFieldDiv>
          <AddOrgStockFieldDiv>
            <LabelledDropdown
              label={translate('orgStock.addNewStock.models.label')}
              options={stripModels}
              placeholder={translate('general.dropdownEmpty')}
              modelPath=".stripModelId"
            />
          </AddOrgStockFieldDiv>
        </AddOrgStockRowDiv>
        <AddOrgStockRowDiv>
          <AddOrgStockNumberInputsDiv>
            <NumberOfStripsFieldDiv>
              <AddOrgStockFieldLabel>
                <LocalizedText textKey="orgStock.addNewStock.tubes.label" />
              </AddOrgStockFieldLabel>
              <NumberInputField
                id="numberOfTubes"
                model=".numberOfTubes"
                min={ADD_TUBES_MIN_MAX.MIN}
                max={ADD_TUBES_MIN_MAX.MAX}
                updateField={onUpdateNumberOfTubes}
              />
            </NumberOfStripsFieldDiv>
            <NumberOfStripsFieldDiv>
              <AddOrgStockFieldLabel>
                <LocalizedText textKey="orgStock.addNewStock.strips.label" />
              </AddOrgStockFieldLabel>
              <NumberOfStripsControlDiv>
                <NumberOfStripsControl model=".numberOfStrips" disabled />
              </NumberOfStripsControlDiv>
            </NumberOfStripsFieldDiv>
          </AddOrgStockNumberInputsDiv>
        </AddOrgStockRowDiv>
        <Keyline />
        <AddOrgStockSubmitDiv>
          <ControlButton
            component={Button}
            type="submit"
            label={translate('orgStock.addNewStock.submit')}
            model="addNewStock"
            disabled={{ valid: false }}
          />
        </AddOrgStockSubmitDiv>
      </LocalForm>
    </AddOrgStockWrapperDiv>
  ),
);
