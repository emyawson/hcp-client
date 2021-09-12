import styled from 'styled-components';

import { colors, spacing, borderRadius } from 'src/core';
import { combineRems } from 'src/utils';
import { ControlText } from 'src/components';
import { InputTextArea } from 'src/components/input/input.style';

export const ManualDeliveryInputsDiv = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const StripsInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${combineRems(spacing.two, spacing.three)}
    ${combineRems(spacing.two, spacing.three)} 0;
`;

export const CommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  padding-bottom: ${combineRems(spacing.two, spacing.three)};
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
`;

export const ExtraStripsNumberInputField = styled(ControlText)`
  background-color: ${colors.white};
  border: 1px solid ${colors.grayLight};
  max-width: ${combineRems(spacing.four, spacing.four)};
  border-radius: ${borderRadius.three};
  outline: none;
  padding: ${spacing.one} ${spacing.two};
  text-align: center;
  font-size: 0.9rem;
  min-height: ${combineRems(spacing.three, spacing.four)};

  &[disabled] {
    background-color: ${colors.silverLight};
    color: ${colors.grayMedium};
  }
`;

export const ManualDeliveryReasonTextArea = InputTextArea.extend`
  min-height: ${combineRems(spacing.three, spacing.four)};
  height: ${spacing.five};
  border-radius: ${borderRadius.three};
`;
