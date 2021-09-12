import * as React from 'react';

import { styleFormLabel } from './form-label.style';
import { FormLabelProps } from './form-label.types';

const FormLabelComponent: React.StatelessComponent<FormLabelProps> = ({
  className,
  label,
  id,
}) => (
  <label className={className} htmlFor={id}>
    {label}
  </label>
);

export const FormLabel = styleFormLabel(FormLabelComponent);
