import * as React from 'react';

import { CreatePatientIcon } from 'src/assets/icons';
import {
  Block,
  Button,
  Column,
  Form,
  LocalizedText,
  Row,
} from 'src/components';
import { TitleName } from 'src/components/fonts';
import { translate } from 'src/i18n';

import {
  AddPatientIconButton,
  PatientSearchFields,
  SearchPatientFormDiv,
  SearchPatientInputField,
} from './assign-patient-search.style';

import { AssignPatientSearchProps } from './assign-patient-search.types';

export const AssignPatientSearch: React.StatelessComponent<
  AssignPatientSearchProps
> = ({ onSearch, onCreatePatient, toggleCreatePatientView }) => (
  <SearchPatientFormDiv>
    <Form model="deviceAssignmentPatientSearch" onSubmit={onSearch}>
      <Row flexWrap="wrap" alignItems="center">
        <Column>
          <TitleName>
            <LocalizedText textKey="deviceAssignment.patientSearch.title" />
          </TitleName>
        </Column>
        <Column>
          <AddPatientIconButton onClick={toggleCreatePatientView}>
            <CreatePatientIcon height={20} />
          </AddPatientIconButton>
        </Column>
      </Row>
      <Row py={4} justify="space-between">
        <PatientSearchFields>
          <SearchPatientInputField
            id="patient-id"
            model="deviceAssignmentPatientSearch.patientID"
            placeholder={translate(
              'deviceAssignment.patientSearch.searchBar.patientId',
            )}
          />
          <SearchPatientInputField
            id="patient-name"
            model="deviceAssignmentPatientSearch.fullName"
            placeholder={translate(
              'deviceAssignment.patientSearch.searchBar.name',
            )}
          />
        </PatientSearchFields>
        <Block display="flex" justifyContent="center" alignItems="center">
          <Button
            label={translate('deviceAssignment.patientSearch.searchBar.search')}
          />
        </Block>
      </Row>
    </Form>
  </SearchPatientFormDiv>
);
