import React from 'react';

import { LocalizedText, Popover } from 'src/domains/diagnostics/components';

import {
  PatientSummaryBarDropdownHeaderDiv,
  PatientSummaryBarDropdownActionList,
} from './patient-summary-bar-dropdown-popover.style';

export const PatientSummaryBarDropdownPopover = props => {
  const { dropdownContent, headerText, pushLeft, show, width } = props;
  return (
    <Popover width={width} pushLeft={pushLeft} show={show}>
      <PatientSummaryBarDropdownHeaderDiv>
        <LocalizedText textKey={headerText} />
      </PatientSummaryBarDropdownHeaderDiv>
      <PatientSummaryBarDropdownActionList>
        {dropdownContent}
      </PatientSummaryBarDropdownActionList>
    </Popover>
  );
};
