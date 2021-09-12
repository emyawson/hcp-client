import React from 'react';
import { equals } from 'ramda';

import { Banner, Link, withLoaderErrorOnTimeout } from 'src/components';
import { stripManagementInnerRoutes } from 'src/domains/strip-management/routes';
import { translate } from 'src/i18n';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

import { PrescriptionSummaryCard } from './prescription-summary-card.component';

const emptyPrescriptionText = (
  <React.Fragment>
    {`${translate('stripDelivery.empty.prescription')} `}
    <WithPermissions hasPermissions={[PERMISSIONS.STRIP_PRESCRIPTIONS]}>
      <Link to={stripManagementInnerRoutes.prescriptionInfoByPatient}>
        {translate('stripDelivery.empty.prescriptionCta')}
      </Link>
    </WithPermissions>
  </React.Fragment>
);
const errorOptions = {
  ErrorComponent: () => <Banner text={emptyPrescriptionText} />,
};

const loaderOptions = {
  loaderProps: {
    infinite: true,
    minHeight: 48,
    size: 24,
  },
  validators: {
    active: equals(true),
  },
};

export const PrescriptionSummaryCardWithLoaderAndError = withLoaderErrorOnTimeout(
  {
    errorOptions,
    loaderOptions,
  },
)(PrescriptionSummaryCard);
