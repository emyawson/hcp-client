import * as React from 'react';
import { StyledSystemProps } from 'src/theme/theme.types';

import { BaseStyleProps } from '../component.types';

import { BaseCardDiv } from './base-card.style';

type CardProps = BaseStyleProps & StyledSystemProps;

export const BaseCard: React.StatelessComponent<CardProps> = ({
  children,
  ...cardProps
}) => <BaseCardDiv {...cardProps}>{children}</BaseCardDiv>;
