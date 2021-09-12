import { FormTemplateBuilderState } from '@roche/patterns-indicators/domains/form-template-builder/store';
import { Omit } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  ErrorMessagesBuilder,
  ErrorMessagesProps,
} from './error-messages.component';
import { selectFormsState } from './error-messages.selector';

export type ErrorMessagesContainerState = FormTemplateBuilderState;

export const ErrorMessagesContainer: React.ComponentClass<
  Omit<ErrorMessagesProps, 'theme'>
> = compose<{}, Omit<ErrorMessagesProps, 'theme'>>(connect(selectFormsState))(
  ErrorMessagesBuilder,
);
