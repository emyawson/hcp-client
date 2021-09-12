import * as React from 'react';

import { BaseCard } from 'src/components/base-card';
import { Block } from 'src/components/block';
import {
  StepNavigation,
  transformStepItems,
} from 'src/components/step-navigation';
import { colors } from 'src/core/styles';
import { CreatePatientWidget } from 'src/widgets/patient/create-patient/create-patient.widget';

import { CREATE_PATIENT_STEP_CONFIG } from './create-patient.constants';
import { CreatePatientSection } from './create-patient.styles';
import { CreatePatientProps, CreatePatientState } from './create-patient.types';

export class CreatePatientComponent extends React.Component<
  CreatePatientProps,
  CreatePatientState
> {
  public state = {
    step: 0,
  };
  public render() {
    const { step } = this.state;
    return (
      <CreatePatientSection>
        <Block pb={4}>
          <StepNavigation
            currentStep={step}
            steps={transformStepItems(step, CREATE_PATIENT_STEP_CONFIG)}
          />
        </Block>
        <BaseCard borderTop={`5px solid ${colors.brandBlue}`}>
          <CreatePatientWidget
            onStep={(step: number) => {
              this.setState({ step });
            }}
            onCreatePatient={() => true}
            context="normal"
          />
        </BaseCard>
      </CreatePatientSection>
    );
  }
}
