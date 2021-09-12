import {
  resetPrescription,
  addPrescriptionEntry,
  createPrescriptionEntry,
  setPrescription,
  setActivePrescriptionForm,
  initializePrescription,
  setPrescriptionClinicGuideType,
  setClinicGuideFilter,
} from './prescription.actions';
import { PRESCRIPTION_ACTIONS } from './prescription.constants';

const MOCK_PRESCRIPTION_ID = 'unsaved-prescription';

const mockPrescription = {
  id: MOCK_PRESCRIPTION_ID,
  stripModel: 1,
  frequency: 'twoWeeks',
};

const mockFieldData = {
  quantity: '',
  stripModel: '',
  frequency: '',
};

describe('Prescription Action tests', () => {
  it('should reset a prescription when requested', () => {
    const actual = resetPrescription();
    const expected = {
      type: PRESCRIPTION_ACTIONS.RESET_PRESCRIPTION,
    };
    expect(actual).toEqual(expected);
  });
  it('should add a prescription entry by id', () => {
    const actual = addPrescriptionEntry(MOCK_PRESCRIPTION_ID);
    const expected = {
      type: PRESCRIPTION_ACTIONS.ADD_PRESCRIPTION_ENTRY,
      payload: MOCK_PRESCRIPTION_ID,
    };
    expect(actual).toEqual(expected);
  });
  it('should create an unlabelled prescription entry', () => {
    const actual = createPrescriptionEntry();
    const expected = {
      type: PRESCRIPTION_ACTIONS.CREATE_PRESCRIPTION_ENTRY,
    };
    expect(actual).toEqual(expected);
  });
  it('should set a prescription object', () => {
    const actual = setPrescription(mockPrescription);
    const expected = {
      type: PRESCRIPTION_ACTIONS.SET_PRESCRIPTION,
      payload: mockPrescription,
    };
    expect(actual).toEqual(expected);
  });
  it('should add a prescription form to active in the UI by id', () => {
    const actual = setActivePrescriptionForm(MOCK_PRESCRIPTION_ID);
    const expected = {
      type: PRESCRIPTION_ACTIONS.SET_ACTIVE_PRESCRIPTION_FORM,
      payload: MOCK_PRESCRIPTION_ID,
    };
    expect(actual).toEqual(expected);
  });
  it("should initialize a prescription form's data", () => {
    const actual = initializePrescription(mockFieldData);
    const expected = {
      type: PRESCRIPTION_ACTIONS.INITIALIZE_PRESCRIPTION,
      payload: mockFieldData,
    };
    expect(actual).toEqual(expected);
  });
  it("should set a prescription form's clinic guide custom status", () => {
    const actual = setPrescriptionClinicGuideType({
      id: MOCK_PRESCRIPTION_ID,
      isCustom: true,
    });
    const expected = {
      type: PRESCRIPTION_ACTIONS.SET_PRESCRIPTION_CLINIC_GUIDE_TYPE,
      payload: {
        id: MOCK_PRESCRIPTION_ID,
        isCustom: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it('should set the clinic guide filter option', () => {
    const actual = setClinicGuideFilter({
      formId: '123',
      filter: 'preset',
    });
    const expected = {
      type: PRESCRIPTION_ACTIONS.SET_CLINIC_GUIDE_FILTER,
      payload: {
        formId: '123',
        filter: 'preset',
      },
    };
    expect(actual).toEqual(expected);
  });
});
