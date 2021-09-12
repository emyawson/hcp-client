import React from 'react';

import { MinimizeIcon } from 'src/assets/icons';

import { CardMinimizerButton } from './card-minimizer.style';

type Props = {
  link: string,
};

export const CardMinimizer = ({ link }: Props) => (
  <CardMinimizerButton to={link}>
    <MinimizeIcon />
  </CardMinimizerButton>
);
