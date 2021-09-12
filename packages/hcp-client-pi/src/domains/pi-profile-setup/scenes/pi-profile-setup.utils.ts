import { SelectOption } from './pi-profile-setup.types';

export const findSelectOptionByValue = <T>(
  array: Array<SelectOption<T>>,
  value: T,
): any | undefined => array.find(({ value: itemValue }) => itemValue === value);
