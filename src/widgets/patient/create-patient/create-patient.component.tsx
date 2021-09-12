import * as React from 'react';
import { Form } from 'react-redux-form';
import { Button, ControlButton } from 'src/components';
import { translate } from 'src/i18n';
import { pass, RenderIf } from 'src/utils';
import { hasValue } from 'src/utils/ramda';

import { PatientFormModel } from '../forms/forms.types';
import { HealthInfo } from '../forms/health-info.component';
import { PatientInfo } from '../forms/patient-info/patient-info.component';
import { SelectProfileType } from '../forms/select-profile/select-profile-type.container';
import { ButtonsContainer } from '../forms/select-profile/select-profile.styles';
import { transformFormData } from '../forms/utils/transform-form';

import { CreatePatientProps, CreatePatientState } from './create-patient.types';

export class CreatePatient extends React.Component<
  CreatePatientProps,
  CreatePatientState
> {
  public state = {
    profileTypeSelected: false,
    patientInfoCompleted: false,
    healthInfoCompleted: false,
    hasErrored: false,
  };
  public componentWillMount() {
    this.props.getDepartmentProfileTypes();
    this.props.getCountries();
  }
  public render() {
    const {
      profileTypeSelected,
      patientInfoCompleted,
      healthInfoCompleted,
    } = this.state;
    return (
      <Form model="createPatient" onSubmit={this.createPatient}>
        <RenderIf
          validate={
            !profileTypeSelected &&
            !patientInfoCompleted &&
            !healthInfoCompleted
          }
        >
          <SelectProfileType />
          <ButtonsContainer>
            <Button
              onClick={this.onProfileTypeStep(false)}
              buttonStyle="secondary"
              label={translate('createPatient.stepOne.button.back')}
            />
            <ControlButton
              model={PatientFormModel.profileType}
              disabled={fieldValue => !hasValue(fieldValue.value)}
              onClick={this.onProfileTypeStep(true)}
              component={Button}
              mapProps={{
                buttonStyle: 'primary',
                label: translate('createPatient.stepOne.button.next'),
              }}
            />
          </ButtonsContainer>
        </RenderIf>
        <RenderIf
          validate={
            profileTypeSelected && !patientInfoCompleted && !healthInfoCompleted
          }
        >
          <PatientInfo />
          <button role="button" onClick={this.onProfileTypeStep(false)}>
            Back
          </button>
          <button role="button" onClick={this.onPatientInfoStep(true)}>
            Next
          </button>
        </RenderIf>
        <RenderIf
          validate={
            profileTypeSelected && patientInfoCompleted && !healthInfoCompleted
          }
        >
          <HealthInfo />
          <button role="button" onClick={this.onPatientInfoStep(false)}>
            Back
          </button>
          <button role="button" onClick={this.onHealthInfoStep(true)}>
            Next
          </button>
        </RenderIf>
        <RenderIf
          validate={
            profileTypeSelected && patientInfoCompleted && healthInfoCompleted
          }
        >
          Done
          <button type="submit">Submit</button>
          <button role="button" onClick={this.onHealthInfoStep(false)}>
            Back
          </button>
        </RenderIf>
      </Form>
    );
  }
  private createPatient = (
    patientInformation: { [P in keyof typeof PatientFormModel]: any },
  ) => {
    return this.props.onCreatePatient({
      professionalId: 13241,
      patient: transformFormData(patientInformation),
    });
  };
  private onProfileTypeStep = (value: boolean) => () => {
    this.setState({
      profileTypeSelected: value,
    });

    this.props.onStep(pass(value) ? 1 : 0);
    if (!value && this.props.goToHome) {
      this.props.goToHome();
    }
  };
  private onPatientInfoStep = (value: boolean) => () => {
    this.setState({
      patientInfoCompleted: value,
    });
    this.props.onStep(pass(value) ? 2 : 1);
  };
  private onHealthInfoStep = (value: boolean) => () => {
    this.setState({
      healthInfoCompleted: value,
    });
    this.props.onStep(pass(value) ? 3 : 2);
  };
}
