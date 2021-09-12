import React from 'react';

import { translate } from 'src/i18n';

import { OrgStockHistoryItemWrapper } from '../org-stock-history.style';
import { LabelledGridItem } from '../../labelled-grid-item';

export const StripStockRow = ({
  dateAdded,
  id,
  name,
  tubeStock,
  unitStock,
  totalTubeStock,
  totalStripStock,
}) => (
  <OrgStockHistoryItemWrapper>
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.dateAdded')}
      value={dateAdded}
      highlighted
      isRowTitle
    />
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.model')}
      value={name}
    />
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.tubesAdded')}
      value={tubeStock}
    />
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.unitsAdded')}
      value={unitStock}
    />
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.tubesTotal')}
      value={totalTubeStock}
      highlighted
    />
    <LabelledGridItem
      label={translate('orgStock.orgStockHistory.unitsTotal')}
      value={totalStripStock}
      highlighted
    />
  </OrgStockHistoryItemWrapper>
);
