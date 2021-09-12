import { Div } from 'src/components/div';

export const CreatePatientSection = Div.extend`
  flex: 1;
  padding-left: ${props => props.theme.spacing.five};
  padding-right: ${props => props.theme.spacing.five};
`;
