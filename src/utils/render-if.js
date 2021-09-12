import { always, ifElse, prop } from 'ramda';
import React from 'react';

type Props = {
  validate: boolean,
  children?: Children,
};

export const RenderIf = ifElse(
  prop('validate'),
  ({ children }: Props) => <React.Fragment>{children}</React.Fragment>,
  always(null),
);
