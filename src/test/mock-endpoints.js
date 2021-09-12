import nock from 'nock';

export const cleanupMockEndpoints = () => nock.cleanAll();

// Mock endpoints will intercept fetch calls made in epic tests
// Undefined strings cover cases where test environment does not get API variables
// -- In these cases, we will need to intercept calls to URLs like:
// -- "http://localhost/undefined/undefined/authenticate"
// TODO: Remove fallbacks when Jenkins loads .env file properly
const apiRoot = process.env.REACT_APP_API_ROOT || 'undefined';
const apiVersion = process.env.REACT_APP_API_VERSION || 'undefined';
const apiDomain = 'http://localhost:3000';

export const mockEndpointUrls = {
  authenticate: `/${apiRoot}/${apiVersion}/authenticate`,
  firstTime: `/${apiRoot}/${apiVersion}/setPasswordAndSecurityQuestion`,
  resetPassword: `/${apiRoot}/${apiVersion}/updateTempPassword`,
  currentPrescription: `/${apiRoot}/${apiVersion}/prescriptions/current`,
  savePrescription: `/${apiRoot}/${apiVersion}/prescriptions`,
  getPatientStock: id =>
    `/${apiRoot}/${apiVersion}/patients/${id}/strips-information`,
  saveAlerts: id => `/${apiRoot}/${apiVersion}/patients/${id}/glucose-alerts`,
  currentUser: () => `/${apiRoot}/${apiVersion}/current-user`,
  getClinicalData: patientId =>
    `/${apiRoot}/${apiVersion}/patients/${patientId}/clinical-data`,
  saveDelivery: patientId =>
    `/${apiRoot}/${apiVersion}/patients/${patientId}/delivery`,
  getLastDeliveryStatus: patientId =>
    `/${apiRoot}/${apiVersion}/patients/${patientId}/delivery-status/last`,
  setDeliveryStatus: patientId =>
    `/${apiRoot}/${apiVersion}/patients/${patientId}/delivery-status`,
  country: '/eConecta/rest/api/country',
};

export const addMockEndpointDomain = url => `${apiDomain}${url}`;

export const mockAuthentication = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.authenticate))
    .persist()
    .post('')
    .reply(status, body);

export const mockCurrentUser = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.currentUser()))
    .persist()
    .get('')
    .reply(status, body);

export const mockSignOut = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.authenticate))
    .persist()
    .delete('')
    .reply(status, body);

export const mockFirstTime = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.firstTime))
    .persist()
    .post('')
    .reply(status, body);

export const mockResetPassword = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.resetPassword))
    .persist()
    .post('')
    .reply(status, body);

export const mockCurrentPrescription = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.currentPrescription))
    .persist()
    .get('')
    .reply(status, body);

export const mockSavePrescription = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.savePrescription))
    .persist()
    .post('')
    .reply(status, body);

export const mockGetPatientStock = ({
  status,
  body,
  patientId,
  stripModelId,
}) =>
  nock(addMockEndpointDomain(mockEndpointUrls.getPatientStock(patientId)))
    .persist()
    .get(`?stripModelId=${stripModelId}`)
    .reply(status, body);

export const mockSaveAlerts = ({ status, body, patientId }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.saveAlerts(patientId)))
    .persist()
    .put('')
    .reply(status, body);

export const mockGetClinicalData = ({
  status,
  body,
  patientId,
  startDate,
  endDate,
}) =>
  nock(addMockEndpointDomain(mockEndpointUrls.getClinicalData(patientId)))
    .persist()
    .get(
      `?${startDate ? `startDate=${startDate}` : ''}${
        endDate ? `${startDate ? '&' : ''}endDate=${endDate}` : ''
      }`,
    )
    .reply(status, body);

export const mockSaveDelivery = ({ status, body, patientId }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.saveDelivery(patientId)))
    .persist()
    .post('')
    .reply(status, {
      ...body,
      patientId,
    });

export const mockGetLastDeliveryStatus = ({ status, body, patientId }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.getLastDeliveryStatus(patientId)))
    .persist()
    .get('')
    .reply(status, body);

export const mockSetDeliveryStatus = ({ status, body, patientId }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.setDeliveryStatus(patientId)))
    .persist()
    .post('')
    .reply(status, body);

export const mockCountryEndpoint = ({ status, body }) =>
  nock(addMockEndpointDomain(mockEndpointUrls.country))
    .persist()
    .get('')
    .reply(status, body);
