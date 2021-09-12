import * as React from 'react';

import { ControlRadio } from 'src/components/forms';
import { InputRadio } from 'src/components/forms/input-radio/input-radio.component';
import { GridContainer, GridItem, InputText } from 'src/components/index';
import { translate } from 'src/i18n';
import { hasValue } from 'src/utils/ramda';

import { PatientFormModel } from './forms.types';

type HealthInfoTypeProps = {};

export const HealthInfo: React.StatelessComponent<HealthInfoTypeProps> = () => (
  <GridContainer>
    <GridItem span={12}>
      <InputText
        id="diabetesType"
        model={PatientFormModel.diabetesType}
        placeholder={translate(
          'createPatient.healthInfo.associatedProfessional',
        )}
        p={2}
        mr={3}
      />
      <InputText
        id="firstAssociatedProfessional"
        model={PatientFormModel.firstAssociatedProfessional}
        placeholder={translate(
          'createPatient.healthInfo.associatedProfessional',
        )}
        p={2}
        mr={3}
      />
      <InputText
        id="secondAssociatedProfessional"
        model={PatientFormModel.secondAssociatedProfessional}
        placeholder={translate(
          'createPatient.healthInfo.associatedProfessional',
        )}
        p={2}
        mr={3}
      />
      <InputText
        id="dateOfDiagnosis"
        model={PatientFormModel.dateOfDiagnosis}
        placeholder={translate('createPatient.healthInfo.diagnosisDate')}
        p={2}
        mr={3}
      />
      <InputText
        id="pregnant"
        model={PatientFormModel.pregnant}
        placeholder={translate('createPatient.healthInfo.pregnant')}
        p={2}
        mr={3}
      />
      <InputText
        id="dueDate"
        model={PatientFormModel.dueDate}
        placeholder={translate('createPatient.healthInfo.dueDate')}
        p={2}
        mr={3}
      />
      <ControlRadio
        component={InputRadio}
        id="male"
        name="gender"
        value="male"
        label={translate('createPatient.healthInfo.male')}
        key="male"
        model={PatientFormModel.gender}
        validators={{ isRequired: hasValue }}
      />
      <ControlRadio
        component={InputRadio}
        id="female"
        label={translate('createPatient.healthInfo.female')}
        name="gender"
        value="female"
        key="female"
        model={PatientFormModel.gender}
        validators={{ isRequired: hasValue }}
      />
    </GridItem>
  </GridContainer>
);
