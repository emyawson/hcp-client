import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { fetchOrgStockRequest, addOrgStockRequest } from 'src/core/org-stock';
import { getStripModelsRequest } from 'src/core/prescription';
import { mapDispatchers } from 'src/utils';

import { OrgStock } from './org-stock.component';
import { orgStockConnector } from './store/org-stock.selectors';

const dispatchers = mapDispatchers({
  fetchOrgStockRequest: fetchOrgStockRequest.start,
  addOrgStockRequest: addOrgStockRequest.start,
  getStripModelsRequest: getStripModelsRequest.start,
});

const onAddOrgStockHandler = ({
  addOrgStockRequest,
  clinicId,
  departmentId,
}) => vals => addOrgStockRequest({ clinicId, departmentId, ...vals });

export const OrgStockContainer = compose(
  connect(
    orgStockConnector,
    dispatchers,
  ),
  withHandlers({
    onAddOrgStock: onAddOrgStockHandler,
  }),
  lifecycle({
    componentDidMount() {
      const {
        clinicId,
        departmentId,
        fetchOrgStockRequest,
        getStripModelsRequest,
      } = this.props;
      if (clinicId && departmentId) {
        getStripModelsRequest({ clinicId, departmentId });
        fetchOrgStockRequest({ clinicId, departmentId });
      }
    },
  }),
)(OrgStock);
