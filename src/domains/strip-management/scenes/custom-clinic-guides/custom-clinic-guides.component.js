import React from 'react';
import { pathOr } from 'ramda';

import { BackButton, Card, SectionHeader } from 'src/components';
import { PlusIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles';
import { RenderIf } from 'src/utils';
import { translate } from 'src/i18n';

import { CustomClinicGuidesFormContainer } from './custom-clinic-guides-form.container';
import { CreateCustomGuideButton } from './custom-clinic-guides.style';

import { CustomGuideHistory } from '../../components';
import { stripManagementLinksByPatient } from '../../routes';

const CustomClinicGuidesTitle = ({ patientId }) => (
  <span>
    <BackButton
      to={stripManagementLinksByPatient(patientId).prescriptionInfoByPatient}
    />
    {translate('prescription.customClinicGuides.title')}
  </span>
);

export const CustomClinicGuides = ({
  isCreateCustomGuideFormOpen,
  showCustomClinicGuidesForm,
  customClinicGuides,
  guideHistoryFilter,
  setGuideHistoryFilter,
  onClickRemoveCustomGuide,
  guidePageNumbers,
  currentGuidePage,
  setGuideHistoryPage,
  match,
}) => (
  <div>
    <SectionHeader
      textColor={colors.charcoal}
      title={
        <CustomClinicGuidesTitle
          patientId={pathOr(null, ['params', 'id'])(match)}
        />
      }
    />
    <CreateCustomGuideButton
      disabled={isCreateCustomGuideFormOpen}
      label={translate('prescription.customClinicGuides.createNew')}
      onClick={showCustomClinicGuidesForm}
      icon={<PlusIcon />}
    />
    <RenderIf validate={isCreateCustomGuideFormOpen}>
      <Card cardStyles={['blue']}>
        <CustomClinicGuidesFormContainer />
      </Card>
    </RenderIf>
    <CustomGuideHistory
      customClinicGuides={customClinicGuides}
      guideHistoryFilter={guideHistoryFilter}
      setGuideHistoryFilter={setGuideHistoryFilter}
      onClickRemoveCustomGuide={onClickRemoveCustomGuide}
      guidePageNumbers={guidePageNumbers}
      currentGuidePage={currentGuidePage}
      setGuideHistoryPage={setGuideHistoryPage}
    />
  </div>
);
