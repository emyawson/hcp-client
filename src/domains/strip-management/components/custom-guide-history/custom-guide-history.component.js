import React from 'react';
import { equals, last, length } from 'ramda';

import {
  Accordion,
  AccordionItem,
  CaretIconLeft,
  CaretIconRight,
} from 'src/components';
import { TrashIcon } from 'src/assets/icons';
import { fontSize, colors } from 'src/core/styles';
import { translate } from 'src/i18n';
import { formatDateString } from 'src/utils';
import { RenderIf } from 'src/utils/render-if';

import {
  CustomGuideHistoryWrapperDiv,
  CustomGuideDetailsItemWrapper,
  RemoveCustomGuideRowDiv,
  RemoveCustomGuideButton,
  GuideHistoryPageNavigationWrapperDiv,
  GuideHistoryPageNumberButton,
  GuideHistoryPageNavButton,
  GuideHistoryPageNavLabel,
} from './custom-guide-history.style';

import {
  HistoryHeader,
  CustomClinicGuideSummary,
  LabelledGridItem,
} from '../../components';

const areMultiplePages = pages => length(pages) > 1;

export const CustomGuideHistory = ({
  customClinicGuides,
  guideHistoryFilter,
  setGuideHistoryFilter,
  onClickRemoveCustomGuide,
  guidePageNumbers,
  currentGuidePage,
  setGuideHistoryPage,
}) => (
  <CustomGuideHistoryWrapperDiv>
    <HistoryHeader
      guideHistoryFilter={guideHistoryFilter}
      setGuideHistoryFilter={setGuideHistoryFilter}
    >
      {translate('prescription.customClinicGuides.historyHeader')}
    </HistoryHeader>
    <Accordion activeItems={['example1']} allowMultiple>
      {customClinicGuides.map(
        ({
          name,
          minimumStrips,
          maximumStrips,
          period,
          id,
          ownerName,
          updatedAt,
          isRemovable,
          therapyName,
        }) => (
          <AccordionItem
            id={id}
            title={
              <CustomClinicGuideSummary
                name={name}
                ownerName={ownerName}
                date={formatDateString({ dateString: updatedAt })}
              />
            }
            cardStyles={['flat', 'noPadding']}
            key={id}
          >
            <CustomGuideDetailsItemWrapper>
              <LabelledGridItem
                label={translate(
                  'prescription.customClinicGuides.patientTherapy',
                )}
                value={therapyName}
                stretchToFitRow={false}
              />
              <LabelledGridItem
                label={translate(
                  'prescription.customClinicGuides.quantityRange',
                )}
                value={`${minimumStrips}-${maximumStrips}`}
                stretchToFitRow={false}
              />
              <LabelledGridItem
                label={translate('prescription.customClinicGuides.period')}
                value={period}
                stretchToFitRow={false}
              />
            </CustomGuideDetailsItemWrapper>
            <RemoveCustomGuideRowDiv>
              <RemoveCustomGuideButton
                buttonStyle="outlinedLight"
                label="remove"
                icon={<TrashIcon />}
                fontSize={fontSize.label}
                uppercase
                disabled={!isRemovable}
                onClick={() =>
                  onClickRemoveCustomGuide({
                    clinicGuideName: name,
                    clinicGuideId: id,
                  })
                }
              />
            </RemoveCustomGuideRowDiv>
          </AccordionItem>
        ),
      )}
    </Accordion>
    <RenderIf validate={areMultiplePages(guidePageNumbers)}>
      <GuideHistoryPageNavigationWrapperDiv>
        <GuideHistoryPageNavButton
          onClick={() => setGuideHistoryPage({ page: currentGuidePage - 1 })}
          disabled={equals(currentGuidePage, 1)}
        >
          <CaretIconLeft fillColor={colors.brandBlue} />
          <GuideHistoryPageNavLabel>
            {translate('prescription.customClinicGuides.previous')}
          </GuideHistoryPageNavLabel>
        </GuideHistoryPageNavButton>
        {guidePageNumbers.map(number => (
          <GuideHistoryPageNumberButton
            label={number}
            isSelected={equals(number, currentGuidePage)}
            onClick={() => setGuideHistoryPage({ page: number })}
            key={number}
          />
        ))}
        <GuideHistoryPageNavButton
          onClick={() => setGuideHistoryPage({ page: currentGuidePage + 1 })}
          disabled={equals(currentGuidePage, last(guidePageNumbers))}
        >
          <GuideHistoryPageNavLabel>
            {translate('prescription.customClinicGuides.next')}
          </GuideHistoryPageNavLabel>
          <CaretIconRight fillColor={colors.brandBlue} />
        </GuideHistoryPageNavButton>
      </GuideHistoryPageNavigationWrapperDiv>
    </RenderIf>
  </CustomGuideHistoryWrapperDiv>
);
