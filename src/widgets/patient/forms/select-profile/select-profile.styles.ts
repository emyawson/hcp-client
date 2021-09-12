import { createStyledComponent } from 'src/utils/styles';

export const ButtonsContainer = createStyledComponent<'div', any>('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.five};

  & > button {
    margin-left: ${({ theme }) => theme.spacing.four};
  }
`;

export const CancelButton = createStyledComponent<'button', any>('button')`
  color: ${({ theme }) => theme.colors.brandBlue};
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: none;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
`;
