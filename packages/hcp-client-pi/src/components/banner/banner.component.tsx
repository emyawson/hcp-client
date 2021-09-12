import * as React from 'react';
import { withTheme } from 'styled-components';

import { BannerDiv, BannerP } from './banner.style';

interface BannerProps {
  theme: any;
  children?: any;
}

const BannerComponent = (props: BannerProps) => {
  const { children } = props;

  return (
    <BannerDiv>
      <BannerP>{children}</BannerP>
    </BannerDiv>
  );
};

export const Banner = withTheme(BannerComponent);
