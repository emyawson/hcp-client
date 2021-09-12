import {
  addLeadingZero,
  constructBirthDayDropdownOptions,
  constructBirthYearDropdownOptions,
  constructRangeArray,
  convertDayToDropdownOption,
  convertYearToDropdownOption,
  getDropdownLabelByValue,
  toDropdownOption,
  valueToDropdownOption,
} from './patient-info.utils';

describe('Edit Profile Utility Tests', () => {
  describe('Generating Values', () => {
    it('Should create an array containing a number range', () => {
      expect(constructRangeArray(4)).toEqual([1, 2, 3, 4]);
    });
    it('Should create an array containing a number range with an offset applied', () => {
      expect(constructRangeArray(4, 100)).toEqual([101, 102, 103, 104]);
    });
  });

  describe('Formatting', () => {
    it('Should convert number to a string, and add zero to any single digit number', () => {
      expect(addLeadingZero(10)).toBe('10');
      expect(addLeadingZero(9)).toBe('09');
    });
    it('Should convert a set of params to a dropdown option format', () => {
      expect(toDropdownOption('label', 'value123')).toEqual({
        label: 'label',
        value: 'value123',
      });
    });
    it('Should convert a single value to matching dropdown option format', () => {
      expect(valueToDropdownOption('male')).toEqual({
        label: 'male',
        value: 'male',
      });
    });

    it('Should convert a given day into a dropdown option, with leading zero in label only', () => {
      expect(convertDayToDropdownOption(9)).toEqual({
        label: '09',
        value: '9',
      });
      expect(convertDayToDropdownOption(19)).toEqual({
        label: '19',
        value: '19',
      });
    });
    it('Should convert a given year into a dropdown option with identical value and label', () => {
      expect(convertYearToDropdownOption(1776)).toEqual({
        label: '1776',
        value: '1776',
      });
    });

    it('Should turn a value into its matching label from a set of options', () => {
      const mockOptions = [
        {
          label: 'English',
          value: 'EN',
        },
        {
          label: 'Español',
          value: 'ES',
        },
      ];
      expect(getDropdownLabelByValue('ES')(mockOptions)).toEqual('Español');
      expect(getDropdownLabelByValue('ESP')(mockOptions)).toEqual('');
    });
  });

  describe('Full Integration', () => {
    it('Should convert a range of days into dropdown options with leading zeros', () => {
      expect(constructBirthDayDropdownOptions(2)).toEqual([
        {
          label: '01',
          value: '1',
        },
        {
          label: '02',
          value: '2',
        },
      ]);
    });
    it('Should convert a range of years into dropdown options', () => {
      const yearsToDisplay = 3;
      const currentYear = 2000;
      expect(
        constructBirthYearDropdownOptions(yearsToDisplay, currentYear),
      ).toEqual([
        {
          label: '2000',
          value: '2000',
        },
        {
          label: '1999',
          value: '1999',
        },
        {
          label: '1998',
          value: '1998',
        },
      ]);
    });
  });
});
