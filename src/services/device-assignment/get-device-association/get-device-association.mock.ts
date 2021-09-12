import { GetDeviceAssociationEC6Response } from './get-device-association.types';

export const mockDeviceAssociation: GetDeviceAssociationEC6Response = {
  associationId: '3a79c1c6-8814-4a76-976a-b61f45db4e30',
  resultDescription: 'getDeviceByAssociationId',
  model: {
    id: void 0,
    modelDevice: 'NuevoModeloPrueba',
    patientId: void 0,
    serialNumber: '925010078480',
    brandName: 'ACCU-CHEK',
    description: 'Nuevo modelo prueba',
    formatName: 'UNIT',
    reference: '1925',
  },
};
