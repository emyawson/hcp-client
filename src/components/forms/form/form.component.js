import React from 'react';
import { Form as RRFForm } from 'react-redux-form';

export const Form = ({ children, ...props }) => (
  <RRFForm {...props}>{children}</RRFForm>
);
