import {
  flattenPrescriptions,
  clinicGuideToQuantities,
  findClinicGuideWithPrescriptionId,
  findClinicGuideWithClinicGuideId,
  flattenPrescriptionDateRange,
  prescriptionsToKeyedOptionObject,
  addStripModelNameToPrescription,
  convertFrequencyObjectToFrequencyId,
  setPrescriptionByType,
  shouldSetPrescriptionFormActive,
} from './prescription.utils';
import { UNSAVED_PRESCRIPTION_IDS } from './prescription.constants';

const mockStripModels = [
  {
    id: '1',
    name: 'Accu Check Testing',
  },
  {
    id: '2',
    name: 'Accu Check Performatest',
  },
];

const mockQuantityDropdown = [
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
];

const mockClinicGuides = [
  {
    id: 'clinic-guide-123',
  },
];

const mockEmptyPrescriptions = {
  permanent: null,
  temporary: null,
};

const mockPrimaryPrescription = {
  id: 'abc-123',
  stripModel: '1',
  frequency: {
    unit: 'weeks',
    duration: 2,
  },
  prescriptionType: 'permanent',
  clinicGuide: 'clinic-guide-123',
  quantities: mockQuantityDropdown,
};

const mockTemporaryPrescription = {
  id: 'xyz-999',
  stripModel: '2',
  frequency: 'oneMonth',
  prescriptionType: 'temporary',
  quantities: mockQuantityDropdown,
};

const mockPrescriptions = {
  permanent: mockPrimaryPrescription,
  temporary: mockTemporaryPrescription,
};

const mockActiveFormOptions = {
  'abc-123': mockQuantityDropdown,
  'xyz-999': mockQuantityDropdown,
};

const flattenedPrescriptions = [
  mockPrimaryPrescription,
  mockTemporaryPrescription,
];

describe('Prescription Core Utilities', () => {
  it('Should flatten prescription object to an array', () => {
    expect(flattenPrescriptions(mockPrescriptions)).toEqual(
      flattenedPrescriptions,
    );
  });
  it('Should flatten empty prescription object to an empty array', () => {
    expect(flattenPrescriptions(mockEmptyPrescriptions)).toEqual([]);
  });
  it('Should flatten missing prescription object to an empty array', () => {
    expect(flattenPrescriptions(null)).toEqual([]);
  });
  it('Should create a range of quantities from clinic guide', () => {
    const mockGuide = {
      minimumStrips: 0,
      maximumStrips: 5,
    };
    expect(clinicGuideToQuantities(mockGuide)).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it('Should create a range of quantities from invalid clinic guide', () => {
    const mockGuide = {
      minimumStrips: null,
      maximumStrips: 5,
    };
    expect(clinicGuideToQuantities(mockGuide)).toEqual([]);
  });
  it('Should find the clinic guide for a given prescription id', () => {
    expect(
      findClinicGuideWithPrescriptionId(mockPrimaryPrescription.id)(
        mockPrescriptions,
      ),
    ).toEqual(mockPrimaryPrescription.clinicGuide);
  });
  it('Should find a clinic guide by id', () => {
    expect(
      findClinicGuideWithClinicGuideId('clinic-guide-123')(mockClinicGuides),
    ).toEqual(mockClinicGuides[0]);
  });
  it('Should return a default if clinic guide or prescription cannot be found', () => {
    expect(
      findClinicGuideWithClinicGuideId('clinic-guide-xyz')(mockClinicGuides),
    ).toEqual({});
  });
  it('Should flatten a prescription date range into separate keys', () => {
    const startDate = '2018-01-07T08:49:37.000Z';
    const endDate = '2018-11-07T08:49:37.000Z';
    const mockPrescription = {
      ...mockPrimaryPrescription,
      dateRange: {
        startDate,
        endDate,
      },
    };
    expect(flattenPrescriptionDateRange(mockPrescription)).toEqual({
      ...mockPrimaryPrescription,
      startDate,
      endDate,
    });
  });
  it("Should create a keyed object of forms' dropdown options", () => {
    expect(
      prescriptionsToKeyedOptionObject('quantities')(flattenedPrescriptions),
    ).toEqual(mockActiveFormOptions);
  });
  it('Should add strip model name to prescription when set', () => {
    expect(
      addStripModelNameToPrescription(mockStripModels)(mockPrimaryPrescription),
    ).toEqual({
      ...mockPrimaryPrescription,
      stripModelName: mockStripModels[0]['name'],
    });
  });
  it('Should return a prescription when strip models are not set', () => {
    expect(
      addStripModelNameToPrescription([])(mockPrimaryPrescription),
    ).toEqual(mockPrimaryPrescription);
  });
  it('Should convert a frequency object to a string ID', () => {
    expect(
      convertFrequencyObjectToFrequencyId(mockPrimaryPrescription).frequency,
    ).toBe('twoWeeks');
  });
  it('Should add a prescription by type: permanent', () => {
    const mockState = {
      permanent: null,
      temporary: null,
      stripModels: mockStripModels,
    };
    expect(setPrescriptionByType(mockPrimaryPrescription)(mockState)).toEqual({
      ...mockState,
      permanent: mockPrimaryPrescription,
    });
  });
  it('Should add a prescription by type: temporary', () => {
    const mockState = {
      permanent: mockPrimaryPrescription,
      temporary: mockTemporaryPrescription,
      stripModels: mockStripModels,
    };
    expect(setPrescriptionByType(mockPrimaryPrescription)(mockState)).toEqual({
      ...mockState,
      temporary: mockTemporaryPrescription,
    });
  });
  it('should set the appropriate prescription form to active in the UI', () => {
    const mockState = {
      prescription: {
        activePrescription: 'permanent',
        permanent: mockPrimaryPrescription,
        temporary: mockTemporaryPrescription,
      },
    };
    expect(
      shouldSetPrescriptionFormActive(mockPrimaryPrescription)(mockState),
    ).toBeTruthy();
    expect(
      shouldSetPrescriptionFormActive(mockTemporaryPrescription)(mockState),
    ).toBeFalsy();
  });
  it('should set an unsaved prescription form to active in the UI', () => {
    const mockState = {
      prescription: {
        activePrescription: 'permanent',
        permanent: null,
        temporary: null,
      },
    };
    const mockUnsavedPrescription = {
      ...mockPrimaryPrescription,
      id: UNSAVED_PRESCRIPTION_IDS.PERMANENT,
    };
    expect(
      shouldSetPrescriptionFormActive(mockUnsavedPrescription)(mockState),
    ).toBeTruthy();
  });
});
