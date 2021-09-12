import React from 'react';
import { compose } from 'recompose';
import { withPatientSummary } from 'src/domains/patient/utils/with-patient-summary';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export const DeactivatePatientIFrame = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
  withPatientSummary,
)(({ token, patient, match }) => (
  <WithPermissions hasPermissions={[PERMISSIONS.PATIENT_MANAGEMENT_DELETE]}>
    <EConectaFrame
      title={translate('patient.patientActivation')}
      token={token}
      action="patientActivation"
      patientId={match.params.id}
    />
  </WithPermissions>
));
