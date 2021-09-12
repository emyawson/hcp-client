import * as React from 'react';

import { parse } from '@roche/patterns-indicators/utils/templates/templates.utils';

const renderMap = {
  number: (n: number) => <b>{`${n}`}</b>,
};

export interface ReadOnlyTemplate {
  template: string;
  state: { [key: string]: number }; // only interpolate numbers for now
}

export const ReadOnlyTemplateComponent: React.SFC<ReadOnlyTemplate> = ({
  template,
  state,
}) => (
  <p>
    {parse(template, {
      render: renderMap,
      state,
    })}
  </p>
);
