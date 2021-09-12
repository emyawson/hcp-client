import {
  selectPatientDashboardUrl,
  createPatientDashboardUrlByPatient,
  constructAssignedPatientDashboardUrl,
} from './device-assignment.utils';

describe('Device Assignment Utils Tests', () => {
  const mockPatientId = 123;
  const mockRoutes = {
    patient: {
      createPatient: '/patient/create',
      deactivatePatient: '/patients/:id/deactivate',
      deliveryConfiguration: '/patients/:id/delivery-configuration',
      editPatient: '/patients/:id/edit',
      editTimePeriods: '/patients/:id/time-periods',
      graphSettings: '/patients/:id/graph-settings',
      listDevices: '/patients/:id/devices',
      listTreatments: '/patients/:id/treatments',
      nextShipment: '/patients/:id/next-shipment',
      patientById: '/patients/:id',
      patients: '/patients',
    },
  };

  it('Should select the patient dashboard URL from all domain routes', () => {
    expect(selectPatientDashboardUrl(mockRoutes)).toEqual(
      mockRoutes.patient.patientById,
    );
  });

  it('Should replace placeholder in dashboard URL with the latest patient ID', () => {
    expect(
      createPatientDashboardUrlByPatient(mockPatientId)(
        mockRoutes.patient.patientById,
      ),
    ).toEqual(`/patients/${mockPatientId}`);
  });

  it('Should replace placeholder in dashboard URL with the latest patient ID', () => {
    expect(
      constructAssignedPatientDashboardUrl(mockPatientId, mockRoutes),
    ).toEqual(`/patients/${mockPatientId}`);
  });
});
