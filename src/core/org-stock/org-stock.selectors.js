import { path } from 'ramda';

export const selectOrgStripModelStocks = path(['orgStock', 'stripModelStocks']);
export const selectOrgStripModels = path(['orgStock', 'stripModels']);
export const selectOrgAggregateStripStock = path([
  'orgStock',
  'aggregateStripStock',
]);
