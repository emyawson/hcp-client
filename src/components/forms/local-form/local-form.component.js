import React from 'react';
import { LocalForm as RRFLocalForm } from 'react-redux-form';

export const LocalForm = ({ children, ...props }) => (
  <RRFLocalForm {...props}>{children}</RRFLocalForm>
);
