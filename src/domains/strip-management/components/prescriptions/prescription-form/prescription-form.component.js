import React from 'react';
import { isEmpty, not } from 'ramda';

import { LabelledDropdown } from 'src/components/dropdown/labelled-dropdown';
import { Button } from 'src/components/button';
import { Link } from 'src/components/link';
import { ControlButton, LocalForm } from 'src/components/forms';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils/render-if';
import { hasValue } from 'src/utils';
import { GearIcon } from 'src/assets/icons';

import {
  clinicGuideMenuRenderer,
  GuideFilters,
  guidesOptionRenderer,
} from './prescription-form.utils';
import { GuideValueWrapper } from './prescription-form.style';

import { TemporaryPrescriptionFormOptions } from '../../prescriptions';
import {
  PrescriptionContainerDiv,
  PrescriptionRowDiv,
  SelectContainerDiv,
  PrescriptionSaveRowDiv,
  LabelledInput,
  InputLabel,
  SettingsButtonContainerDiv,
  SettingsButton,
  HideLargeDiv,
} from '../../../scenes/prescription/prescription.style';

const placeholderText = translate('general.dropdownEmpty');
const CUSTOM_GUIDES_INNER_LINK = 'prescription/guide-settings';

export const PrescriptionForm = ({
  id,
  frequencies,
  therapies,
  clinicGuides,
  quantities,
  periods,
  stripModels,
  reasons,
  therapy,
  clinicGuide,
  period,
  frequency,
  quantity,
  stripModel,
  reason,
  startDate,
  endDate,
  attachDispatch,
  onTherapyDropdownChange,
  onClinicGuideDropdownChange,
  handleSubmit,
  isTemporaryPrescription,
  onDatesChange,
  hasCustomClinicGuide,
  quantityMin,
  quantityMax,
  onQuantityChange,
  clinicGuideFilter,
  onSelectFilter,
}) => (
  <LocalForm
    model={`${id}`}
    getDispatch={dispatch => attachDispatch(dispatch)}
    onSubmit={handleSubmit}
    validators={{
      dateRange: ({ startDate, endDate }) =>
        (hasValue(startDate) && hasValue(endDate)) ||
        not(isTemporaryPrescription),
    }}
    initialState={{
      stripModel,
      frequency: frequency[id],
      therapy: therapy[id],
      clinicGuide: clinicGuide[id],
      quantity: quantity[id],
      period: period[id],
      reason: reason[id],
      dateRange: {
        startDate: startDate[id],
        endDate: endDate[id],
      },
    }}
  >
    <PrescriptionContainerDiv>
      <PrescriptionRowDiv>
        <SelectContainerDiv>
          <LabelledDropdown
            label={translate('prescription.therapy.label')}
            modelPath=".therapy"
            options={therapies}
            placeholder={placeholderText}
            onChange={onTherapyDropdownChange}
          />
        </SelectContainerDiv>
        <SelectContainerDiv>
          <LabelledDropdown
            label={translate('prescription.clinicGuide.label')}
            modelPath=".clinicGuide"
            options={clinicGuides[id]}
            disabled={!clinicGuides[id]}
            placeholder={placeholderText}
            onChange={onClinicGuideDropdownChange}
            labelDecorator={
              <HideLargeDiv>
                <Link to={CUSTOM_GUIDES_INNER_LINK}>
                  <SettingsButton
                    label={translate('prescription.customClinicGuides.link')}
                    buttonStyle="outlinedLight"
                    icon={<GearIcon />}
                  />
                </Link>
              </HideLargeDiv>
            }
            menuRenderer={clinicGuideMenuRenderer({
              clinicGuideFilter: clinicGuideFilter[id],
              onSelectFilter,
            })}
            noResultsText={
              <GuideFilters
                clinicGuideFilter={clinicGuideFilter[id]}
                onSelectFilter={onSelectFilter}
              />
            }
            valueRenderer={option => (
              <GuideValueWrapper>
                {guidesOptionRenderer(option)}
              </GuideValueWrapper>
            )}
          />
        </SelectContainerDiv>

        <SettingsButtonContainerDiv>
          <Link to={CUSTOM_GUIDES_INNER_LINK}>
            <SettingsButton
              label={translate('prescription.customClinicGuides.link')}
              buttonStyle="outlinedLight"
              icon={<GearIcon />}
            />
          </Link>
        </SettingsButtonContainerDiv>
      </PrescriptionRowDiv>
      <PrescriptionRowDiv>
        <SelectContainerDiv>
          <RenderIf validate={hasCustomClinicGuide[id]}>
            <InputLabel>{translate('prescription.quantity.label')}</InputLabel>
            <LabelledInput
              id="quantity"
              model=".quantity"
              type="number"
              min={quantityMin}
              max={quantityMax}
              updateField={onQuantityChange}
            />
          </RenderIf>
          <RenderIf validate={!hasCustomClinicGuide[id]}>
            <LabelledDropdown
              label={translate('prescription.quantity.label')}
              modelPath=".quantity"
              options={quantities[id]}
              disabled={isEmpty(quantities[id])}
              placeholder={placeholderText}
            />
          </RenderIf>
        </SelectContainerDiv>
        <SelectContainerDiv>
          <LabelledDropdown
            label={translate('prescription.period.label')}
            modelPath=".period"
            options={periods[id]}
            disabled={isEmpty(periods[id])}
            placeholder={placeholderText}
          />
        </SelectContainerDiv>
        <SelectContainerDiv>
          <LabelledDropdown
            label={translate('prescription.stripModel.label')}
            modelPath=".stripModel"
            options={stripModels}
            placeholder={placeholderText}
            disabled={isTemporaryPrescription}
          />
        </SelectContainerDiv>
        <SelectContainerDiv>
          <LabelledDropdown
            label={translate('prescription.frequency.label')}
            modelPath=".frequency"
            options={frequencies}
            placeholder={placeholderText}
          />
        </SelectContainerDiv>
      </PrescriptionRowDiv>

      <RenderIf validate={isTemporaryPrescription}>
        <TemporaryPrescriptionFormOptions
          onDatesChange={onDatesChange}
          reasons={reasons}
          id={id}
          placeholderText={placeholderText}
        />
      </RenderIf>

      <PrescriptionSaveRowDiv>
        <ControlButton
          model={`${id}`}
          disabled={{ valid: false }}
          component={Button}
          name={`${id}Submit`}
          controlProps={{
            accessibilityLabel: translate('saveAccessibilityLabel'),
            label: translate('prescription.save'),
            type: 'submit',
          }}
        />
      </PrescriptionSaveRowDiv>
    </PrescriptionContainerDiv>
  </LocalForm>
);
