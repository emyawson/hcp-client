import React from 'react';
import { always } from 'ramda';

import { LabelledDatePicker } from 'src/components/date-picker/labelled-date-picker';
import { LabelledDropdown } from 'src/components/dropdown/labelled-dropdown';
import { SelectContainerDiv } from 'src/domains/strip-management/scenes/prescription/prescription.style';
import { translate } from 'src/i18n';

import { TemporaryPrescriptionRowDiv } from './temporary-prescription-form-options.style';

export const TemporaryPrescriptionFormOptions = ({
  reasons,
  id,
  placeholderText,
  onDatesChange,
}) => (
  <TemporaryPrescriptionRowDiv>
    <SelectContainerDiv>
      <LabelledDatePicker
        label={translate('prescription.dateRange.label')}
        modelPath=".dateRange"
        onChange={(startDate, endDate) => {
          onDatesChange({ startDate, endDate });
        }}
        checkIfDateOutOfRange={() => always(false)}
        isPresetsPanelDisplayed={false}
      />
    </SelectContainerDiv>
    <SelectContainerDiv>
      <LabelledDropdown
        label={translate('prescription.reason.label')}
        modelPath=".reason"
        options={reasons[id]}
        placeholder={placeholderText}
      />
    </SelectContainerDiv>
  </TemporaryPrescriptionRowDiv>
);
