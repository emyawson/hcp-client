import React from 'react';

import {
  LabelledGridItemDiv,
  LabelledGridItemSubHeading,
  LabelledGridItemData,
} from './labelled-grid-item.style';

export const LabelledGridItem = ({
  label,
  value = '-',
  highlighted,
  isRowTitle,
  stretchToFitRow = true,
}) => (
  <LabelledGridItemDiv
    highlighted={highlighted}
    isRowTitle={isRowTitle}
    stretchToFitRow={stretchToFitRow}
  >
    <LabelledGridItemSubHeading>{label}</LabelledGridItemSubHeading>
    <LabelledGridItemData>{value}</LabelledGridItemData>
  </LabelledGridItemDiv>
);
