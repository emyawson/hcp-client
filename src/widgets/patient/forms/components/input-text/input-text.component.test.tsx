import * as React from 'react';

import { mountWithTheme } from 'src/test/render-with-theme';
import { theme } from 'src/theme';

import { InputText } from './input-text.component';
import { InputTextProps } from './input-text.types';

describe('Form Control: Text Tests', () => {
  const mockProps = {
    model: 'mockInput',
    id: 'mockInputID',
    defaultValue: 'Susan Sarandon',
  } as InputTextProps;

  it('Should create a wrapper around an HTML Input element', () => {
    const tree = mountWithTheme(<InputText {...mockProps} />, theme);
    expect(tree.find('input').length).toBe(1);
    expect(tree.find('input').props().type).toBe('text');
  });
  it('Should attach an id for accessibility', () => {
    const tree = mountWithTheme(<InputText {...mockProps} />, theme);
    expect(tree.find('input').props().id).toEqual('mockInputID');
  });
});
