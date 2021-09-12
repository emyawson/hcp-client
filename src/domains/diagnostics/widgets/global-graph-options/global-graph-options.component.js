import React, { Component } from 'react';

import { Card } from 'src/domains/diagnostics/components';
import DatePicker from 'src/domains/diagnostics/components/date-picker/date-picker.component';
import { DateRangeIcon } from 'src/domains/diagnostics/assets/icons';
import { DateSlider } from 'src/domains/diagnostics/components/date-slider';

import {
  DateSliderWrapper,
  OptionsWrapper,
  Option,
  DatePickerWrapper,
  DatePickerIconWrapper,
} from './global-graph-options.style';

export class GlobalGraphOptions extends Component {
  render() {
    const {
      locale,
      startDate,
      endDate,
      firstMeasurementDate,
      lastMeasurementDate,
    } = this.props;

    const disabled =
      !firstMeasurementDate && !lastMeasurementDate ? true : false;

    return (
      <Card cardStyles={['noPadding']} height="auto">
        <OptionsWrapper>
          <Option borderRight pl="2rem" width="20rem">
            <DatePickerWrapper>
              <DatePickerIconWrapper>
                <DateRangeIcon />
              </DatePickerIconWrapper>
              <DatePicker
                locale={locale}
                disabled={disabled}
                startDate={startDate}
                endDate={endDate}
                lastDate={lastMeasurementDate}
                earliestDate={firstMeasurementDate}
                onDatesChange={this.onDatesChange}
              />
            </DatePickerWrapper>
          </Option>
        </OptionsWrapper>
        <DateSliderWrapper>
          <DateSlider
            disabled={disabled}
            startDate={startDate}
            endDate={endDate}
            firstMeasurementDate={firstMeasurementDate}
            lastMeasurementDate={lastMeasurementDate}
            onDatesChange={this.onDatesChange}
          />
        </DateSliderWrapper>
      </Card>
    );
  }

  onDatesChange = (startDate, endDate) => {
    const { onDatesChange, match } = this.props;
    const patientId = match.params.id;
    onDatesChange(patientId, startDate, endDate);
  };
}
