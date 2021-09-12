import * as React from 'react';

import { Block } from 'src/components/block';
import { transformStepItems } from 'src/components/step-navigation';
import { StepNavigationCircles } from 'src/components/step-navigation/step-navigation-circles';
import { CreatePatientWidget } from 'src/widgets/patient/create-patient';

import { ASSIGN_CREATE_PATIENT_STEP_CONFIG } from './assign-create-patient.constants';

type AssignCreatePatientProps = {
  toggleDisplayCreatePatientView: () => void;
};
type AssignCreatePatientState = {
  step: number;
};

export class AssignCreatePatientComponent extends React.Component<
  AssignCreatePatientProps,
  AssignCreatePatientState
> {
  public state = {
    step: 0,
  };
  public render() {
    const { toggleDisplayCreatePatientView } = this.props;
    const { step } = this.state;
    return (
      <React.Fragment>
        <Block pb={5} pt={4}>
          <StepNavigationCircles
            currentStep={step}
            steps={transformStepItems(step, ASSIGN_CREATE_PATIENT_STEP_CONFIG)}
          />
        </Block>
        <CreatePatientWidget
          onStep={(step: number) => {
            this.setState({ step });
          }}
          onCreatePatient={toggleDisplayCreatePatientView}
          context="udtc"
        />
      </React.Fragment>
    );
  }
}
