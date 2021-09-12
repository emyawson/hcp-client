import React from 'react';
import { equals, pathOr } from 'ramda';

import {
  Button,
  withLoaderErrorOnTimeout,
  LocalForm,
  ControlButton,
  Banner,
} from 'src/components';
import { translate } from 'src/i18n';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

import { alertsThresholdLimitValidators } from './alerts.utils';
import { localFormModelPath } from './alerts.constants';

import {
  AlertsWrapperDiv,
  AlertsGridContainer,
  AlertsGridRow,
  AlertsSaveRowDiv,
} from '../../components/alerts/alerts.style';
import { AlertsHeader } from '../../components/alerts/alerts-header';
import { AlertsThresholdRow } from '../../components/alerts/alerts-threshold-row';
// Rows are key by ID used to retrieve data from the store

// Display a loader while awaiting the alerts data
const loaderOptions = {
  loaderProps: {
    flexibleHeight: true,
    infinite: true,
    minHeight: 400,
    text: translate('stripDelivery.alerts.loading'),
  },
  validators: {
    hasAlerts: equals(true),
  },
};
// Fall back to any Alerts form data that we have, if loading fails
const errorOptions = {
  ErrorComponent: AlertsGridContainer,
};
const AlertsGridContainerWithLoaderAndError = withLoaderErrorOnTimeout({
  errorOptions,
  loaderOptions,
})(AlertsGridContainer);

export const Alerts = ({
  onSaveAlerts,
  hasAlerts = false,
  attachDispatch,
  onUpdateThresholdLimit,
  alertSettings,
  hasError = false,
  alertThresholdRows,
}) => (
  <LocalForm
    model={localFormModelPath}
    getDispatch={attachDispatch}
    onSubmit={onSaveAlerts}
    initialState={alertSettings}
    validateOn="change"
    validators={alertsThresholdLimitValidators}
  >
    <WithPermissions hasPermissions={[PERMISSIONS.STRIP_PATIENT_ALERTS]}>
      <Banner text={translate('alerts.defaultBannerText')} />
      <AlertsWrapperDiv>
        <AlertsGridContainerWithLoaderAndError
          hasAlerts={hasAlerts}
          hasError={hasError}
        >
          <AlertsGridRow>
            <AlertsHeader />
          </AlertsGridRow>
          {alertThresholdRows.map(
            ({ counterLabel, id, intervalModelPath, label, values }) => (
              <AlertsGridRow key={`AlertsGridRow-${id}`}>
                <AlertsThresholdRow
                  key={`AlertsInterval-${id}`}
                  alertId={id}
                  intervalModelPath={intervalModelPath}
                  label={label}
                  values={values}
                  counterLabel={counterLabel}
                  initialCounterValue={pathOr(
                    0,
                    [id, 'thresholdLimit'],
                    alertSettings,
                  )}
                  onUpdateThresholdLimit={onUpdateThresholdLimit}
                />
              </AlertsGridRow>
            ),
          )}
          <AlertsGridRow>
            <AlertsSaveRowDiv>
              <ControlButton
                component={Button}
                model={localFormModelPath}
                accessibilityLabel={translate('saveAccessibilityLabel')}
                disabled={{ valid: false }}
                label={translate('alerts.save')}
              />
            </AlertsSaveRowDiv>
          </AlertsGridRow>
        </AlertsGridContainerWithLoaderAndError>
      </AlertsWrapperDiv>
    </WithPermissions>
  </LocalForm>
);
