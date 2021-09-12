import React from 'react';

import { Dropdown } from 'src/domains/diagnostics/components';

import { GraphStartTimeDropdownContainer } from '.';

export const GraphStartTimeDropdown = ({ show }) => (
  <GraphStartTimeDropdownContainer className="print-hide">
    <Dropdown
      modelPath="ui.patientDashboard.graphStartTime"
      options={[
        { label: '0:00', value: '0:00' },
        { label: '6:00', value: '6:00' },
        { label: '12:00', value: '12:00' },
        { label: '18:00', value: '18:00' },
      ]}
      arrowIconHeight={5}
      optionFontSize={'0.72rem'}
      selectedOptionPadding={'0.75rem'}
      selectHeight={'2.25rem'}
      searchable={false}
      simpleValue
    />
  </GraphStartTimeDropdownContainer>
);
