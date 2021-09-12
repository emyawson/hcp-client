import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';

import { Column, HeaderRow } from '../insulin-table/insulin-table.style';

export const BolusTableHeader = () => (
  <HeaderRow>
    {[
      'graphs.insulin.bolusType',
      'graphs.insulin.categoryName',
      'graphs.insulin.percentSymbol',
      'graphs.insulin.days',
    ].map((textKey, index) => (
      <Column key={`${textKey}-${index}`}>
        <LocalizedText textKey={textKey} />
      </Column>
    ))}
  </HeaderRow>
);
