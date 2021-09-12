import React from 'react';

type Props = {
  height?: number,
  width?: number,
};

export const LogoIcon = ({ height = 19, width = 19 }: Props) => (
  <img src={require('./roche_logo.png')} width={width} height={height} alt="" />
);
