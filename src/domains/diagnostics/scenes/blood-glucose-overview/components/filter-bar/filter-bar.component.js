import React from 'react';

import { FilterBarContainer } from './filter-bar.style';

import { IntervalsDropdown } from '../interval-dropdown/interval-dropdown.component';

export const FilterBar = ({ onChangeInterval }) => (
  <FilterBarContainer>
    <IntervalsDropdown onChangeInterval={onChangeInterval} />
  </FilterBarContainer>
);
