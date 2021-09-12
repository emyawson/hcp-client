import React from 'react';
import { pathOr } from 'ramda';
import { GridContainer, GridItem } from 'src/components/grid-layout';

import { Block, Button, SectionHeader, CardHeader } from 'src/components';
import { Dropdown } from 'src/components/dropdown';
import { ControlButton, ControlCustom, LocalForm } from 'src/components/forms';
import { colors, spacing } from 'src/core/styles';
import { hasValue } from 'src/utils';
import { translate } from 'src/i18n';

import {
  SaveCustomGuideRow,
  DropdownStyledTextInput,
} from './custom-clinic-guides.style';
import {
  CREATE_CUSTOM_GUIDE_FORM_ID,
  CUSTOM_GUIDES_QUANTITY,
} from './store/custom-clinic-guides.constants';

import { QuantitySlider } from '../../components';

const { QUANTITY_MAX, QUANTITY_MIN } = CUSTOM_GUIDES_QUANTITY;

const INITIAL_CREATE_CLINIC_GUIDE_STATE = {
  name: '',
  therapyId: null,
  period: null,
  quantityRange: {
    min: QUANTITY_MIN,
    max: QUANTITY_MAX,
  },
};

export const CustomClinicGuidesForm = ({
  attachDispatch,
  periods,
  therapies,
  onQuantitySliderChange,
  onSubmitSaveClinicGuide,
}) => (
  <LocalForm
    getDispatch={dispatch => attachDispatch(dispatch)}
    initialState={INITIAL_CREATE_CLINIC_GUIDE_STATE}
    model={CREATE_CUSTOM_GUIDE_FORM_ID}
    onSubmit={onSubmitSaveClinicGuide}
    validators={{
      name: hasValue,
    }}
  >
    <GridContainer gridSpacing={`${spacing.four} ${spacing.five}`} marginBottom>
      <GridItem span="12">
        <Block pt={3}>
          <SectionHeader
            textColor={colors.blueMarine5}
            borderColor={colors.quartzBlue}
            title={translate('prescription.customClinicGuides.createNew')}
            bottomMargin={0}
            bottomMarginHeadline={0}
          />
        </Block>
      </GridItem>
      <GridItem span="6">
        <CardHeader
          title={translate('prescription.customClinicGuides.guideName')}
          cardStyles={['blue', 'customClinicGuides']}
        />
        <DropdownStyledTextInput
          label={translate('prescription.customClinicGuides.name')}
          placeholder={translate(
            'prescription.customClinicGuides.namePlaceholder',
          )}
          model=".name"
        />
      </GridItem>
      <GridItem span="6">
        <CardHeader
          title={translate('prescription.customClinicGuides.patientTherapy')}
          cardStyles={['blue', 'customClinicGuides']}
        />
        <Block display="flex" alignItems="stretch">
          <Dropdown
            modelPath=".therapyId"
            options={therapies}
            placeholder={translate('general.dropdownEmpty')}
            searchable={false}
            required
          />
        </Block>
      </GridItem>
      <GridItem span="6">
        <CardHeader
          title={translate('prescription.customClinicGuides.quantityRange')}
          cardStyles={['blue', 'customClinicGuides']}
        />
        <Block pt={3}>
          <ControlCustom
            component={QuantitySlider}
            model=".quantityRange"
            mapProps={{
              rangeMin: QUANTITY_MIN,
              rangeMax: QUANTITY_MAX,
              minValue: props =>
                pathOr(QUANTITY_MIN, ['modelValue', 'min'], props),
              maxValue: props =>
                pathOr(QUANTITY_MAX, ['modelValue', 'max'], props),
              onChange: () => onQuantitySliderChange,
            }}
          />
        </Block>
      </GridItem>
      <GridItem span="6">
        <CardHeader
          title={translate('prescription.customClinicGuides.period')}
          cardStyles={['blue', 'customClinicGuides']}
        />
        <Block display="flex" alignItems="stretch">
          <Dropdown
            modelPath=".period"
            options={periods}
            placeholder={translate('general.dropdownEmpty')}
            searchable={false}
            required
          />
        </Block>
      </GridItem>
      <GridItem span="12">
        <SaveCustomGuideRow>
          <ControlButton
            model={CREATE_CUSTOM_GUIDE_FORM_ID}
            disabled={{ valid: false }}
            component={Button}
            name={`${CREATE_CUSTOM_GUIDE_FORM_ID}Submit`}
            controlProps={{
              label: translate('prescription.customClinicGuides.save'),
              type: 'submit',
            }}
          />
        </SaveCustomGuideRow>
      </GridItem>
    </GridContainer>
  </LocalForm>
);
