import React from 'react';
import { isNil, all, pipe, not } from 'ramda';

import { colors } from 'src/core/styles/colors';
import {
  CheckmarkIcon,
  XIcon,
  FlagIcon,
  NoInformationIcon,
} from 'src/assets/icons';
import { translate } from 'src/i18n';

import {
  AlertContainer,
  AlertItem,
  AlertItemContent,
  AlertItemContentSpan,
} from './strip-delivery-alerts.style';

const checkmarkIcon = (
  <CheckmarkIcon
    fillColor={colors.trafficGreen}
    viewBoxWidth={45}
    viewBoxHeight={35}
    height={12}
  />
);

const notAvailableIcon = <NoInformationIcon height={9} width={9} />;
const xIcon = <XIcon height={9} width={9} />;

const flagIcon = <FlagIcon height={9} width={9} />; //eslint-disable-line no-unused-vars

const noAvailableValue = '-';
const passOrFailIcon = condition =>
  isNil(condition.pass)
    ? notAvailableIcon
    : condition.pass
      ? checkmarkIcon
      : xIcon;
const areValuesAvailable = all(
  pipe(
    isNil,
    not,
  ),
);

const createConditionAlert = (condition, valueDisplay, labelTextKey) => (
  <AlertItemContent>
    <AlertItemContentSpan>{passOrFailIcon(condition)}</AlertItemContentSpan>
    <AlertItemContentSpan>
      {`${translate(labelTextKey)} `}
      <strong>{valueDisplay}</strong>
    </AlertItemContentSpan>
  </AlertItemContent>
);

const createGlucoseThresholdAlertValueDisplay = condition =>
  areValuesAvailable([condition.threshold, condition.amount])
    ? `${condition.amount} ${translate('stripDelivery.alerts.outOf')} ${
        condition.threshold
      }`
    : noAvailableValue;

export const StripDeliveryAlert = ({
  conditions: { hypers, hypos, warnings, consumption },
  trafficLightStatus,
}) => (
  <AlertContainer>
    <AlertItem>
      {createConditionAlert(
        hypos,
        createGlucoseThresholdAlertValueDisplay(hypos),
        'stripDelivery.alerts.hypoThreshold',
      )}
      {createConditionAlert(
        hypers,
        createGlucoseThresholdAlertValueDisplay(hypers),
        'stripDelivery.alerts.upperLimit',
      )}
      {createConditionAlert(
        warnings,
        createGlucoseThresholdAlertValueDisplay(warnings),
        'stripDelivery.alerts.lowerLimit',
      )}
    </AlertItem>
  </AlertContainer>
);
