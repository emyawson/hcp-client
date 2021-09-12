import { always, ifElse, prop } from 'ramda';
import * as React from 'react';

type Props = {
  validate: boolean;
  children?: JSX.Element;
};

export const RenderIf = ifElse(
  prop('validate'),
  ({ children }: Props) => <React.Fragment>{children}</React.Fragment>,
  always(null),
);
