import styled from 'styled-components';

import { breakpoints, colors, spacing } from 'src/core';
import { NumberInputField } from 'src/components';
import { Button } from 'src/components/button';
import { DropdownLabel } from 'src/components/dropdown/labelled-dropdown/labelled-dropdown.style';
import { combineRems } from 'src/utils';

const selectHeight = combineRems(spacing.three, spacing.four);

export const PrescriptionErrorDiv = styled.div`
  margin-bottom: ${spacing.three};
  width: 100%;
`;

export const PrescriptionContainerDiv = styled.div`
  padding: ${spacing.four} 0;
`;

export const SelectContainerDiv = styled.div`
  padding-right: ${spacing.four};
  width: 50%;
  margin-bottom: ${spacing.five};

  @media (min-width: ${breakpoints.large}) {
    width: 25%;
    &:nth-child(4n) {
      padding-right: 0;
    }
  }
`;

export const PrescriptionAccordionContainerDiv = styled.div`
  align-items: flex-start;
  display: flex;
  min-height: 20rem;
  flex-direction: column;
`;

export const PrescriptionLoadingDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.five} 0;
`;

export const LoadingIndicatorContainer = styled.div`
  color: ${colors.brandBlue};
  margin: 0 auto ${spacing.four};
`;

export const PrescriptionRowDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PrescriptionSaveRowDiv = PrescriptionRowDiv.extend`
  justify-content: flex-end;
`;

export const InputLabel = DropdownLabel.extend`
  display: block;
`;

export const LabelledInput = styled(NumberInputField)`
  box-shadow: none;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fontSize.p};
  height: ${selectHeight};
  padding: 0 ${props => props.theme.spacing.three};
  text-align: left;
  width: 100%;
  max-width: 100%;
`;

export const SettingsButton = styled(Button)`
  display: block;
  font-size: ${props => props.theme.fontSize.caption};
  margin-top: -${props => combineRems(props.theme.spacing.two, props.theme.spacing.three)};
  padding: ${props =>
    `${props.theme.spacing.two} ${props.theme.spacing.three}`};

  @media all and (min-width: ${breakpoints.large}) {
    font-size: ${props => props.theme.fontSize.p};
    padding: ${props =>
      `${props.theme.spacing.three} ${props.theme.spacing.four}`};
    margin-top: 0;
  }
`;

export const SettingsButtonContainerDiv = SelectContainerDiv.extend`
  display: none;

  @media all and (min-width: ${breakpoints.large}) {
    align-items: flex-end;
    display: flex;
    width: 50%;
  }
`;

export const HideLargeDiv = styled.div`
  @media all and (min-width: ${breakpoints.large}) {
    display: none;
  }
`;
