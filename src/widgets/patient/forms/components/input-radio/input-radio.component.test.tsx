import * as React from 'react';

import { mountWithTheme } from 'src/test/render-with-theme';
import { theme } from 'src/theme';

import { InputRadio } from './input-radio.component';
import { InputRadioProps } from './input-radio.types';

describe('Form Control: Text Tests', () => {
  const mockProps = {
    id: 'mockInputID',
    label: 'I Agree',
  } as InputRadioProps;

  it('Should create a wrapper around an HTML Input radio element', () => {
    const tree = mountWithTheme(<InputRadio {...mockProps} />, theme);
    expect(tree.find('input').length).toBe(1);
    expect(tree.find('input').props().type).toBe('radio');
  });
  it('Should attach an id for accessibility', () => {
    const tree = mountWithTheme(<InputRadio {...mockProps} />, theme);
    expect(tree.find('input').props().id).toEqual('mockInputID');
  });
});
