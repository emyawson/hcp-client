import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';

import { Column, HeaderRow } from '../insulin-table/insulin-table.style';

export const BasalRateTableHeader = () => (
  <HeaderRow>
    <Column flex={2}>
      <LocalizedText textKey="graphs.insulin.profile" />
    </Column>
    <Column flex={1} textAlign="right">
      <LocalizedText textKey="graphs.insulin.tbrIncrease" />
    </Column>
    <Column flex={1} textAlign="right">
      <LocalizedText textKey="graphs.insulin.tbrDecrease" />
    </Column>
  </HeaderRow>
);
