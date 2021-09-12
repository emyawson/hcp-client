import React from 'react';
import styled from 'styled-components';

import { Row, LocalizedText } from 'src/components';

export const FormWrapper = styled(Row)`
  padding: 11rem 4rem 0 0;
  form {
    width: 100%;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
  }
`;

export const InputLabel = ({ textKey, ...props }) => (
  <LocalizedText
    pb={3}
    pt={3}
    fontSize={2}
    fontWeight={600}
    color="charcoal"
    textKey={textKey}
    {...props}
  />
);
