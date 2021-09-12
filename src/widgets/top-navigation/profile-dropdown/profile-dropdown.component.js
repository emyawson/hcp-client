import React from 'react';

import {
  CaretButton,
  PlaceholderIcon,
  CARET_DIRECTION,
  withLoader,
} from 'src/components';
import { colors } from 'src/core/styles/colors';
import { hasValue } from 'src/utils';

import { ProfileDropdownPopover } from './profile-dropdown-popover';
import {
  ProfileDropdownContainer,
  ProfileDropdownAvatarAndNameContainer,
  PlaceholderIconContainer,
  CaretDownContainer,
  ProfileNameContainer,
} from './profile-dropdown.style';

const FullNameTextComponent = ({ children }) => <span>{children}</span>;
const validators = {
  fullName: hasValue,
};
const loaderProps = {
  flexibleHeight: true,
  infinite: true,
  size: 16,
};

const ProfileNameWithLoader = withLoader({ loaderProps, validators })(
  FullNameTextComponent,
);

export class ProfileDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopover: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { fullName, onSignOut } = this.props;
    const { showPopover } = this.state;

    return (
      <ProfileDropdownContainer innerRef={comp => this.setWrapperRef(comp)}>
        <ProfileDropdownAvatarAndNameContainer
          onClick={this.toggleModalDisplay}
        >
          <ProfileNameContainer>
            <ProfileNameWithLoader fullName={fullName}>
              {fullName}
            </ProfileNameWithLoader>
          </ProfileNameContainer>
          <PlaceholderIconContainer>
            <PlaceholderIcon color={colors.grayLight} size={25} />
          </PlaceholderIconContainer>&nbsp;
          <CaretDownContainer>
            <CaretButton direction={CARET_DIRECTION.DOWN} />
          </CaretDownContainer>
        </ProfileDropdownAvatarAndNameContainer>
        <ProfileDropdownPopover
          onSignOut={onSignOut}
          pushLeft={5}
          pushArrowLeft={-9}
          show={showPopover}
          width={17}
        />
      </ProfileDropdownContainer>
    );
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    const { showPopover } = this.state;

    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      showPopover
    ) {
      this.setState({ showPopover: false });
    }
  };

  toggleModalDisplay = () => {
    this.setState({ showPopover: !this.state.showPopover });
  };
}
