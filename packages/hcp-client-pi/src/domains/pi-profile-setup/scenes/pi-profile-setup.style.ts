import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

interface PiProfileSetupHeaderProps {
  firstTimeUser: boolean;
}
export const PiProfileSetupHeader: StyledComponentClass<
  PiProfileSetupHeaderProps,
  IThemeInterface
> = styled<PiProfileSetupHeaderProps, 'div'>('div')`
  padding: ${props => props.theme.spacing.three}; 
  ${props => props.theme.spacing.four};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.0625rem solid ${props => props.theme.colors.silverDark};
  border-bottom: none;
  span:first-child {
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSize.display1};
  }
  div:last-child {
    display: flex;
    align-items: center;
    
    & span {
      margin-left: ${props => props.theme.spacing.two}
      font-weight: ${props => props.theme.fontWeights.bold}
    }
  }
  color: ${({ firstTimeUser, theme }) =>
    !firstTimeUser ? theme.colors.blue : null};
  background-color: ${({ firstTimeUser, theme }) =>
    !firstTimeUser ? theme.colors.lavender : null};
`;

export const PiProfileSetupHeaderTextContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled.div`
  margin-left: ${({ theme }) => theme.spacing.three};
`;

export const PiProfileSetupBody: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  display: flex;
  padding: ${props => props.theme.spacing.four};
  flex-wrap: wrap;
  border: 0.0625rem solid ${props => props.theme.colors.silverDark};
`;

export const PiProfileSetupBodyHeader: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  width: 100%;
  border-bottom: 0.0625rem solid ${props => props.theme.colors.silverDark};
  padding-bottom: ${props => props.theme.spacing.two};
  & span {
    font-size: ${props => props.theme.fontSize.headline}
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

export const PiProfileSetupBodyForm: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  width: 100%;
  display: flex;
  padding: ${props => props.theme.spacing.five} 0;
`;

export const ProfileConfigContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  width: 100%;
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }

  & span {
    margin-bottom: 10px;
  }
`;

export const ButtonContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `${theme.spacing.four} ${theme.spacing.three} 0 0`};
`;

export const PiProfileSetupContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  background-color: ${props => props.theme.colors.white};
`;
