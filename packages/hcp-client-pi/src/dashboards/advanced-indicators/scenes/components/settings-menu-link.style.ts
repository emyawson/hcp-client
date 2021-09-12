import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

interface SettingsMenuLinkContainerProps {
  onClick: (...any) => void;
}

export const SettingsMenuLinkContainer: StyledComponentClass<
  SettingsMenuLinkContainerProps,
  IThemeInterface
> = styled<SettingsMenuLinkContainerProps, 'div'>('div')`
  cursor: pointer;
  display: flex;
`;

export const TextContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled.div`
  margin-left: ${({ theme }) => theme.spacing.two};
`;

interface ArrowContainerProps {
  direction: 'up' | 'down';
}
export const ArrowContainer: StyledComponentClass<
  ArrowContainerProps,
  IThemeInterface
> = styled<ArrowContainerProps, 'div'>('div')`
  margin-left: ${({ theme }) => theme.spacing.two};
  transform: ${({ direction }) =>
    direction !== 'up' ? null : 'rotate(180deg)'};
  position: relative;
  bottom: 0.0625rem;
`;
