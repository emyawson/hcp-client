import React, { Component } from 'react';
import {
  isEmpty,
  isNil,
  pathOr,
  equals,
  not,
  propOr,
  pipe,
  propEq,
  reject,
  allPass,
} from 'ramda';

import { translate } from 'src/i18n';
import { Banner } from 'src/components';
import { Accordion, AccordionItem, withLoader } from 'src/components';
import {
  flattenPrescriptions,
  isSavedPrescription,
  isTypeTemporary,
  onlyContainsNewPermanentForm,
} from 'src/core/prescription';
import { RenderIf, isNotEmpty, hasValue } from 'src/utils';
import { WithPermissions } from 'src/utils/with-permissions/with-permissions.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

import { PrescriptionErrorDiv } from './prescription.style';
import { PrescriptionFormContainer } from './prescription-form.container';
import { PrescriptionAccordionContainerDiv } from './prescription.style';

import { AddPrescription, PrescriptionSummaryCard } from '../../components';

const AccordionwithLoader = withLoader({
  loaderProps: {
    flexibleHeight: true,
    minHeight: 320,
    infinite: true,
    text: translate('requestsLoading.getCurrentPrescription'),
  },
  validators: {
    isLoading: equals(false),
    activeItems: isNotEmpty,
  },
})(Accordion);

const emptyPrescriptionText = (
  <React.Fragment>
    {`${translate('stripDelivery.empty.prescription')} `}
    {translate('stripDelivery.empty.prescriptionCta')}
  </React.Fragment>
);

export class Prescription extends Component {
  render() {
    const {
      activeFormId,
      activePrescription,
      prescriptions,
      allowAddTemporaryPrescription,
      displayAddTemporaryPrescription,
      isLoading,
      prescriptionHasError = false,
    } = this.props;

    return (
      <WithPermissions hasPermissions={[PERMISSIONS.STRIP_PRESCRIPTIONS]}>
        <PrescriptionAccordionContainerDiv>
          <RenderIf validate={onlyContainsNewPermanentForm(prescriptions)}>
            <PrescriptionErrorDiv>
              <Banner text={emptyPrescriptionText} />
            </PrescriptionErrorDiv>
          </RenderIf>

          <AccordionwithLoader
            activeItems={[activeFormId]}
            allowAllItemsClosed={false}
            isLoading={isLoading}
            label={translate('prescription.activeLabel')}
            onChange={this.setActivePrescriptionForm}
            sendInitialChangeEvent={false}
            labelDisplayLogic={formId =>
              allPass([hasValue, propEq('id', formId)])(activePrescription)
            }
            labelled={not(onlyContainsNewPermanentForm(prescriptions))}
            hasError={prescriptionHasError}
          >
            {this.createPrescriptionAccordionItems()}
          </AccordionwithLoader>
        </PrescriptionAccordionContainerDiv>

        <RenderIf validate={displayAddTemporaryPrescription}>
          <AddPrescription
            disabled={!allowAddTemporaryPrescription}
            expandHandler={this.addTemporaryPrescription}
          />
        </RenderIf>
      </WithPermissions>
    );
  }

  addTemporaryPrescription = () => {
    this.props.createPrescription();
  };

  getPatientId = () => pathOr(null, ['id'], this.props.patient);

  setActivePrescriptionForm = activeItems => {
    if (!isEmpty(activeItems)) {
      this.props.setActivePrescriptionForm(activeItems[0]);
    }
  };

  createPrescriptionAccordionItems = () => {
    const {
      prescriptions,
      nextDeliveryDate,
      patientStock,
      activeFormId,
    } = this.props;
    if (isNil(prescriptions.permanent)) {
      return [];
    }

    const flattenedPrescriptions = pipe(
      flattenPrescriptions,
      reject(isEmpty),
    )(prescriptions);
    return flattenedPrescriptions.map(prescription => {
      const {
        prescriptionType,
        id,
        stripModel,
        stripModelName,
        frequency,
      } = prescription;
      const isUnsaved = isSavedPrescription(prescription) ? false : true;
      const prescriptionSummary = (
        <PrescriptionSummaryCard
          active={equals(id, activeFormId)}
          patientStock={propOr(null, stripModel)(patientStock)}
          stripModel={stripModelName}
          frequency={frequency}
          nextDeliveryDate={nextDeliveryDate}
          isUnsaved={isUnsaved}
          prescriptionType={prescriptionType}
          showLoader={!isUnsaved}
          quantity={prescription.quantity}
          period={prescription.period}
          isAccordionHeader
          contentOnly
        />
      );
      return (
        <AccordionItem key={id} id={id} title={prescriptionSummary}>
          <PrescriptionFormContainer
            id={id}
            patientId={this.getPatientId()}
            isTemporaryPrescription={isTypeTemporary(prescriptionType)}
            isUnsaved={isUnsaved}
            isCurrentlyDisplayed={activeFormId === id}
          />
        </AccordionItem>
      );
    });
  };
}
