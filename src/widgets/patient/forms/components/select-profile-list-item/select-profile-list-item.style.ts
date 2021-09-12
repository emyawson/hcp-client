import { createStyledComponent } from 'src/utils/styles';

export const IconContainer = createStyledComponent<'span', any>('span')`
  margin-right: ${({ theme }) => theme.spacing.two};
`;

export const OptionContainer = createStyledComponent<'span', any>('span')`
  display: flex;
  align-items: center;
`;
