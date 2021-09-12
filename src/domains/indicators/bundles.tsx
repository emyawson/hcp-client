import { assocPath, path } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { store } from 'src/app';
import { VALIDATE_SESSION } from 'src/core/authentication/authentication.constants';
import { getToken } from 'src/core/authentication/authentication.selectors';
import { injectEpic } from 'src/epic';
import { i18n } from 'src/i18n';
import { injectModuleReducer } from 'src/modules';
import { theme } from 'src/theme';

import { Div } from 'src/components/div/div.component';
import { Headline } from 'src/components/fonts';
import { Keyline } from 'src/components/keyline';
import { LocalizedText } from 'src/components/localized-text';
import { FETCH_PATIENT_REQUEST } from 'src/core/patient/patient.constant';
import { colors } from 'src/core/styles/colors';
import { GET_CURRENT_USER } from 'src/core/user/user.constants';
import { ModuleBundleComponent } from 'src/navigation/module-bundle.component';
import { withNavigators } from 'src/utils/with-navigators';
import { PatientSummaryBarContainer } from 'src/widgets/patient-summary-bar/patient-summary-bar.container';

import { withRouter } from 'react-router-dom';

export const EXAMPLE_CONFIG = {
  endpoints: {
    indicatorsConfigurationTemplate:
      'https://univ-uploader-dev.rochedc.accentureanalytics.com/hcp-backend-pi/v1/indicators-configuration-template',
    patientConfiguration:
      'https://univ-uploader-dev.rochedc.accentureanalytics.com/hcp-backend-pi/v1/configuration/:patientId',
  },
  baseObservationsHost: 'https://smartpix-dev.rochedc.accentureanalytics.com',
  baseEconectaHost: 'https://univ-uploader-dev.rochedc.accentureanalytics.com',
};

const configReducer = initialConfig => (state = initialConfig, action) => {
  switch (action.type) {
    case VALIDATE_SESSION.SUCCESS:
      return assocPath(['token'], action.payload.token, state);

    case FETCH_PATIENT_REQUEST.SUCCESS:
      return assocPath(['patientId'], action.payload.id, state);

    case GET_CURRENT_USER.SUCCESS:
      return {
        ...state,
        hcpId: action.payload.user.is,
        loggedInAs: action.payload.user.fullname,
      };

    default:
      return state;
  }
};

export const AdvancedIndicatorsBundle = (props: any = {}) => (
  <ModuleBundleComponent
    bundleWillLoad={async () => {
      const {
        createPatternsAndIndicators,
      } = await import(/* webpackChunkName: "patternsAndIndicators" */ '@roche/patterns-indicators');

      return {
        component: createPatternsAndIndicators(
          store,
          injectModuleReducer,
          injectEpic,
          { ...EXAMPLE_CONFIG, ...props },
          configReducer,
          theme,
          i18n,
        ),
      };
    }}
    bundleDidLoad={(Component: React.ComponentType<any>) => <Component />}
  />
);

const AdvancedIndicatorsBundleContainer = connect(
  createStructuredSelector({
    patientId: (state, ownProps) => path(['match', 'params', 'id'], ownProps),
    token: getToken,
    loggedInAs: state => path(['session', 'user', 'fullname'], state),
    hcpId: state => path(['session', 'user', 'id'], state),
  }),
)(AdvancedIndicatorsBundle);

const AdvancedIndicatorsBundleContainerWithPatientCard: React.SFC<any> = (
  props: any,
) => {
  return (
    <React.Fragment>
      <Div mb={4}>
        <PatientSummaryBarContainer />
      </Div>
      <Div mb={4}>
        <Headline {/* @ts-ignore */ ...{ fontWeight: 'semiBold' }}>
          <LocalizedText textKey="advancedIndicators.title" />
        </Headline>
        <Keyline {/* @ts-ignore */ ...{ color: colors.grayLight }} />
      </Div>

      <AdvancedIndicatorsBundleContainer {...props} />
    </React.Fragment>
  );
};

export const AugmentedAdvancedIndicatorsBundleContainer = compose(
  withNavigators({
    hasLeftNav: true,
    hasTopNav: true,
  }),
  withRouter,
)(AdvancedIndicatorsBundleContainerWithPatientCard);
