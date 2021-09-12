import React from 'react';

import { IconDiv } from './placeholder-icon.style';

type PlaceholderIconProps = {
  color: string,
  size: number, // in px
};

export const PlaceholderIcon = ({ color, size }: PlaceholderIconProps) => (
  <IconDiv color={color} size={size} />
);
