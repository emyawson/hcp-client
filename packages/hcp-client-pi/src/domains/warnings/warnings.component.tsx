import * as React from 'react';

import { SegmentedButton, TrendGraph } from '@roche/patterns-indicators/components';

import { trendGraphMockProps } from './warnings.mock';
import { WarningsHeader, WarningsWrapper } from './warnings.style';

type WarningsProps = {
  selectedSegment: string;
  selectSegment: (string) => void;
};

export const Warnings: React.StatelessComponent<WarningsProps> = ({
  selectedSegment,
  selectSegment,
}: WarningsProps) => (
  <WarningsWrapper>
    <WarningsHeader>
      <SegmentedButton
        selectedSegment={selectedSegment}
        labels={['Trend Graph', 'Log Book']}
        // tslint:disable-next-line:jsx-no-lambda
        onSegmentClick={clickedLabel => {
          selectSegment(clickedLabel);
        }}
      />
    </WarningsHeader>
    {selectedSegment === 'Trend Graph' && (
      <TrendGraph {...trendGraphMockProps} />
    )}
    {selectedSegment === 'Log Book' && 'Log Book'}
  </WarningsWrapper>
);
