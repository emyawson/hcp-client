import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, transitions } from 'src/core';

// Reset native button styles to generic styling
// Negative margin increases tap target size while maintaining inline layout
// Hover and focus states apply to nested SVG icon

export const IconContainerDiv = styled.div`
  padding: 1rem;
  margin: -1rem;
  text-decoration: none;
  cursor: pointer;

  path {
    transition: ${transitions.default};
  }

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    path {
      fill: ${colors.brandBlue};
    }
  }
`;

export const IconContainerLink = IconContainerDiv.withComponent(Link);
