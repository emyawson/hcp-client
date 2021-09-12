import styled from 'styled-components';

import { borderRadius } from 'src/core/styles';
import { Button, InputText } from 'src/components';
import { combineRems } from 'src/utils';

export const CreateCustomGuideButton = styled(Button)`
  border-radius: ${borderRadius.three};
  display: block;
  padding-bottom: ${props =>
    combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  padding-top: ${props =>
    combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  width: 100%;

  &[disabled] {
    background-color: ${props => props.theme.colors.white};
  }
`;

export const SaveCustomGuideRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DropdownStyledTextInput = styled(InputText)`
  border-radius: ${borderRadius.three};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fontSize.p};
  height: ${props =>
    combineRems(props.theme.spacing.three, props.theme.spacing.four)};
  padding: 0 ${props => props.theme.spacing.three};

  ::placeholder {
    color: ${props => props.theme.colors.black};
  }
`;
