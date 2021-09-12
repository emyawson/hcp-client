import React from 'react';
import { equals } from 'ramda';

import { CLINIC_GUIDE_TYPES } from 'src/core/prescription';
import { RenderIf } from 'src/utils/render-if';
import { translate } from 'src/i18n';

import {
  FiltersWrapper,
  Filter,
  FiltersRowDiv,
  OptionsListWrapper,
  OptionWrapper,
  OptionLabel,
  OptionTag,
} from './prescription-form.style';

export const guidesOptionRenderer = option => (
  <OptionWrapper>
    <OptionLabel inactive={option.inactive}>{option.label}</OptionLabel>
    <RenderIf validate={option.inactive}>
      <OptionTag>
        {translate('prescription.customClinicGuides.dropdown.removed')}
      </OptionTag>
    </RenderIf>
  </OptionWrapper>
);

export const GuideFilters = ({
  clinicGuideFilter = CLINIC_GUIDE_TYPES.PRESET,
  onSelectFilter,
}) => (
  <FiltersRowDiv>
    <FiltersWrapper>
      <Filter
        label="Preset"
        buttonStyle="outlinedLight"
        active={equals(clinicGuideFilter, CLINIC_GUIDE_TYPES.PRESET)}
        onClick={() => onSelectFilter({ filter: CLINIC_GUIDE_TYPES.PRESET })}
        type="button"
      />
      <Filter
        label="Custom"
        buttonStyle="outlinedLight"
        active={equals(clinicGuideFilter, CLINIC_GUIDE_TYPES.CUSTOM)}
        onClick={() => onSelectFilter({ filter: CLINIC_GUIDE_TYPES.CUSTOM })}
        type="button"
      />
    </FiltersWrapper>
  </FiltersRowDiv>
);

export const clinicGuideMenuRenderer = ({
  clinicGuideFilter = CLINIC_GUIDE_TYPES.PRESET,
  onSelectFilter,
}) => ({
  focusedOption,
  focusOption,
  inputValue,
  instancePrefix,
  onFocus,
  onOptionRef,
  onSelect,
  optionClassName,
  optionComponent,
  options,
  removeValue,
  selectValue,
  valueArray,
  valueKey,
}) => {
  let Option = optionComponent;

  return (
    <div>
      <GuideFilters
        clinicGuideFilter={clinicGuideFilter}
        onSelectFilter={onSelectFilter}
      />
      <OptionsListWrapper>
        {options.map((option, i) => {
          let isSelected =
            valueArray &&
            valueArray.some(x => x[valueKey] === option[valueKey]);
          let isFocused = option === focusedOption;
          let isDisabled = option.disabled;
          let optionClass = `Select-option ${isSelected ? 'is-selected' : ''} ${
            isFocused ? 'is-focused' : ''
          } ${isDisabled ? 'is-disabled' : ''}`;

          return (
            <Option
              className={optionClass}
              focusOption={focusOption}
              inputValue={inputValue}
              instancePrefix={instancePrefix}
              isDisabled={option.disabled}
              isFocused={isFocused}
              isSelected={isSelected}
              key={`option-${i}-${option[valueKey]}`}
              onFocus={onFocus}
              onSelect={onSelect}
              option={option}
              optionIndex={i}
              ref={ref => {
                onOptionRef(ref, isFocused);
              }}
              removeValue={removeValue}
              selectValue={selectValue}
            >
              {guidesOptionRenderer(option)}
            </Option>
          );
        })}
      </OptionsListWrapper>
    </div>
  );
};
