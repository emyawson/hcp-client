import React, { Component } from 'react';

import { CaretButton, CARET_DIRECTION, LocalizedText } from 'src/components';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import {
  PopoverListItem,
  PopoverListItemLink,
  PopoverListItemLinkTextSpan,
  POPOVER_LINK_ACTIVE_CLASS,
} from 'src/components/popover';

import { PATIENT_SUMMARY_ACTIONS } from './patient-summary-bar-dropdown.constants';
import {
  CaretDownContainer,
  PatientSummaryDropdownContainer,
  PatientSummaryIconContainer,
} from './patient-summary-bar-dropdown.style';

import { PatientSummaryBarDropdownPopover } from '../components/patient-summary-bar-dropdown-popover.component';

export class PatientSummaryBarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopover: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { showPopover } = this.state;

    const getPatientSummaryActionListItems = id =>
      PATIENT_SUMMARY_ACTIONS.map(
        ({ localizedStringKeyName, url, permissions }, index) => (
          <WithPermissions
            hasPermissions={permissions}
            key={`patient-summary-action-${permissions}-${index}`}
          >
            <PopoverListItem
              key={`patient-summary-action-${localizedStringKeyName}`}
            >
              <PopoverListItemLink
                to={`/patients/${id}${url}`}
                activeClassName={POPOVER_LINK_ACTIVE_CLASS}
              >
                <PopoverListItemLinkTextSpan>
                  <LocalizedText
                    textKey={`dashboard.patientCardPopover.${localizedStringKeyName}`}
                  />
                </PopoverListItemLinkTextSpan>
              </PopoverListItemLink>
            </PopoverListItem>
          </WithPermissions>
        ),
      );

    return (
      <PatientSummaryDropdownContainer
        innerRef={comp => this.setWrapperRef(comp)}
      >
        <PatientSummaryIconContainer onClick={this.toggleShowPopover}>
          <CaretDownContainer>
            <CaretButton direction={CARET_DIRECTION.DOWN} />
          </CaretDownContainer>
        </PatientSummaryIconContainer>
        <PatientSummaryBarDropdownPopover
          pushLeft={16}
          show={showPopover}
          width={17}
          dropdownContent={getPatientSummaryActionListItems(
            this.props.match.params.id,
          )}
          headerText="userDropdown.managePatientProfile"
        />
      </PatientSummaryDropdownContainer>
    );
  }

  toggleShowPopover = () => {
    this.setState({ showPopover: !this.state.showPopover });
  };

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
}
