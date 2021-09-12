import React from 'react';

import { Block, RangeSlider } from 'src/components';
import { translate } from 'src/i18n';

import {
  QuantitySliderValuesDiv,
  QuantitySliderValueSpan,
  QuantitySliderRangeSpan,
  QuantitySliderLabel,
  QuantitySliderContainerDiv,
} from './quantity-slider.style';

export const QuantitySlider = ({
  minValue,
  maxValue,
  rangeMin,
  rangeMax,
  onChange,
}) => (
  <Block>
    <QuantitySliderValuesDiv>
      <QuantitySliderValueSpan>{minValue}</QuantitySliderValueSpan>
      <QuantitySliderValueSpan>{maxValue}</QuantitySliderValueSpan>
    </QuantitySliderValuesDiv>
    <QuantitySliderContainerDiv>
      <RangeSlider
        rangeMin={rangeMin}
        rangeMax={rangeMax}
        minValue={minValue}
        maxValue={maxValue}
        onChange={onChange}
      />
    </QuantitySliderContainerDiv>
    <QuantitySliderValuesDiv>
      <QuantitySliderRangeSpan>{rangeMin}</QuantitySliderRangeSpan>
      <QuantitySliderLabel>
        <em>{translate('prescription.customClinicGuides.quantitySlider')}</em>
      </QuantitySliderLabel>
      <QuantitySliderRangeSpan>{rangeMax}</QuantitySliderRangeSpan>
    </QuantitySliderValuesDiv>
  </Block>
);
