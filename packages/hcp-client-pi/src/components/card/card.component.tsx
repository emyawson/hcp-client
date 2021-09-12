import * as React from 'react';
import { withTheme } from 'styled-components';

import { CardDiv } from './card.style';

interface CardProps {
  children?: any;
  theme: any; // TODO should this be IThemeInterface ?
}

const CardComponent = ({ children }: CardProps) => {
  return <CardDiv>{children}</CardDiv>;
};

export const Card = withTheme(CardComponent);
