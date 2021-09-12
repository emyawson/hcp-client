import * as React from 'react';
import styled from 'styled-components';

import { combineRems } from 'src/utils';

import { FormLabelProps } from './form-label.types';

export const styleFormLabel = (
  FormLabelComponent: React.StatelessComponent<FormLabelProps>,
) => styled(FormLabelComponent)`
  color: ${({ theme }) => theme.colors.black};
  display: block;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1;
  margin: 0 auto
    ${({ theme }) => combineRems(theme.spacing.one, theme.spacing.two)};
`;
