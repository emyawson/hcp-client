import * as React from 'react';
import { Block, GridContainer, GridItem } from 'src/components';
import {
  ControlRadio,
  ControlSelect,
  ControlText,
  FormLabel,
} from 'src/components/forms';
import { spacing } from 'src/core/styles';
import { translate } from 'src/i18n';
import { combineRems } from 'src/utils';

import { InputDropdown, InputRadio, InputText } from '../components';
import { PatientFormModel } from '../forms.types';

import {
  PROFILE_BIRTH_DAYS,
  PROFILE_BIRTH_MONTHS,
  PROFILE_BIRTH_YEARS,
  PROFILE_COUNTRIES,
  PROFILE_LANGUAGES,
} from './patient-info.constants';
import {
  AllowPatientAccessWrapper,
  CreateNewPatientFormHeader,
  CreateNewPatientHeader,
  CreateNewPatientSubHeader,
  Hr,
  PatientInfoWrapper,
  SmallHr,
} from './patient-info.styles';
import { PatientInfoProps } from './patient-info.types';

const PatientHomeAddressInfo: React.StatelessComponent<{}> = () => (
  <React.Fragment>
    <GridItem span={2} columns={2}>
      <CreateNewPatientFormHeader>
        {translate('createPatient.titles.address')}
      </CreateNewPatientFormHeader>
    </GridItem>
    <GridItem span={1} columns={2}>
      <FormLabel
        id="street"
        label={translate('createPatient.patientInfoLabels.street')}
      />
      <ControlText
        mr={3}
        component={InputText}
        id="street"
        model={PatientFormModel.street}
        placeholder={translate('createPatient.patientInfoPlaceholders.street')}
      />
    </GridItem>
    <GridItem span={1} columns={2}>
      <FormLabel
        id="province"
        label={translate('createPatient.patientInfoLabels.province')}
      />
      <ControlText
        component={InputText}
        id="province"
        model={PatientFormModel.province}
        placeholder={translate(
          'createPatient.patientInfoPlaceholders.province',
        )}
      />
    </GridItem>
    <GridItem span={1} columns={2}>
      <FormLabel
        id="postalCode"
        label={translate('createPatient.patientInfoLabels.postalCode')}
      />
      <ControlText
        component={InputText}
        id="postalCode"
        model={PatientFormModel.postalCode}
        placeholder={translate(
          'createPatient.patientInfoPlaceholders.postalCode',
        )}
      />
    </GridItem>
    <GridItem span={1} columns={2}>
      <FormLabel id="city" label={translate('City')} />
      <ControlText
        component={InputText}
        id="city"
        model={PatientFormModel.city}
        placeholder={translate('createPatient.patientInfoPlaceholders.city')}
      />
    </GridItem>
    <GridItem span={1} columns={2}>
      <FormLabel id="country" label={translate('Country')} />
      <ControlSelect
        component={InputDropdown}
        id="country"
        model={PatientFormModel.country}
        placeholder={translate('createPatient.patientInfoPlaceholders.country')}
        options={PROFILE_COUNTRIES}
      />
    </GridItem>
  </React.Fragment>
);

