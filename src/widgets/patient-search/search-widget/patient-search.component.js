import * as React from 'react';
import { isEmpty } from 'ramda';

import {
  Button,
  InputText,
  LocalizedText,
  Row,
  Column,
  Widget,
  Form,
} from 'src/components';
import { CreatePatientIcon } from 'src/assets/icons';
import { translate } from 'src/i18n';

import {
  AddPatientDiv,
  SearchPatientFormDiv,
  PatientSearchFields,
} from './patient-search.style';

import { SearchResults, PatientRow } from '../components';
import { TitleName } from '../../../components/fonts';

export const PatientSearchWidget = ({
  onSearch,
  results,
  didSearch,
  switchPatient,
  onCreatePatient,
}) => (
  <Widget flexDirection="column" mb={4}>
    <SearchPatientFormDiv>
      <Form model="patientSearch" onSubmit={onSearch}>
        <Row wrap="wrap">
          <Row>
            <Column>
              <TitleName>
                <LocalizedText textKey="patientSearch.title" />
              </TitleName>
            </Column>
            <Column>
              <Row pt={3}>
                <Row onClick={onCreatePatient} justifyContent="flex-end">
                  <AddPatientDiv>
                    <CreatePatientIcon height={20} />
                    <LocalizedText
                      pl={3}
                      color="brandBlue"
                      textKey="patientSearch.addPatient"
                    />
                  </AddPatientDiv>
                </Row>
              </Row>
            </Column>
          </Row>
        </Row>
        <Row py={4} justify="space-between">
          <PatientSearchFields>
            <InputText
              id="patient-id"
              model="patientSearch.patientID"
              placeholder={translate('searchBar.patientId')}
              p={2}
              mr={3}
            />
            <InputText
              id="patient-name"
              model="patientSearch.fullName"
              placeholder={translate('searchBar.name')}
              p={2}
              mr={3}
            />
          </PatientSearchFields>
          <Button label={translate('searchBar.search')} />
        </Row>
      </Form>
    </SearchPatientFormDiv>
    {isEmpty(results) ? (
      didSearch && (
        <div>
          <LocalizedText textKey="patientSearch.noResults" />
        </div>
      )
    ) : (
      <SearchResults>
        {results.map(result => (
          <PatientRow
            key={`patient-search-result--${result.id}`}
            switchPatient={switchPatient}
            {...result}
          />
        ))}
      </SearchResults>
    )}
  </Widget>
);
