import styled from 'styled-components';

import { Subheading } from 'src/components/fonts/subheading';
import { Title } from 'src/components/fonts/title';
import { combineRems } from 'src/utils';
import { hexToRGBA } from 'src/utils/color';

import { SmallHr } from '../device-assignment/device-assignment.style';

export const ConfirmAssignmentErrorHelpTitle = Title.extend`
  color: ${({ theme }) => theme.colors.brandBlue};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export const ConfirmAssignmentErrorHelpSubheading = Subheading.extend`
  color: ${({ theme }) => theme.colors.charcoal};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export const ConfirmAssignmentErrorHr = SmallHr.extend`
  border-color: ${({ theme }) => theme.colors.quartzBlue};
  margin: 0 auto
    ${({ theme }) => combineRems(theme.spacing.two, theme.spacing.three)};
`;

export const ConfirmAssignmentErrorHelpBlock = styled.div`
  align-items: center;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.9)};
  border: 1px solid ${({ theme }) => theme.colors.quartzBlue};
  border-radius: ${({ theme }) => theme.borderRadius.three};
  color: ${({ theme }) => theme.colors.charcoal};
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 75%;
`;

export const ConfirmAssignmentErrorHelpItem = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.quartzBlue};
  flex-basis: 0;
  flex-grow: 1;
  padding: ${({ theme }) =>
    combineRems(theme.spacing.two, theme.spacing.three)};
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.brandBlue};
    }
  }

  svg {
    margin-right: ${({ theme }) =>
      combineRems(theme.spacing.one, theme.spacing.two)};
    vertical-align: middle;
  }

  &:last-child {
    border-right: none;
  }
`;