export const PatientInfo: React.StatelessComponent<PatientInfoProps> = ({
  onNext,
  onBack,
}) => (
  <PatientInfoWrapper>
    <GridContainer>
      <GridItem span={12}>
        <Block pb={3} textAlign="center">
          <CreateNewPatientHeader>
            {translate('createPatient.titles.createPatientForm')}
          </CreateNewPatientHeader>
          <Block mb={4}>
            <Hr />
          </Block>
          <CreateNewPatientSubHeader>
            {translate('createPatient.titles.patientInfo')}
          </CreateNewPatientSubHeader>
          <SmallHr />
        </Block>
      </GridItem>

      <GridItem span={12}>
        <Block px={5} mb={5}>
          <GridContainer
            columns={2}
            gridSpacing={`${combineRems(
              spacing.three,
              spacing.four,
            )} ${combineRems(spacing.four, spacing.five)}`}
          >
            <GridItem span={1} columns={2}>
              <FormLabel
                id="firstName"
                label={translate('createPatient.patientInfoLabels.firstName')}
              />
              <ControlText
                component={InputText}
                id="firstName"
                model={PatientFormModel.firstName}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.firstName',
                )}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="lastName"
                label={translate('createPatient.patientInfoLabels.lastName')}
              />
              <ControlText
                component={InputText}
                id="lastName"
                model={PatientFormModel.lastName}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.lastName',
                )}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="dateOfBirthMonth"
                label={translate('createPatient.patientInfoLabels.dateOfBirth')}
              />
              <GridContainer>
                <GridItem span={4}>
                  <ControlSelect
                    component={InputDropdown}
                    id="dateOfBirthMonth"
                    model={PatientFormModel.dateOfBirthMonth}
                    placeholder={translate(
                      'createPatient.patientInfoPlaceholders.dateOfBirthMonth',
                    )}
                    options={PROFILE_BIRTH_MONTHS}
                  />
                </GridItem>
                <GridItem span={4}>
                  <ControlSelect
                    component={InputDropdown}
                    id="dateOfBirthDay"
                    model={PatientFormModel.dateOfBirthDay}
                    placeholder={translate(
                      'createPatient.patientInfoPlaceholders.dateOfBirthDay',
                    )}
                    options={PROFILE_BIRTH_DAYS}
                  />
                </GridItem>
                <GridItem span={4}>
                  <ControlSelect
                    component={InputDropdown}
                    id="dateOfBirthYear"
                    model={PatientFormModel.dateOfBirthYear}
                    placeholder={translate(
                      'createPatient.patientInfoPlaceholders.dateOfBirthYear',
                    )}
                    options={PROFILE_BIRTH_YEARS}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="healthCareId"
                label={translate(
                  'createPatient.patientInfoLabels.healthCareId',
                )}
              />
              <ControlText
                component={InputText}
                id="healthCareId"
                model={PatientFormModel.healthCareId}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.healthCareId',
                )}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="email"
                label={translate('createPatient.patientInfoLabels.email')}
              />
              <ControlText
                component={InputText}
                id="email"
                model={PatientFormModel.email}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.email',
                )}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="phoneNumber"
                label={translate('createPatient.patientInfoLabels.phoneNumber')}
              />
              <ControlText
                component={InputText}
                id="phoneNumber"
                model={PatientFormModel.phoneNumber}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.phoneNumber',
                )}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="language"
                label={translate('createPatient.patientInfoLabels.language')}
              />
              <ControlSelect
                component={InputDropdown}
                id="language"
                model={PatientFormModel.language}
                placeholder={translate(
                  'createPatient.patientInfoPlaceholders.language',
                )}
                options={PROFILE_LANGUAGES}
              />
            </GridItem>
            <GridItem span={1} columns={2}>
              <FormLabel
                id="allowPatientAccess-true"
                label={translate(
                  'createPatient.patientInfoLabels.allowPatientAccess',
                )}
              />
              <AllowPatientAccessWrapper>
                <Block mr={3}>
                  <ControlRadio
                    label={translate(
                      'createPatient.patientInfoLabels.allowPatientAccessOptions.true',
                    )}
                    value={true}
                    component={InputRadio}
                    id="allowPatientAccess-true"
                    model={PatientFormModel.allowPatientAccess}
                  />
                </Block>
                <Block>
                  <ControlRadio
                    label={translate(
                      'createPatient.patientInfoLabels.allowPatientAccessOptions.false',
                    )}
                    value={false}
                    component={InputRadio}
                    id="allowPatientAccess-false"
                    model={PatientFormModel.allowPatientAccess}
                    ml={2}
                  />
                </Block>
              </AllowPatientAccessWrapper>
            </GridItem>
            <GridItem span={2} columns={2}>
              <Hr />
            </GridItem>
            <PatientHomeAddressInfo />
          </GridContainer>
        </Block>
        <Hr />
      </GridItem>
    </GridContainer>
  </PatientInfoWrapper>
);
