import React from 'react';
import { compose } from 'recompose';
import { withPatientSummary } from 'src/domains/patient/utils/with-patient-summary';

import { EConectaFrame } from 'src/components';
import { translate } from 'src/i18n';
import { withToken } from 'src/utils/with-token';
import { withNavigators } from 'src/utils/with-navigators';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

export const EditTimePeriodsIFrame = compose(
  withToken,
  withNavigators({
    hasTopNav: true,
    hasLeftNav: true,
  }),
  withPatientSummary,
)(({ match, token }) => (
  <WithPermissions hasPermissions={[PERMISSIONS.TIME_BLOCKS_MANAGEMENT]}>
    <EConectaFrame
      title={translate('patient.editTimePeriods')}
      token={token}
      patientId={match.params.id}
      action="timeBlocks"
    />
  </WithPermissions>
));
