import {
  isCustomClinicGuide,
  selectQuantityMaxById,
  selectQuantityMinById,
} from './prescription.utils';

const mockQuantities = {
  'abc-123': [
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
  ],
};

const customClinicGuides = [
  {
    id: 'clinic-guide-123',
  },
];

describe('Prescription scene util tests', () => {
  it('should select the maximum from the quantities for a given form ID', () => {
    expect(selectQuantityMaxById(mockQuantities, 'abc-123')).toBe(4);
  });
  it('should select the minimum from the quantities for a given form ID', () => {
    expect(selectQuantityMinById(mockQuantities, 'abc-123')).toBe(3);
  });
  it('should determine if a prescription has a custom clinic guide', () => {
    expect(isCustomClinicGuide('clinic-guide-123')(customClinicGuides)).toBe(
      true,
    );
    expect(isCustomClinicGuide('clinic-guide-xyz')(customClinicGuides)).toBe(
      false,
    );
  });
});
