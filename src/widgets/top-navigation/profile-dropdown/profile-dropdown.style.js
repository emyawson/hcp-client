import styled from 'styled-components';

import { colors, spacing, transitions } from 'src/core';

export const ProfileDropdownContainer = styled.div`
  margin-left: auto;
  position: relative;
`;

export const ProfileDropdownAvatarAndNameContainer = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom: ${spacing.three};
`;

export const PlaceholderIconContainer = styled.div`
  display: inline-block;
  position: relative;
  top: ${spacing.two};
  margin: 0 ${spacing.two};
`;

// Set hover state on SVG icon within
export const CaretDownContainer = styled.div`
  display: inline-block;

  path {
    transition: ${transitions.default};
  }

  &:hover,
  &:focus {
    path {
      fill: ${colors.brandBlue};
    }
  }
`;

export const CaretDownContainerDropdown = CaretDownContainer.extend`
  padding-left: ${spacing.three};
`;

export const ProfileNameContainer = styled.span`
  display: inline-block;
  padding-right: ${props => props.theme.spacing.one};
  vertical-align: middle;
`;
