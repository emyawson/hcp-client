import React from 'react';
import { equals, not } from 'ramda';

import { hasValue, RenderIf } from 'src/utils';
import { translate } from 'src/i18n';
import {
  isTypePermanent,
  PATIENT_PRESCRIPTION_TYPES,
} from 'src/core/prescription';
import { LocalizedText } from 'src/components';
import { AccordionTitleDiv } from 'src/components/accordion/accordion.style';

import {
  PrescriptionSummaryCardContainer,
  PrescriptionSummaryCardHeaderDiv,
  PrescriptionSummaryCardHeader,
  PrescriptionSummaryCardLineItem,
  PrescriptionSummaryCardLineItemNoInfo,
  PrescriptionSummaryCardSubHeading,
  PrescriptionSubHeading,
  PrescriptionInfoTitle,
} from './prescription-summary-card.style';

const prescriptionTitles = {
  permanent: translate('prescription.permanentTitle'),
  temporary: translate('prescription.temporaryTitle'),
};

const generateStripConsumptionDisplayString = () =>
  `${translate('prescription.stripConsumption.title')}`;

const generateStripConsumptionDisplayFormulaString = ({ period, quantity }) => {
  const periodString = translate(`prescription.period.${period}`);
  return `${quantity} x ${periodString}`;
};

const generatePatientStockString = patientStock =>
  `${patientStock} ${translate('prescription.patientStock.units')}`;

export const PrescriptionSummaryCard = ({
  frequency = '',
  nextDeliveryDate = '',
  stripModel = '',
  titleKey,
  active = false,
  contentOnly = false,
  patientStock,
  isUnsaved = false,
  prescriptionType = PATIENT_PRESCRIPTION_TYPES.PERMANENT,
  period,
  quantity,
  isAccordionHeader = false,
}) => {
  const showPrescriptionTypeTitle =
    equals(prescriptionType, PATIENT_PRESCRIPTION_TYPES.TEMPORARY) ||
    not(isUnsaved);
  const prescriptionSummaryCardContents = () => (
    <PrescriptionSummaryCardContainer
      isUnsaved={isUnsaved}
      prescriptionType={prescriptionType}
      frequency={frequency}
      nextDeliveryDate={nextDeliveryDate}
    >
      <PrescriptionSummaryCardHeaderDiv
        active={active}
        isNested={isAccordionHeader}
      >
        <PrescriptionSummaryCardLineItem>
          <PrescriptionSummaryCardHeader>
            <LocalizedText textKey="prescription.title" />
          </PrescriptionSummaryCardHeader>
          <RenderIf validate={showPrescriptionTypeTitle}>
            <PrescriptionSummaryCardSubHeading>
              {prescriptionTitles[prescriptionType] || (
                <LocalizedText textKey={titleKey} />
              )}
            </PrescriptionSummaryCardSubHeading>
          </RenderIf>
        </PrescriptionSummaryCardLineItem>
      </PrescriptionSummaryCardHeaderDiv>
      <RenderIf validate={quantity && period && not(isUnsaved)}>
        <PrescriptionSummaryCardLineItem>
          <PrescriptionInfoTitle>
            {generateStripConsumptionDisplayString()}
          </PrescriptionInfoTitle>
          <PrescriptionSubHeading>
            {generateStripConsumptionDisplayFormulaString({
              period,
              quantity,
            })}
          </PrescriptionSubHeading>
        </PrescriptionSummaryCardLineItem>
      </RenderIf>
      <RenderIf validate={nextDeliveryDate && not(isUnsaved)}>
        <PrescriptionSummaryCardLineItem>
          <PrescriptionInfoTitle>
            {translate('stripDelivery.nextDeliveryDate')}
          </PrescriptionInfoTitle>
          <PrescriptionSubHeading>{nextDeliveryDate}</PrescriptionSubHeading>
        </PrescriptionSummaryCardLineItem>
      </RenderIf>
      <RenderIf validate={stripModel && not(isUnsaved)}>
        <PrescriptionSummaryCardLineItem>
          <PrescriptionInfoTitle>
            {translate('prescription.stripModel.label')}
          </PrescriptionInfoTitle>
          <PrescriptionSubHeading>{stripModel}</PrescriptionSubHeading>
        </PrescriptionSummaryCardLineItem>
      </RenderIf>

      <RenderIf validate={hasValue(patientStock) && not(isUnsaved)}>
        <PrescriptionSummaryCardLineItem>
          <PrescriptionInfoTitle>
            {translate('prescription.patientStock.label')}
          </PrescriptionInfoTitle>
          <PrescriptionSubHeading>
            {generatePatientStockString(patientStock)}
          </PrescriptionSubHeading>
        </PrescriptionSummaryCardLineItem>
      </RenderIf>
      <RenderIf validate={isUnsaved && isTypePermanent(prescriptionType)}>
        <PrescriptionSummaryCardLineItemNoInfo>
          {translate('prescription.patientHasNoCurrentPrescription')}
        </PrescriptionSummaryCardLineItemNoInfo>
      </RenderIf>
    </PrescriptionSummaryCardContainer>
  );
  if (contentOnly) {
    return <div>{prescriptionSummaryCardContents()}</div>;
  }
  return (
    <AccordionTitleDiv active={active} noPadding={true}>
      {prescriptionSummaryCardContents()}
    </AccordionTitleDiv>
  );
};
