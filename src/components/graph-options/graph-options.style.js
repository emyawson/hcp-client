import styled from 'styled-components';

import { Form } from 'src/components/forms';
import { spacing } from 'src/core';

export const GraphOptionsContainer = styled.div`
  margin-left: auto;
`;

export const GearIconContainer = styled.div`
  display: flex;
  margin-right: ${spacing.three};
  cursor: pointer;
`;

export const PopoverContentContainer = styled.div`
  display: flex;
`;

export const CheckboxesForm = styled(Form)`
  flex: 1;
`;

export const CheckboxContainer = styled.div`
  padding: ${spacing.one} 0;
`;

export const SVGContainer = styled.span`
  margin-right: ${spacing.two};
  display: flex;
  align-items: center;
`;
