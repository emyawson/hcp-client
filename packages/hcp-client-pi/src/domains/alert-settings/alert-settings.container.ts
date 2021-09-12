import { isEmpty } from 'ramda';
import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Dispatch } from 'redux';

import { InitializeFormConfigPayload } from '@roche/patterns-indicators/domains/form-template-builder/store/form-template-builder.types';
import {
  ConfigDetails,
  TranslationText,
} from '@roche/patterns-indicators/types/config.types';
import { augmentConfigDetailsWithTemplates } from '@roche/patterns-indicators/utils';

import {
  changeForm,
  fetchIndicatorsConfigurationTemplatesStart,
  FormTemplateBuilderState,
  initializeFormConfig,
} from '../form-template-builder/store';

import { AlertSettings, AlertSettingsProps } from './alert-settings.component';
import { alertSettingsConnector } from './alert-settings.selector';

export type LifecycleProps = {
  changeHandler: typeof changeForm;
  fetchIndicatorsConfigurationTemplatesStart: typeof fetchIndicatorsConfigurationTemplatesStart;
  initializeFormConfig: typeof initializeFormConfig;
} & AlertSettingsProps; // we require configState for lifecycle methods

// omit the changeHandler as an "outside" prop, we will map a dispatcher to that prop
export type AlertSettingsContainerProps = Omit<
  AlertSettingsProps,
  'changeHandler' | 'configState' | 'theme'
>;

export const AlertSettingsContainer: React.ComponentClass<
  AlertSettingsContainerProps
> = compose<{}, AlertSettingsContainerProps>(
  connect(
    alertSettingsConnector,
    (dispatch: Dispatch<FormTemplateBuilderState>) => ({
      changeHandler: (path: string, fieldName: string, value: any) =>
        dispatch(changeForm(path, fieldName, value)),
      initializeFormConfig: (payload: InitializeFormConfigPayload) =>
        dispatch(initializeFormConfig(payload)),
      fetchIndicatorsConfigurationTemplatesStart: payload =>
        dispatch(fetchIndicatorsConfigurationTemplatesStart(payload)),
    }),
  ),
  lifecycle<LifecycleProps, void>({
    componentDidMount() {
      if (isEmpty(this.props.configState)) {
        this.props.initializeFormConfig({
          state: {},
          validation: this.props.validationConfig,
          details: augmentConfigDetailsWithTemplates(
            (this.props.configDetails as ConfigDetails).categories,
            this.props.translationText as TranslationText,
          ),
        });
      }
    },
  }),
)(AlertSettings);
