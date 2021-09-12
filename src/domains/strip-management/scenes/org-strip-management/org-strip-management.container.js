import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/utils';
import { withNavigators } from 'src/utils/with-navigators';
import { getPatientStockRequest } from 'src/core';

import { OrgStripManagement } from './org-strip-management.component';
import { orgStripManagementConnector } from './store/org-strip-management.selector';

const dispatchers = mapDispatchers({
  getPatientStockRequest: getPatientStockRequest.start,
});

export const addOrgStripManagement = compose(
  connect(
    orgStripManagementConnector,
    dispatchers,
  ),
);

export const OrgStripManagementWrapper = compose(
  withNavigators({
    hasLeftNav: true,
    hasTopNav: true,
  }),
  withRouter,
  addOrgStripManagement,
)(OrgStripManagement);
