import React from 'react';

import { BannerDiv, BannerP } from './banner.style';

export const Banner = ({ text }) => (
  <BannerDiv>
    <BannerP>{text}</BannerP>
  </BannerDiv>
);
