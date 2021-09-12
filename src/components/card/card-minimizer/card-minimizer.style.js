import { Link } from 'react-router-dom';

import { colors, spacing, transitions } from 'src/core';

import { TitleMed } from '../../fonts/subheading';

// Reset native button styles to generic styling
// Negative margin increases tap target size while maintaining inline layout
export const CardMinimizerButton = TitleMed.withComponent(Link).extend`
  padding: ${spacing.one};
  text-decoration: none;
  position: absolute;
  top: ${spacing.two};
  right: ${spacing.two};

  path {
    transition: ${transitions.default};
  }

  &:hover,
  &:focus {
    outline: none;
    
    path {
      fill: ${colors.brandBlue};
    }
  }
`;
