import * as React from 'react';

import { Button } from './segmented-button.style';

type SegmentedButtonProps = {
  labels: string[];
  selectedSegment: string;
  onSegmentClick: (clickedLabel: string) => void;
};

export const SegmentedButton: React.StatelessComponent<
  SegmentedButtonProps
> = ({ labels, selectedSegment, onSegmentClick }: SegmentedButtonProps) => (
  <React.Fragment>
    {labels.map((label, index) => (
      <Button
        // tslint:disable-next-line:jsx-no-lambda
        onClick={e => {
          onSegmentClick(label);
        }}
        active={selectedSegment === label}
        key={index}
      >
        {label}
      </Button>
    ))}
  </React.Fragment>
);
