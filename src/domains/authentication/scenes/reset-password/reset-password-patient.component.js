import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import { translate } from 'src/i18n';
import { Column, IFrame } from 'src/components';
import { Config } from 'src/core/env';

import {
  AuthenticationPage,
  DescriptionColumn,
  DescriptionContainer,
  DescriptionDiv,
  DescriptionDivider,
  SubdescriptionDiv,
} from '../../components';

const { REACT_APP_RESET_PASSWORD_PATIENT_GIGYA_TOKEN } = Config;

export const ResetPasswordPatientComponent = ({ location }) => (
  <AuthenticationPage>
    <Column justifyContent="center" flex={4} height="100vh">
      <IFrame
        src={`/reset-password.html?apiKey=${REACT_APP_RESET_PASSWORD_PATIENT_GIGYA_TOKEN}&pwrt=${
          qs.parse(location.search, { ignoreQueryPrefix: true }).pwrt
        }`}
        scrolling="no"
        frameBorder="0"
        width="100%"
        height="500px"
      />
    </Column>
    <DescriptionColumn>
      <DescriptionContainer>
        <DescriptionDiv>{translate('login.description')}</DescriptionDiv>
        <DescriptionDivider />
        <SubdescriptionDiv>
          {translate('login.subdescription')}{' '}
        </SubdescriptionDiv>
      </DescriptionContainer>
    </DescriptionColumn>
  </AuthenticationPage>
);

export const ResetPasswordPatient = withRouter(ResetPasswordPatientComponent);
