import styled from 'styled-components';

import { borderRadius, colors, spacing, transitions } from 'src/core';

import { P, weight } from '../fonts';

export const BannerDiv = styled.div`
  background-color: ${colors.blueMarine};
  border-radius: ${borderRadius.three};
  color: ${colors.white};
  padding: 1em ${spacing.four};
  text-align: center;
  width: 100%:
`;

export const BannerP = P.extend`
  font-weight: ${weight.bold};
  line-height: 1;
  margin: 0 auto;

  a,
  a:visited {
    color: inherit;
    transition: ${transitions.default};
    text-decoration: underline;

    &:hover {
      color: ${colors.transparentBlack};
    }
  }
`;
