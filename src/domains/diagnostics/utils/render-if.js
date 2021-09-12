import React from 'react';
import { ifElse, prop, always } from 'ramda';

export const RenderIf = ifElse(
  prop('validate'),
  ({ children }) => <React.Fragment>{children}</React.Fragment>,
  always(null),
);
