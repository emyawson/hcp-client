import React from 'react';
import { pathSatisfies } from 'ramda';

import { RouteNav, Ul, CommonUl, MenuItem } from 'src/components';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export class SideBarNav extends React.Component {
  render() {
    const { menuLinks, showDtcModal, showManufacturerInfoModal } = this.props;

    const advancedIndicatorsLinkExists = pathSatisfies(
      Boolean,
      ['advancedIndicators'],
      menuLinks,
    );

    return (
      <RouteNav className="print-hide">
        <Ul>
          <MenuItem key={menuLinks.logo.name} item={menuLinks.logo} />
          <MenuItem key={menuLinks.home.name} item={menuLinks.home} />
          {menuLinks.patientDashboard ? (
            <MenuItem
              key={menuLinks.patientDashboard.name}
              item={menuLinks.patientDashboard}
            />
          ) : null}
          {advancedIndicatorsLinkExists ? (
            <WithPermissions hasPermissions={[PERMISSIONS.ADVANCED_INDICATORS]}>
              <MenuItem
                key={menuLinks.advancedIndicators.name}
                item={menuLinks.advancedIndicators}
              />
            </WithPermissions>
          ) : null}
          <WithPermissions hasPermissions={[PERMISSIONS.STRIP_TRAFFIC_LIGHT]}>
            <MenuItem key={menuLinks.strips.name} item={menuLinks.strips} />
          </WithPermissions>
        </Ul>
        <CommonUl>
          <MenuItem
            key={menuLinks.dtc.name}
            item={menuLinks.dtc}
            onClick={showDtcModal}
          />
          <MenuItem
            key={menuLinks.info.name}
            item={menuLinks.info}
            onClick={showManufacturerInfoModal}
          />
          <MenuItem key={menuLinks.help.name} item={menuLinks.help} />
        </CommonUl>
      </RouteNav>
    );
  }

  handleClick = (itemName, toggleDtcModal, event) => {
    if (itemName === 'dtcIcon') {
      toggleDtcModal();
    }
  };
}
