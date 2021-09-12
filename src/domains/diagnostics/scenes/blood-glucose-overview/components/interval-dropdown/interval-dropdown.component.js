import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n';
import { Dropdown } from 'src/domains/diagnostics/components';
import { DateRangeIcon } from 'src/domains/diagnostics/assets/icons';
import { TIME_INTERVAL } from 'src/domains/diagnostics/constants';

import {
  IntervalsDropdownValueWrapperDiv,
  IntervalsDropdownValueWrapperSpan,
  IntervalsDropdownValueContainer,
} from './interval-dropdown.style';

const intervals = [
  {
    label: translate('bloodGlucoseOverview.intervals.quarterly'),
    value: TIME_INTERVAL.QUARTERLY_INTERVALS,
  },
  {
    label: translate('bloodGlucoseOverview.intervals.monthly'),
    value: TIME_INTERVAL.MONTHLY_INTERVALS,
  },
  {
    label: translate('bloodGlucoseOverview.intervals.weekly'),
    value: TIME_INTERVAL.WEEKLY_INTERVALS,
  },
];

const IntervalValue = ({ className, id, children }) => (
  <IntervalsDropdownValueContainer>
    <IntervalsDropdownValueWrapperDiv>
      <DateRangeIcon height={17} fillColor={colors.brandBlue} />
      <IntervalsDropdownValueWrapperSpan>
        {children}
      </IntervalsDropdownValueWrapperSpan>
    </IntervalsDropdownValueWrapperDiv>
  </IntervalsDropdownValueContainer>
);

export const IntervalsDropdown = ({ onChangeInterval }) => (
  <Dropdown
    modelPath="ui.patientDashboard.bgOverview.timeInterval"
    onChange={onChangeInterval}
    options={intervals}
    searchable={false}
    selectHeight={'2.5rem'}
    valueComponent={IntervalValue}
  />
);
