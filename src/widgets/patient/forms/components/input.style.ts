import { css } from 'styled-components';

export const SharedInputBaseStyles = css`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.silverMedium};
  border-radius: ${({ theme }) => theme.borderRadius[0]};
  color: ${({ theme }) => theme.colors.charcoal};
  font-size: ${({ theme }) => theme.fontSize.p};
  letter-spacing: ${({ theme }) => theme.letterSpacing.small};
  transition: ${({ theme }) => theme.transitions.default};
`;

export const SharedInputStyles = css`
  ${SharedInputBaseStyles};

  &:placeholder {
    color: ${({ theme }) => theme.colors.grayMedium};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brandBlue};
    color: ${({ theme }) => theme.colors.brandBlue};
    outline: none;
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.silverMedium};
    border-color: ${({ theme }) => theme.colors.silverDark};
    color: ${({ theme }) => theme.colors.grayMedium};
  }
`;
