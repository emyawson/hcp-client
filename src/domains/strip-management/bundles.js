import React from 'react';

import { Bundle } from 'src/navigation/bundle';

export const OrgStockBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        OrgStockContainer,
      } = await import(/* webpackChunkName: "strips-stock" */ './scenes/org-stock/org-stock.container');
      return OrgStockContainer;
    }}
    bundleDidLoad={OrgStockContainer => <OrgStockContainer {...props} />}
  />
);

export const PrescriptionInformationBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        PrescriptionContainer,
      } = await import(/* webpackChunkName: "prescription-information" */ './scenes/prescription/prescription.container');
      return PrescriptionContainer;
    }}
    bundleDidLoad={PrescriptionContainer => (
      <PrescriptionContainer {...props} />
    )}
  />
);

export const StripDeliveryBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        StripDeliveryContainer,
      } = await import(/* webpackChunkName: "strip-delivery" */ './scenes/strip-delivery/strip-delivery.container');
      return StripDeliveryContainer;
    }}
    bundleDidLoad={StripDeliveryContainer => (
      <StripDeliveryContainer {...props} />
    )}
  />
);

export const AlertsBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        AlertsContainer,
      } = await import(/* webpackChunkName: "alerts" */ './scenes/alerts/alerts.container');
      return AlertsContainer;
    }}
    bundleDidLoad={AlertsContainer => <AlertsContainer {...props} />}
  />
);

export const CustomClinicGuidesBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        CustomClinicGuidesContainer,
      } = await import(/* webpackChunkName: "alerts" */ './scenes/custom-clinic-guides/custom-clinic-guides.container');
      return CustomClinicGuidesContainer;
    }}
    bundleDidLoad={CustomClinicGuidesContainer => (
      <CustomClinicGuidesContainer {...props} />
    )}
  />
);
