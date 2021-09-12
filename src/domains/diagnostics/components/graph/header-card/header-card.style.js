import styled from 'styled-components';

import {
  colors,
  fontSize,
  spacing,
  boxShadow,
  transitionSpeed,
  transitionEasing,
} from 'src/domains/diagnostics/styles';

export const HeaderBaseCard = styled.section`
  background: ${colors.white};
  padding: ${spacing.three} ${spacing.four};
  padding-top: ${props => props.noPaddingTop && 0};
  position: relative;
  transition: padding ${transitionSpeed.default} ${transitionEasing.default};
  width: 100%;
  margin: 0;

  @supports (-ms-ime-align: auto) {
    box-shadow: ${boxShadow({
      color: colors.blueMarineAlpha15,
      depth: 'three',
    })};
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    box-shadow: ${boxShadow({
      color: colors.blueMarineAlpha15,
      depth: 'three',
    })};
  }
`;

HeaderBaseCard.displayName = 'HeaderBaseCard';

export const Header = styled.h2`
  font-size: ${fontSize.headline};
  font-weight: 400;
  color: ${colors.charcoal};
  margin: ${spacing.three} 0;
  margin-top: ${props => props.noMarginTop && 0};
`;

Header.displayName = 'Header';

export const Subheader = Header.extend`
  font-size: ${fontSize.subheading};
`;

Subheader.displayName = 'Subheader';

export const HeaderBackgroundImage = styled.div`
  height: 9px;
  background-image: linear-gradient(
    to bottom,
    #5d8fdf3d,
    rgba(93, 143, 223, 0)
  );
  width: 100%;
`;

HeaderBackgroundImage.displayName = 'HeaderBackgroundImage';
