import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import { changeForm, FormTemplateBuilderState } from '../store';

import {
  FormTemplateBuilder,
  FormTemplateBuilderProps,
} from './form-template-builder.component';

// prettier-ignore
export const FormTemplateBuilderContainer: React.ComponentClass<Omit<Omit<FormTemplateBuilderProps, 'changeHandler'>, 'theme'>> = compose<
  {},
  Omit<Omit<FormTemplateBuilderProps, 'changeHandler'>, 'theme'>
>(
  connect(
    null,
    (dispatch: Dispatch<FormTemplateBuilderState>) => ({
      changeHandler: (path: string, fieldName: string, value: any) =>
        dispatch(changeForm(path, fieldName, value)),
    }),
  ),
)(FormTemplateBuilder);
