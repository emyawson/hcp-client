import styled from 'styled-components';
import { Errors as RRErrors } from 'react-redux-form';
import {
  space,
  width,
  flex,
  flexWrap,
  justifyContent,
  alignItems,
  alignSelf,
  color,
  fontSize,
} from 'styled-system';

export const Errors = styled(RRErrors)`
  ${space};
  ${width};
  ${flex};
  ${flexWrap};
  ${justifyContent};
  ${alignItems};
  ${alignSelf};
  ${color};
  ${fontSize};
`;
