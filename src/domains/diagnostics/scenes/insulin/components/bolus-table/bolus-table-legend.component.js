import React from 'react';

import { LocalizedText } from 'src/domains/diagnostics/components';

import { RedCircle } from './red-circle.component';

import { SpanWithRightPadding } from '../insulin-table/insulin-table.style';

export const BolusTableLegend = () => (
  <div>
    <div style={{ float: 'right' }}>
      <SpanWithRightPadding>
        <RedCircle /> <LocalizedText textKey="graphs.insulin.bolus" />
      </SpanWithRightPadding>
    </div>
  </div>
);
