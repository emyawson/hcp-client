import * as React from 'react';
import { BaseCard } from 'src/components/base-card';
import { Block } from 'src/components/block';
import { colors } from 'src/core/styles';
import { HealthInfo } from 'src/widgets/patient/forms/health-info.component';
import { PatientInfo } from 'src/widgets/patient/forms/patient-info/patient-info.component';
import { SelectProfileType } from 'src/widgets/patient/forms/select-profile/select-profile-type.container';

import { EditPatientSection } from './edit-patient.styles';
import { EditPatientProps, EditPatientState } from './edit-patient.types';

export class EditPatientComponent extends React.Component<
  EditPatientProps,
  EditPatientState
> {
  public state = {
    step: 0,
  };

  public render() {
    return (
      <EditPatientSection>
        <Block pb={4}>
          <div>add step bar here</div>
        </Block>
        <BaseCard borderTop={`5px solid ${colors.brandBlue}`}>
          <SelectProfileType />
          <HealthInfo />
          <PatientInfo />
        </BaseCard>
      </EditPatientSection>
    );
  }
}
