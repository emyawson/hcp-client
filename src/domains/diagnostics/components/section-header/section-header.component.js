import React from 'react';

import {
  SectionHeaderDiv,
  SectionHeaderHeadline,
} from './section-header.style';

import { Keyline } from '../keyline';

export const SectionHeader = ({
  title,
  textColor,
  bottomMargin,
  bottomMarginHeadline,
}) => (
  <SectionHeaderDiv bottomMargin={bottomMargin}>
    <SectionHeaderHeadline
      textColor={textColor}
      bottomMarginHeadline={bottomMarginHeadline}
    >
      {title}
    </SectionHeaderHeadline>
    <Keyline />
  </SectionHeaderDiv>
);
