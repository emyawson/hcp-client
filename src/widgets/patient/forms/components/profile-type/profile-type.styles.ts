import { BaseCardDiv } from 'src/components/base-card/base-card.style';
import { createStyledComponent } from 'src/utils/styles';

type ProfileTypeDivProps = {
  selected: boolean;
  disabled?: boolean;
};

export const ProfileTypeDiv = createStyledComponent<FixMe, ProfileTypeDivProps>(
  BaseCardDiv,
)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius[1]};
  padding: 0;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.blueFadedLight : theme.colors.white};
  border-top: 5px solid
    ${({ selected, disabled, theme }) =>
      disabled
        ? theme.colors.grayDark
        : selected
          ? theme.colors.brandBlue
          : theme.colors.grayLight};
`;

type ProfileTypeTitleProps = {
  selected: boolean;
};

export const ProfileTypeTitle = createStyledComponent<
  'h1',
  ProfileTypeTitleProps
>('h1')`
  color: ${({ theme, selected }) =>
    selected ? theme.colors.blueMarine5 : theme.colors.charcoal};
  font-size: ${({ theme }) => theme.fontSize.heading};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin: 30px 0;
`;

type ProfileLabelProps = {
  disabled?: boolean;
};

export const ProfileLabel = createStyledComponent<'label', ProfileLabelProps>(
  'label',
)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  
`;

export const ProfileTopContainer = createStyledComponent<'div', any>('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3rem 1.5rem 0;
  height: 100%;
`;

export const ProfileTypeDescription = createStyledComponent<'p', any>('p')`
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 auto ${({ theme }) => theme.spacing.four};
  max-width: 100%;
`;

export const SelectProfileListContainer = createStyledComponent<'div', any>(
  'div',
)`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.p};
  & > span {
    margin-top: ${({ theme }) => theme.spacing.three};
  }
`;

export const ProfileBottomContainer = createStyledComponent<'div', any>('div')`
  border-top: ${({ theme }) => '1px solid' + theme.colors.grayLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.four};
  height: 80px;
  width: 100%;
`;
