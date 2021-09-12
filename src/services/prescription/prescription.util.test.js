import {
  removeEmptyFields,
  transformJSONToPrescription,
  formatPrescriptionDate,
} from './prescription.util';
import { mockSavedPrescription } from './save-prescription/save-prescription.mock';

describe('Prescription Service Utilities', () => {
  const mockPrescriptionBase = {
    id: 'f0226700-541f-0d1e-abc8-2f0508fc668a',
    patientId: 22,
    period: 'days',
    prescriptionType: 'permanent',
    quantity: 3,
    stripModelId: 1,
    stripsToConsume: 180,
    therapyId: 'b9c55593-391e-45cc-b053-3315a9213984',
  };

  const mockPrescription = {
    ...mockPrescriptionBase,
    reason: null,
    startDate: null,
    endDate: null,
  };

  it('should transform valid server prescription JSON to a client prescription', () => {
    const transformedPrescription = transformJSONToPrescription(
      mockSavedPrescription,
    );
    expect(transformedPrescription.therapyId).toBeUndefined();
    expect(transformedPrescription.therapy).toBeDefined();
    expect(transformedPrescription.stripModelId).toBeUndefined();
    expect(transformedPrescription.stripModel).toBeDefined();
    expect(transformedPrescription.clinicGuideId).toBeUndefined();
    expect(transformedPrescription.clinicGuide).toBeDefined();
  });

  it('should error when transforming invalid server prescription JSON to a client prescription', () => {
    expect(transformJSONToPrescription(undefined)).toBe(null);
  });

  it('should remove empty fields', () => {
    expect(removeEmptyFields(mockPrescription)).toEqual(mockPrescriptionBase);
  });

  describe('Date Formatting', () => {
    it('should format a datepicker JS date for the server', () => {
      const inputDate = new Date(' Sat Mar 31 2018 08:00:00 GMT-0400 (EDT)');
      const expectedDate = '2018-03-31T00:00:00.000Z';
      expect(formatPrescriptionDate(inputDate)).toEqual(expectedDate);
    });
    it('should pass along a valid date string without modification', () => {
      const dateStr = '2018-03-31T00:00:00.000Z';
      expect(formatPrescriptionDate(dateStr)).toBe(dateStr);
    });
    it('should return null for primary prescriptions if no date is provided', () => {
      expect(formatPrescriptionDate(undefined)).toBe(null);
      expect(formatPrescriptionDate(null)).toBe(null);
    });
  });
});
