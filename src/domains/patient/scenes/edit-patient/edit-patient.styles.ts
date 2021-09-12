import { Div } from 'src/components/div';

export const EditPatientSection = Div.extend`
  flex: 1;
  padding-left: ${props => props.theme.spacing.five};
  padding-right: ${props => props.theme.spacing.five};
`;
