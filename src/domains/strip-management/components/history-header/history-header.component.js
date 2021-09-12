import React from 'react';
import { equals } from 'ramda';

import { translate } from 'src/i18n';
import { GUIDE_HISTORY_FILTERS } from 'src/core/prescription';

import {
  HistoryHeaderDiv,
  HistoryHeaderTitle,
  GuideFiltersWrapperDiv,
  GuideFilterDiv,
  GuideFiltersLabelSpan,
} from './history-header.style';

export const HistoryHeader = ({
  guideHistoryFilter,
  setGuideHistoryFilter,
}) => (
  <HistoryHeaderDiv>
    <HistoryHeaderTitle>
      {translate('prescription.customClinicGuides.historyHeader')}
    </HistoryHeaderTitle>
    <GuideFiltersWrapperDiv>
      <GuideFiltersLabelSpan>
        {`${translate('prescription.customClinicGuides.sortBy')}:`}
      </GuideFiltersLabelSpan>
      <GuideFilterDiv
        active={equals(guideHistoryFilter, GUIDE_HISTORY_FILTERS.ALL)}
        onClick={() =>
          setGuideHistoryFilter({ filter: GUIDE_HISTORY_FILTERS.ALL })
        }
      >
        {translate('prescription.customClinicGuides.all')}
      </GuideFilterDiv>
      <GuideFilterDiv
        active={equals(guideHistoryFilter, GUIDE_HISTORY_FILTERS.PERSONAL)}
        onClick={() =>
          setGuideHistoryFilter({ filter: GUIDE_HISTORY_FILTERS.PERSONAL })
        }
      >
        {translate('prescription.customClinicGuides.personal')}
      </GuideFilterDiv>
    </GuideFiltersWrapperDiv>
  </HistoryHeaderDiv>
);
