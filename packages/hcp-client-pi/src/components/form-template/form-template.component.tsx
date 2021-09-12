import { PatternContent } from '@roche/patterns-indicators/components/form-template/form-template.style';
import { parse } from '@roche/patterns-indicators/utils/templates/templates.utils';
import * as React from 'react';

import { PatternValidation } from '@roche/patterns-indicators/types/config.types';

import { DropdownFactory } from './dropdown/dropdown.component';
import { ChangeHandler, FormTemplateProps } from './form-template.types';
import { NumberInputFactory } from './number-input/number-input.component';
import { RadioFactory } from './radio/radio.component';

const formRenderMap = (
  onChange: ChangeHandler,
  validationConfig: PatternValidation,
) => ({
  number: NumberInputFactory(onChange, validationConfig),
  select: DropdownFactory(onChange),
  radio: RadioFactory(onChange),
});

export const FormTemplateComponent: React.SFC<FormTemplateProps> = ({
  state,
  onChange,
  template,
  keyValue,
  validationConfig,
}) => (
  <PatternContent key={`pattern-key-${keyValue}`}>
    {parse(template, {
      render: formRenderMap(onChange, validationConfig),
      state,
    })}
  </PatternContent>
);
